
import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../types';

interface HeroSectionProps {
  setPage: (page: Page) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setPage }) => {
  const headlineText = "Your Dream MNC Job is Within Reach.";
  const animatedHeadline = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative bg-gray-900 text-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-purple-900 opacity-60"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h1
          variants={animatedHeadline}
          initial="hidden"
          animate="visible"
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          {headlineText.split("").map((char, index) => (
            <motion.span key={char + "-" + index} variants={letterVariant}>{char}</motion.span>
          ))}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="max-w-3xl mx-auto text-base md:text-lg text-gray-300 mb-8"
        >
          We provide elite training, AI-powered career tools, and direct placement support to help you land high-paying tech roles at top multinational corporations.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        >
          <motion.button
            onClick={() => setPage('Programs')}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-base transition-all duration-300 shadow-lg"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
