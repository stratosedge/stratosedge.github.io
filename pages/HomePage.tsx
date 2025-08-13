
import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '../components/HeroSection';
import { CourseCard } from '../components/CourseCard';
import { mockCourses } from '../data/courses';
import { InternshipsPage } from './InternshipsPage';
import { Course, Page } from '../types';

interface HomePageProps {
  setPage: (page: Page) => void;
  onExplore: (course: Course) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setPage, onExplore }) => (
  <>
    <HeroSection setPage={setPage} />
    <div className="bg-gray-800 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <p className="text-4xl font-bold text-indigo-400">500+</p>
            <p className="text-sm font-medium text-gray-400 mt-2">Students Placed in MNCs</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <p className="text-4xl font-bold text-indigo-400">95%</p>
            <p className="text-sm font-medium text-gray-400 mt-2">Placement Success Rate</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <p className="text-4xl font-bold text-indigo-400">₹8 LPA</p>
            <p className="text-sm font-medium text-gray-400 mt-2">Average Starting Salary</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
            <p className="text-4xl font-bold text-indigo-400">50+</p>
            <p className="text-sm font-medium text-gray-400 mt-2">MNC Hiring Partners</p>
          </motion.div>
        </div>
      </div>
    </div>
    <div className="bg-gray-900 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Flagship Placement Programs</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">These programs are designed with one goal: to get you hired by a top tech company.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockCourses.filter(c => c.featured).map(course => <CourseCard key={course.id} course={course} onExplore={onExplore} />)}
        </div>
      </div>
    </div>
    <InternshipsPage onExplore={onExplore} isHomePageSection={true} />
  </>
);
