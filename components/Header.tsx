
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, LogOut, X } from 'lucide-react';
import { Page, User } from '../types';
import Logo from '../png/STRATOS-EDGE.png';

interface HeaderProps {
  setPage: (page: Page) => void;
  setSelectedCourse: (course: null) => void;
  currentPage: Page;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ setPage, setSelectedCourse, currentPage, user, onLoginClick, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  let navLinks: Page[] = ['Home', 'Programs', 'Internships', 'About Us'];
  if (user) {
    navLinks = ['Home', 'Programs', 'Internships', 'Profile'];
  }

  const handleNavigate = (page: Page) => {
    setSelectedCourse(null);
    setPage(page);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex items-center justify-between py-2 md:py-3">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            {/* Logo image (kept for future). To restore the image logo, uncomment the line below and adjust colors to match the background: */}
            {/** <img src={Logo} alt="StratosEdge" className="h-20 md:h-24 lg:h-24 w-auto object-contain" /> **/}
            <button onClick={() => handleNavigate('Home')} className="text-2xl font-bold leading-none text-white focus:outline-none">
              Stratos<span className="text-indigo-400">Edge</span>
            </button>
          </motion.div>

          <div className="hidden md:flex items-center">
    <nav className="ml-10 flex items-baseline space-x-4">
              {navLinks.map(link => (
                <button
                  key={link}
                  onClick={() => handleNavigate(link)}
      className={`px-3 py-1.5 md:py-2 rounded-md text-sm font-medium transition-colors duration-300 ${currentPage === link ? 'bg-indigo-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                >
                  {link}
                </button>
              ))}
            </nav>
            <div className="ml-6">
              {user ? (
                <motion.button onClick={onLogout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg text-sm transition-colors duration-300">
                  <LogOut className="w-4 h-4 mr-2" />Logout
                </motion.button>
              ) : (
                <motion.button onClick={onLoginClick} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-300">
                  <LogIn className="w-4 h-4 mr-2" />Login
                </motion.button>
              )}
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map(link => (
                <button key={link} onClick={() => handleNavigate(link)} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">{link}</button>
              ))}
              <div className="border-t border-gray-700 pt-4 mt-4 px-2">
                {user ? (
                  <button onClick={() => { onLogout(); setIsOpen(false);}} className="w-full flex items-center justify-center bg-red-600 text-white font-semibold py-2 px-3 rounded-lg text-sm"><LogOut className="w-4 h-4 mr-2"/>Logout</button>
                ) : (
                  <button onClick={() => { onLoginClick(); setIsOpen(false); }} className="w-full flex items-center justify-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg text-sm"><LogIn className="w-4 h-4 mr-2"/>Login / Sign Up</button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
