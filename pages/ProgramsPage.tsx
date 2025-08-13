
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CourseCard } from '../components/CourseCard';
import { mockCourses } from '../data/courses';
import { Course } from '../types';

interface ProgramsPageProps {
  onExplore: (course: Course) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ onExplore }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', ...new Set(mockCourses.map(c => c.category))];
  
  const filteredCourses = activeFilter === 'All' 
    ? mockCourses 
    : mockCourses.filter(c => c.category === activeFilter);

  return (
    <div className="bg-gray-900 py-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">All Placement Programs</h1>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Choose your path to a successful tech career. Every program comes with 100% placement assistance.</p>
        </motion.div>
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              whileHover={{ y: -2 }}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${activeFilter === category ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {category}
            </motion.button>
          ))}
        </div>
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} onExplore={onExplore} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
