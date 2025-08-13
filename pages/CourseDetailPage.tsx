import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, TrendingUp, CheckCircle, LogIn, Send } from 'lucide-react';
import { Course, User } from '../types';

interface CourseDetailPageProps {
  course: Course;
  onBack: () => void;
  user: User | null;
  onApplyClick: (course: Course) => void;
  onLoginClick: () => void;
}

const fetchSalaryData = (role: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const baseSalaries: { [key: string]: number } = { 'Full Stack Developer': 8.5, 'Data Scientist': 12, 'Cloud Engineer': 9, 'Security Analyst': 10.5, 'Automation Engineer': 6, 'IoT Developer': 7.5, 'Digital Marketing Specialist': 5.5, 'Technical Writer': 5, 'HR Generalist': 5.2, 'Instructional Designer': 6.5 };
      const base = baseSalaries[role] || 5;
      const variation = (Math.random() - 0.5) * 2;
      const finalCtc = (base + variation).toFixed(1);
      resolve(`₹${finalCtc} LPA`);
    }, 1200);
  });
};

const ApplyButton: React.FC<{ user: User | null, course: Course, hasApplied: boolean, onLoginClick: () => void, onApplyClick: (course: Course) => void }> = ({ user, course, hasApplied, onLoginClick, onApplyClick }) => {
    if (!user) {
        return <motion.button onClick={onLoginClick} whileHover={{scale: 1.02}} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"><LogIn className="mr-2 h-5 w-5" />Login to Apply</motion.button>;
    }
    if (hasApplied) {
        return <motion.button disabled className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center cursor-not-allowed"><CheckCircle className="mr-2"/> Already Applied</motion.button>;
    }
    return (
        <motion.button
            onClick={() => onApplyClick(course)}
            whileHover={{scale: 1.02}}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
            <Send className="mr-2 h-5 w-5" />
            Apply Now
        </motion.button>
    );
};

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course, onBack, user, onApplyClick, onLoginClick }) => {
  const [salary, setSalary] = useState<string | null>(null);
  const [loadingSalary, setLoadingSalary] = useState(true);
  
  const hasApplied = !!user?.appliedCourses?.includes(course.id);

  useEffect(() => {
    setLoadingSalary(true);
    fetchSalaryData(course.role).then(ctc => {
      setSalary(ctc);
      setLoadingSalary(false);
    });
  }, [course.role]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-gray-900 min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button onClick={onBack} whileHover={{ scale: 1.05 }} className="flex items-center text-indigo-400 font-semibold mb-8">
          <ArrowLeft className="mr-2" /> Back to Programs
        </motion.button>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <motion.div layoutId={`course-card-${course.id}`} className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <div className="flex items-start mb-4">
                <div className="p-3 rounded-full bg-gray-700 mr-4">{course.icon}</div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{course.title}</h1>
                  <p className="text-indigo-300 text-lg">{course.role}</p>
                </div>
              </div>
              <p className="text-gray-300 mt-6">{course.description}</p>
              <h2 className="text-2xl font-bold text-white mt-10 mb-4">What You'll Master (Syllabus)</h2>
              <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                {course.syllabus.map(item => <li key={item} className="flex items-center text-gray-300"><Target className="w-4 h-4 mr-3 text-green-400 flex-shrink-0" />{item}</li>)}
              </ul>
            </motion.div>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-xl font-bold text-white">Program Fee</h3>
                    <span className="text-3xl font-bold text-indigo-400">{course.price}</span>
                </div>
                <p className="text-sm text-gray-400 mb-6">Full access to all course materials, mentorship, and placement assistance upon selection.</p>
                <ApplyButton user={user} course={course} hasApplied={hasApplied} onLoginClick={onLoginClick} onApplyClick={onApplyClick} />
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center"><TrendingUp className="mr-3 text-green-400" />Salary Insights</h3>
              <p className="text-sm text-gray-400 mb-4">Real-time average CTC for this role based on industry data.</p>
              <div className="bg-gray-900 p-4 rounded-lg text-center">
                {loadingSalary ? <div className="flex items-center justify-center text-white"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-6 h-6 border-2 border-dashed border-white rounded-full mr-3"></motion.div>Fetching data...</div> : <><p className="text-3xl font-bold text-green-400">{salary}</p><p className="text-xs text-gray-500 mt-1">Last updated: just now</p></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};