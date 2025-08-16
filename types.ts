import { ReactElement } from 'react';

export interface Course {
  id: number;
  title: string;
  category: 'Technical' | 'Non-Technical';
  duration: string;
  price: string;
  icon: ReactElement;
  featured: boolean;
  description: string;
  avgCtc: string;
  role: string;
  syllabus: string[];
}

export interface User {
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  whatsappNumber: string;
  status: 'Not Specified' | 'Undergraduate Student' | 'Graduate (Job Seeking)' | 'Working Professional';
  schoolOrCompany: string;
  tenthMarks: string;
  tenthSchool: string;
  twelfthMarks: string;
  twelfthSchool: string;
  appliedCourses: number[];
}

export type Page = 'Home' | 'Programs' | 'Internships' | 'Collaborate' | 'About Us' | 'Profile';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}