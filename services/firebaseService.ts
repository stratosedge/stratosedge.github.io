import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { User, Course } from '../types';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD94DP3MkWQ5u4Onp_fCaK1aUu4Mdyfulw",
  authDomain: "stratos-edge.firebaseapp.com",
  projectId: "stratos-edge",
  storageBucket: "stratos-edge.appspot.com",
  messagingSenderId: "896849839174",
  appId: "1:896849839174:web:f14f6379f082afc050f647"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

const applicationsCollection = collection(db, 'applications');
const usersCollection = collection(db, 'users');

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
