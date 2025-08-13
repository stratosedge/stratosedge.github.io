import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProgramsPage } from './pages/ProgramsPage';
import { InternshipsPage } from './pages/InternshipsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ProfilePage } from './pages/ProfilePage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LoginModal } from './components/modals/LoginModal';
import { ApplicationModal } from './components/modals/ApplicationModal';
import { ProfileCompletionModal } from './components/modals/ProfileCompletionModal';
import { TermsModal } from './components/modals/TermsModal';
import { Page, User, Course } from './types';
import { submitApplication, signInWithEmail, signUpWithEmail, subscribeToAuth, signOutUser, getUserProfile, saveUserProfile, fetchAppliedCourseIdsByEmail, auth } from './services/firebaseService';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isApplicationModalOpen, setApplicationModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedCourse]);

  // Subscribe to Firebase auth state changes
  useEffect(() => {
    const unsub = subscribeToAuth(async (fbUser) => {
      if (fbUser) {
        const uid = fbUser.uid;
        const email = fbUser.email || '';
        const existing = await getUserProfile(uid);
        let appliedCourses: number[] = [];
        try {
          if (email) appliedCourses = await fetchAppliedCourseIdsByEmail(email);
        } catch {}
        if (existing) {
          setUser({ ...existing, email, appliedCourses });
        } else {
          // seed minimal profile
          const seeded = {
            name: fbUser.displayName || (email ? email.split('@')[0] : 'User'),
            email,
            firstName: '',
            lastName: '',
            dob: '',
            whatsappNumber: '',
            status: 'Not Specified' as const,
            schoolOrCompany: '',
            tenthMarks: '',
            tenthSchool: '',
            twelfthMarks: '',
            twelfthSchool: '',
            appliedCourses,
          };
          setUser(seeded);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  const handleSetSelectedCourse = (course: Course) => {
    window.scrollTo(0, 0);
    setSelectedCourse(course);
  };

  const isProfileComplete = (user: User | null): boolean => {
    if (!user) return false;
    const requiredFields: (keyof User)[] = ['firstName', 'lastName', 'dob', 'whatsappNumber', 'schoolOrCompany', 'tenthMarks', 'tenthSchool', 'twelfthMarks', 'twelfthSchool'];
    return requiredFields.every(field => user[field] && user[field] !== '') && user.status !== 'Not Specified';
  };

  const handleLogin = async ({ email, password, mode }: { email: string; password: string; mode: 'login' | 'signup'; }) => {
    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err: any) {
      if (err?.code === 'auth/wrong-password') {
        alert('Incorrect password.');
        return;
      } else if (err?.code === 'auth/invalid-email') {
        alert('Invalid email.');
        return;
      } else if (err?.code === 'auth/too-many-requests') {
        alert('Too many attempts. Please try again later.');
        return;
      } else if (err?.code === 'auth/email-already-in-use') {
        alert('Email already in use. Try logging in.');
        return;
      } else if (err?.code === 'auth/weak-password') {
        alert('Password should be at least 6 characters.');
        return;
      } else if (err?.code === 'auth/user-not-found') {
        alert('No account found. Please create one.');
        return;
      } else {
        alert('Login failed. Please try again.');
        return;
      }
    }
    // Auth state listener will populate user; navigate to profile
    setLoginOpen(false);
    setCurrentPage('Profile');
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
    } finally {
      setUser(null);
      setCurrentPage('Home');
      setSelectedCourse(null);
    }
  };

  const updateUser = async (updatedUserData: User) => {
    setUser(updatedUserData);
    try {
      const fbUser = auth.currentUser;
      if (fbUser) {
        await saveUserProfile(fbUser.uid, { ...updatedUserData, email: fbUser.email || updatedUserData.email });
      }
    } catch (e) {
      console.error('Failed to save profile:', e);
    }
  };

  const handleApplicationSubmit = async () => {
    if (user && selectedCourse) {
      await submitApplication(user, selectedCourse);
      setUser(prevUser => prevUser ? {
        ...prevUser,
        appliedCourses: [...prevUser.appliedCourses, selectedCourse.id]
      } : null);
    }
  };

  const handleApplyClick = (course: Course) => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    
    if (!isProfileComplete(user)) {
      setProfileModalOpen(true);
      return;
    }

    setApplicationModalOpen(true);
  };

  const navigateToProfile = () => {
    setProfileModalOpen(false);
    setSelectedCourse(null);
    setCurrentPage('Profile');
  };

  // Expose a refresh to reload the user profile from Firestore on demand (e.g., when opening Edit Profile)
  const refreshUserProfile = async () => {
    try {
      const fbUser = auth.currentUser;
      if (!fbUser) return;
      const profile = await getUserProfile(fbUser.uid);
      if (profile) {
        setUser(prev => ({
          ...profile,
          email: fbUser.email || profile.email,
          appliedCourses: prev?.appliedCourses || profile.appliedCourses || [],
        }));
      }
    } catch {}
  };

  const renderContent = () => {
    if (selectedCourse) {
      return <CourseDetailPage course={selectedCourse} onBack={() => setSelectedCourse(null)} user={user} onApplyClick={handleApplyClick} onLoginClick={() => setLoginOpen(true)} />;
    }
    switch (currentPage) {
      case 'Home': return <HomePage setPage={setCurrentPage} onExplore={handleSetSelectedCourse} />;
      case 'Programs': return <ProgramsPage onExplore={handleSetSelectedCourse} />;
      case 'Internships': return <InternshipsPage onExplore={handleSetSelectedCourse} />;
      case 'About Us': return <AboutUsPage />;
      case 'Profile':
        if (user) {
          return <ProfilePage user={user} updateUser={updateUser} setPage={setCurrentPage} setSelectedCourse={handleSetSelectedCourse} refreshUserProfile={refreshUserProfile} />;
        }
        setCurrentPage('Home');
        return <HomePage setPage={setCurrentPage} onExplore={handleSetSelectedCourse} />;
      default:
        return <HomePage setPage={setCurrentPage} onExplore={handleSetSelectedCourse} />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen font-sans text-white">
      <Header setPage={setCurrentPage} setSelectedCourse={setSelectedCourse} currentPage={currentPage} user={user} onLoginClick={() => setLoginOpen(true)} onLogout={handleLogout} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCourse ? `detail-${selectedCourse.id}` : currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
  <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} onTermsClick={() => setTermsModalOpen(true)} />
      <ApplicationModal isOpen={isApplicationModalOpen} onClose={() => setApplicationModalOpen(false)} course={selectedCourse} onApply={handleApplicationSubmit} />
      <ProfileCompletionModal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)} onNavigate={navigateToProfile} />
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setTermsModalOpen(false)} />
      {!selectedCourse && currentPage !== 'Profile' && <Footer />}
    </div>
  );
}