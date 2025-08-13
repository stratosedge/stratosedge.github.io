
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Users2, TrendingUp, Award, Code, BrainCircuit, Briefcase, FileCode, Cpu, BookOpen, Megaphone, Palette, CheckCircle, HelpCircle } from 'lucide-react';
import { Course } from '../types';
import { mockCourses } from '../data/courses';
import { FaqItem } from '../components/FaqItem';

interface InternshipsPageProps {
  onExplore: (course: Course) => void;
  isHomePageSection?: boolean;
}

const whyUsItems = [
  { icon: <Star className="text-yellow-400" />, text: "Live, industry-grade projects" },
  { icon: <Users2 className="text-yellow-400" />, text: "1-to-1 mentorship & weekly goals" },
  { icon: <TrendingUp className="text-yellow-400" />, text: "Career coaching + soft-skills workshops" },
  { icon: <Award className="text-yellow-400" />, text: "Certificate & Letter of Recommendation" },
];

const techDomains = [
  { icon: <Code />, name: "Web & Full-Stack Development", role: "Full Stack Developer" },
  { icon: <BrainCircuit />, name: "AI, Machine Learning & Data Science", role: "Data Scientist" },
  { icon: <Briefcase />, name: "Cybersecurity Awareness", role: "Security Analyst" },
  { icon: <FileCode />, name: "Python & Scripting Automation", role: "Automation Engineer" },
  { icon: <Cpu />, name: "IoT / Embedded Devices", role: "IoT Developer" },
];

const nonTechDomains = [
  { icon: <BookOpen />, name: "Content & Communication", role: "Technical Writer" },
  { icon: <Megaphone />, name: "Digital Marketing & SEO", role: "Digital Marketing Specialist" },
  { icon: <Palette />, name: "Instructional Design", role: "Instructional Designer" },
  { icon: <Users2 />, name: "HR & Talent Engagement", role: "HR Generalist" },
];

const faqs = [
  { q: "Is this a paid internship?", a: "This is an unpaid program focused on skill development. It includes high-value mentorship, a certificate, and a Letter of Recommendation (LOR) upon successful completion." },
  { q: "What is the duration?", a: "The standard duration is 4-6 weeks. Extensions are available upon request, based on performance and project requirements." },
  { q: "What is the mode of work?", a: "The internship is fully remote, offering flexibility. Mentor calls and team meetings are scheduled to ensure collaboration and guidance." },
  { q: "Who is eligible to apply?", a: "We welcome students from all backgrounds, including engineering, MBA, arts, and science streams. A passion for learning is the main prerequisite." },
  { q: "What are the requirements?", a: "A personal laptop and a stable internet connection are mandatory. Regular attendance in scheduled meetings and active participation are required." },
  { q: "Are there any fees involved?", a: "Yes, there is a program fee for the mentorship and resources provided. Please note that the fee, once paid, is non-refundable under any circumstances." },
];

export const InternshipsPage: React.FC<InternshipsPageProps> = ({ onExplore, isHomePageSection = false }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleDomainClick = (role: string) => {
    const course = mockCourses.find(c => c.role === role);
    if (course) {
      onExplore(course);
    }
  };

  return (
    <div className={`py-20 text-white ${isHomePageSection ? 'bg-gray-800' : 'bg-gray-900 min-h-screen'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">Gain Real-World Experience</h1>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">Our internships bridge the gap between academic theory and industry practice.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Internship Overview</h2>
              <p className="text-gray-300 mb-6">Our internship at STRATOS EDGE LEARNING immerses students in live projects, guided by expert mentors. From web-app builds to marketing campaigns, every task is real and impactful.</p>
              <ul className="space-y-3">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" />Practical work—not theory</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" />Weekly progress reports and mentor check-ins</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" />Certificate + personalized recommendations</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Internship Domains</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-indigo-300">🔧 Technical Domains</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {techDomains.map(d =>
                      <motion.button key={d.name} onClick={() => handleDomainClick(d.role)} whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }} whileTap={{ scale: 0.95 }} className="bg-gray-800 p-4 rounded-lg flex items-center text-left text-white border border-gray-700 hover:border-indigo-500">
                        <div className="text-sky-400 mr-3">{d.icon}</div>{d.name}
                      </motion.button>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-purple-300">🧠 Non-Technical / Creative Domains</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {nonTechDomains.map(d =>
                      <motion.button key={d.name} onClick={() => handleDomainClick(d.role)} whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }} whileTap={{ scale: 0.95 }} className="bg-gray-800 p-4 rounded-lg flex items-center text-left text-white border border-gray-700 hover:border-purple-500">
                        <div className="text-rose-400 mr-3">{d.icon}</div>{d.name}
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className={`p-6 rounded-xl border border-gray-700 ${isHomePageSection ? 'bg-gray-900' : 'bg-gray-800'}`}>
              <h2 className="text-2xl font-bold mb-4">Why Intern With Us?</h2>
              <ul className="space-y-4">
                {whyUsItems.map(item => (
                  <li key={item.text} className="flex items-center text-lg">
                    <div className="w-8 mr-4 flex-shrink-0">{item.icon}</div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-6 rounded-xl border border-gray-700 ${isHomePageSection ? 'bg-gray-900' : 'bg-gray-800'}`}>
              <h2 className="text-2xl font-bold mb-2 flex items-center"><HelpCircle className="mr-3" />FAQs</h2>
              <div className="mt-4">
                {faqs.map((faq, index) => (
                  <FaqItem key={index} faq={faq} index={index} openIndex={openFaq} setOpenIndex={setOpenFaq} />
                ))}
              </div>
              <div className="mt-6 p-3 bg-red-900/50 border border-red-500 rounded-lg text-center text-red-200 text-sm">
                <strong>Note:</strong> Fee once paid is non-refundable. Laptop and regular attendance are mandatory.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
