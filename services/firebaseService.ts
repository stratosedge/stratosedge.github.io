import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { User, Course } from '../types';

// Your web app's Firebase configuration (production)
const firebaseConfig = {
  apiKey: "AIzaSyBuY4ZtEg_6g6Wi_QlK2CzhJrRfqYCpDzQ",
  authDomain: "stratos-edge-learning.firebaseapp.com",
  projectId: "stratos-edge-learning",
  storageBucket: "stratos-edge-learning.firebasestorage.app",
  messagingSenderId: "673017384948",
  appId: "1:673017384948:web:bbc8b7dfb382f11ff5f3a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

const applicationsCollection = collection(db, 'applications');
const usersCollection = collection(db, 'users');
const contactSubmissionsCollection = collection(db, 'contactSubmissions');

export const submitApplication = async (user: User, course: Course): Promise<void> => {
  try {
    await addDoc(applicationsCollection, {
      ...user,
      courseId: course.id,
      courseTitle: course.title,
  email: user.email,
      applicationDate: serverTimestamp(),
      applicationStatus: 'Submitted',
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Could not submit application. Please try again.");
  }
};

// Auth helpers
export const subscribeToAuth = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const signInWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

// User profile CRUD
export const getUserProfile = async (uid: string): Promise<User | null> => {
  const ref = doc(usersCollection, uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as User;
};

export const saveUserProfile = async (uid: string, user: User): Promise<void> => {
  const ref = doc(usersCollection, uid);
  // Merge to avoid overwriting unintentionally
  await setDoc(ref, user, { merge: true });
};

export const fetchAppliedCourseIdsByEmail = async (email: string): Promise<number[]> => {
  const q = query(applicationsCollection, where('email', '==', email));
  const snap = await getDocs(q);
  const ids = new Set<number>();
  snap.forEach(d => {
    const data = d.data() as any;
    if (typeof data.courseId === 'number') ids.add(data.courseId);
  });
  return Array.from(ids);
};

// Contact submissions
export interface ContactSubmission {
  orgName: string;
  contact: string; // email/phone or brief note
  userEmail?: string;
  createdAt?: any;
}

export const submitContact = async (payload: ContactSubmission): Promise<void> => {
  try {
    await addDoc(contactSubmissionsCollection, {
      orgName: payload.orgName,
      contact: payload.contact,
      userEmail: payload.userEmail || null,
      createdAt: serverTimestamp(),
    });
  } catch (e) {
    console.error('Failed to submit contact request', e);
    throw new Error('Could not submit contact request. Please try again.');
  }
};
