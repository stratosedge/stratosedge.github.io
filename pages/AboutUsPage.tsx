
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, Code, Megaphone, TrendingUp, Target, CheckCircle } from 'lucide-react';

const solutions = [
  { icon: <Briefcase/>, title: "Enterprise Training", desc: "Future-ready programs on innovation, culture transformation, DEI, and managerial capability building." },
  { icon: <Award/>, title: "Campus Readiness", desc: "Career mapping, behavioral interviews, resume diagnostics, and simulated assessments for job readiness." },
  { icon: <Code/>, title: "Tech Excellence", desc: "Learning paths in Gen AI, full-stack, cyber-security, cloud, and data science for upskilling tech teams." },
  { icon: <Megaphone/>, title: "Communication Mastery", desc: "Programs in assertive communication, client handling, storytelling, and business presentations." },
  { icon: <TrendingUp/>, title: "Leadership Acceleration", desc: "Executive coaching, leadership labs, agile frameworks, and strategic thinking simulations." },
  { icon: <Target/>, title: "Tailored Learning", desc: "Custom-built solutions to match domain maturity, team goals, and organizational culture." },
];

const expertiseItems = [
  "Strategic Decision-Making, Executive Presence, Business Storytelling",
  "Career Acceleration, Agile Learning, Talent Development",
  "Emotional Intelligence, Human Error Prevention, DEI Training",
  "Sales Enablement, Negotiation Mastery, Customer-Centric Selling",
  "Crisis Communication, Risk Mitigation, Change Management",
  "Productivity Enhancement, Stress & Time Management",
  "AI-Driven Learning, Digital Transformation in Training",
  "Industry-Specific Adaptability: IT, BFSI, Telecom, Manufacturing",
];

export const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-gray-900 py-20 min-h-screen text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Transforming Talent for Tomorrow's Workforce</h1>
          <p className="text-lg text-indigo-300 mt-4 max-w-4xl mx-auto">Corporate Enablement | Campus-to-Corporate Readiness | Leadership Development | Digital Upskilling</p>
        </motion.div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">About Us</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 0.1}} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-sky-400 mb-2">🌐 Our Identity</h3>
              <p className="text-gray-400">Certified MSME entity from Hyderabad, delivering enterprise-grade training programs across sectors.</p>
            </motion.div>
            <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 0.2}} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-sky-400 mb-2">🎓 Vision-Driven Mission</h3>
              <p className="text-gray-400">To power business success and workforce relevance through innovative, AI-integrated L&D interventions.</p>
            </motion.div>
            <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 0.3}} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-sky-400 mb-2">🤝 Strategic Partnerships</h3>
              <p className="text-gray-400">Collaborating with corporates, academia, and startups to co-create contextual learning journeys.</p>
            </motion.div>
          </div>
        </div>

        <div className="mb-20 bg-gray-800 rounded-xl border border-gray-700 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <motion.div initial={{opacity: 0, scale: 0.8}} whileInView={{opacity: 1, scale: 1}} viewport={{once: true}} className="flex-shrink-0">
            <img src="https://picsum.photos/seed/founder/150/150" alt="Hari Krishna K" className="w-36 h-36 rounded-full border-4 border-indigo-500 shadow-lg"/>
          </motion.div>
          <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{delay: 0.2}}>
            <h2 className="text-3xl font-bold mb-2">Meet Hari Krishna K</h2>
            <p className="text-indigo-300 font-semibold">Co-Founder & CEO of Stratos Edge Learning</p>
            <p className="text-gray-300 mt-4">Hari Krishna K brings 16+ years of unmatched experience in empowering leaders, students, and professionals to unlock their full potential. He has collaborated with Fortune 500s, Ivy League colleges, and top-tier startups to build high-impact soft skills programs.</p>
            <p className="mt-4 text-gray-400 italic border-l-4 border-indigo-500 pl-4">"Training is not about ticking a box. It’s about transforming potential into performance."</p>
          </motion.div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">Our Solutions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((s, i) => (
              <motion.div key={s.title} initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: i * 0.1}} className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-start gap-4">
                <div className="text-green-400 flex-shrink-0 mt-1">{s.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-gray-400">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">Detailed Expertise</h2>
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {expertiseItems.map((item, i) => (
                <motion.li key={i} initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{delay: i * 0.05}} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0"/>
                  <span className="text-gray-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
