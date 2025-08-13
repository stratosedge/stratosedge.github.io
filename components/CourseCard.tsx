
import React from 'react';
import { motion } from 'framer-motion';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onExplore: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onExplore }) => (
  <motion.div
    layoutId={`course-card-${course.id}`}
    whileHover={{ y: -8, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
    className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 border border-gray-700 flex flex-col"
  >
    <div className="p-6 flex-grow flex flex-col">
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-full bg-gray-700 mr-4">{course.icon}</div>
        <h3 className="text-xl font-bold text-white">{course.title}</h3>
      </div>
      <p className="text-gray-400 mb-4 text-sm flex-grow">{course.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-300 mt-auto">
        <span>{course.duration}</span>
        <span className="font-semibold text-indigo-400">{course.price}</span>
      </div>
    </div>
    <div className="p-4 bg-gray-700/50">
      <button
        onClick={() => onExplore(course)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
      >
        Explore
      </button>
    </div>
  </motion.div>
);
