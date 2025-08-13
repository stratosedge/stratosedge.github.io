
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
  <div className="bg-gray-900 pt-10 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Flagship Placement Programs</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">These programs are designed with one goal: to get you hired by a top tech company.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockCourses.filter(c => c.featured).map(course => <CourseCard key={course.id} course={course} onExplore={onExplore} />)}
        </div>
      </div>
    </div>
    {/* About STRATOS EDGE LEARNING (moved below programs) */}
  <div className="bg-gray-900 pt-8 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">STRATOS EDGE LEARNING</h2>
            <p className="text-gray-300 mt-4 max-w-3xl mx-auto">An AICTE-approved, next-gen skilling and career enablement platform. We blend classroom learning with live industry exposure through internships, corporate collaboration, job-focused certifications, and expert-led training.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-indigo-300 mb-3">Key Offerings</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Industry-driven Internships & Live Projects</li>
                <li>AICTE-linked Career-Readiness Programs</li>
                <li>NAAC/NBA support for colleges</li>
                <li>Placement-focused Certification Courses</li>
                <li>Corporate Training & L&D Solutions</li>
                <li>Faculty Development Programs</li>
              </ul>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-indigo-300 mb-3">Who We Serve</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><span className="font-medium">Students:</span> internships, employability, and career clarity</li>
                <li><span className="font-medium">Colleges:</span> academic–industry integration and branding</li>
                <li><span className="font-medium">Corporates:</span> internship hiring, training collaborations, and project-based engagements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    <InternshipsPage onExplore={onExplore} isHomePageSection={true} />
  </>
);
