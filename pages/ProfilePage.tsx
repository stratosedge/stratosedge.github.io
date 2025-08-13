import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User as UserIcon, Save, ArrowLeft, LayoutDashboard, BookOpen, Send } from 'lucide-react';
import { User, Page, Course } from '../types';
import { mockCourses } from '../data/courses';

interface ProfilePageProps {
  user: User;
  updateUser: (user: User) => void;
  setPage: (page: Page) => void;
  setSelectedCourse: (course: Course) => void;
  refreshUserProfile: () => Promise<void>;
}

const ProfileForm: React.FC<{ user: User, updateUser: (user: User) => void, setPage: (page: Page) => void }> = ({ user, updateUser, setPage }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    dob: user.dob || '',
    whatsappNumber: user.whatsappNumber || '',
    status: user.status || 'Not Specified',
    schoolOrCompany: user.schoolOrCompany || '',
    tenthMarks: user.tenthMarks || '',
    tenthSchool: user.tenthSchool || '',
    twelfthMarks: user.twelfthMarks || '',
    twelfthSchool: user.twelfthSchool || '',
  });
  React.useEffect(() => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      dob: user.dob || '',
      whatsappNumber: user.whatsappNumber || '',
      status: user.status || 'Not Specified',
      schoolOrCompany: user.schoolOrCompany || '',
      tenthMarks: user.tenthMarks || '',
      tenthSchool: user.tenthSchool || '',
      twelfthMarks: user.twelfthMarks || '',
      twelfthSchool: user.twelfthSchool || '',
    });
  }, [user]);
  const [saveStatus, setSaveStatus] = useState('');
  const [showBackButton, setShowBackButton] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ ...user, ...formData });
    setSaveStatus('Profile saved successfully!');
    setShowBackButton(true);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl border border-gray-700 space-y-6">
      <div className="border-b border-gray-700 pb-6">
        <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
        <p className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-300">{user.email}</p>
      </div>

      <div className="border-b border-gray-700 pb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Personal Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500" required/>
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500" required/>
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-300 mb-1">Date of Birth</label>
            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500" required/>
          </div>
           <div>
            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-300 mb-1">WhatsApp Contact Number</label>
            <input type="tel" id="whatsappNumber" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} pattern="[0-9]{10}" title="Please enter a 10-digit phone number" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500" required/>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">Current Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500" required>
              <option>Not Specified</option>
              <option>Undergraduate Student</option>
              <option>Graduate (Job Seeking)</option>
              <option>Working Professional</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="schoolOrCompany" className="block text-sm font-medium text-gray-300 mb-1">
              {formData.status === 'Undergraduate Student' ? 'College/University Name' : formData.status === 'Working Professional' ? 'Company Name' : 'Last Institution / Company'}
            </label>
            <input type="text" id="schoolOrCompany" name="schoolOrCompany" value={formData.schoolOrCompany} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500" required/>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Academic Details</h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tenthMarks" className="block text-sm font-medium text-gray-300 mb-1">10th Grade Marks (%)</label>
              <input type="number" id="tenthMarks" name="tenthMarks" value={formData.tenthMarks} onChange={handleChange} min="0" max="100" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500" required/>
            </div>
            <div>
              <label htmlFor="tenthSchool" className="block text-sm font-medium text-gray-300 mb-1">10th Institution Name</label>
              <input type="text" id="tenthSchool" name="tenthSchool" value={formData.tenthSchool} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500" required/>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="twelfthMarks" className="block text-sm font-medium text-gray-300 mb-1">12th Grade Marks (%)</label>
              <input type="number" id="twelfthMarks" name="twelfthMarks" value={formData.twelfthMarks} onChange={handleChange} min="0" max="100" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500" required/>
            </div>
            <div>
              <label htmlFor="twelfthSchool" className="block text-sm font-medium text-gray-300 mb-1">12th Institution Name</label>
              <input type="text" id="twelfthSchool" name="twelfthSchool" value={formData.twelfthSchool} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500" required/>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-700 flex items-center justify-between flex-wrap gap-4">
        <div className="h-6">
          {saveStatus && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-green-400">{saveStatus}</motion.p>}
        </div>
        <div className="flex items-center gap-4 ml-auto">
          {showBackButton && (
            <motion.button type="button" onClick={() => setPage('Programs')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"><ArrowLeft className="mr-2 h-4 w-4"/>Back to Programs</motion.button>
          )}
          <motion.button type="submit" whileHover={{ scale: 1.02 }} className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg"><Save className="mr-2 h-4 w-4"/>Save Profile</motion.button>
        </div>
      </div>
    </form>
  );
};

const AppliedCourseCard: React.FC<{ course: Course, onView: (course: Course) => void }> = ({ course, onView }) => {
  return (
    <motion.div whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 flex flex-col p-6 gap-4">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-gray-700 mr-4">{course.icon}</div>
        <h3 className="text-xl font-bold text-white">{course.title}</h3>
      </div>
       <div className="text-sm text-gray-300">
        Status: <span className="font-semibold text-yellow-400">Application Submitted</span>
      </div>
      <button onClick={() => onView(course)} className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
        View Program Details
      </button>
    </motion.div>
  );
};


const Dashboard: React.FC<{ user: User, setSelectedCourse: (course: Course) => void, setPage: (page: Page) => void }> = ({ user, setSelectedCourse, setPage }) => {
  const appliedCoursesDetails = mockCourses.filter(course => user.appliedCourses.includes(course.id));

  return (
    <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
      <h2 className="text-3xl font-bold text-white mb-6">My Applications</h2>
      {appliedCoursesDetails.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {appliedCoursesDetails.map(course => (
            <AppliedCourseCard key={course.id} course={course} onView={setSelectedCourse} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 px-6 bg-gray-900 rounded-lg">
          <Send className="mx-auto h-12 w-12 text-gray-500" />
          <h3 className="mt-2 text-xl font-medium text-white">No Applications Yet</h3>
          <p className="mt-1 text-gray-400">You haven't applied for any programs. Explore our programs to get started!</p>
          <button
            onClick={() => setPage('Programs')}
            className="mt-6 inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Browse Programs
          </button>
        </div>
      )}
    </div>
  );
};

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, updateUser, setPage, setSelectedCourse, refreshUserProfile }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'dashboard'>('dashboard');

  const navButtonClasses = (tabName: 'profile' | 'dashboard') => 
    `w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-colors duration-200 text-left ${
      activeTab === tabName 
        ? 'bg-indigo-600 text-white' 
        : 'text-gray-300 hover:bg-gray-700'
    }`;

  return (
    <div className="bg-gray-900 min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <h1 className="text-4xl font-bold text-white">My Account</h1>
          <p className="text-gray-400">Manage your profile and track your applications.</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <aside className="md:w-1/4 lg:w-1/5">
            <nav className="flex flex-col gap-2 p-4 bg-gray-800 rounded-xl border border-gray-700">
              <button onClick={() => setActiveTab('dashboard')} className={navButtonClasses('dashboard')}>
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button onClick={async () => { await refreshUserProfile(); setActiveTab('profile'); }} className={navButtonClasses('profile')}>
                <UserIcon className="w-5 h-5" />
                <span>Edit Profile</span>
              </button>
            </nav>
          </aside>

          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'profile' ? (
                  <ProfileForm user={user} updateUser={updateUser} setPage={setPage} />
                ) : (
                  <Dashboard user={user} setSelectedCourse={setSelectedCourse} setPage={setPage} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};