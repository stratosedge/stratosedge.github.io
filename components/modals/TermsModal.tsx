
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-gray-800 rounded-xl w-full max-w-lg p-8 border border-gray-700 shadow-2xl flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Terms and Conditions</h2>
          <div className="text-gray-300 space-y-2 text-sm max-h-96 overflow-y-auto pr-2 flex-grow">
            <p>Welcome to StratosEdge. These terms and conditions outline the rules and regulations for the use of our website and services.</p>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use StratosEdge if you do not agree to take all of the terms and conditions stated on this page.</p>
            <p><strong>Cookies:</strong> The website uses cookies to help personalize your online experience. By accessing StratosEdge, you agreed to use the required cookies.</p>
            <p><strong>License:</strong> Unless otherwise stated, StratosEdge and/or its licensors own the intellectual property rights for all material on StratosEdge. All intellectual property rights are reserved. You may access this from StratosEdge for your own personal use subjected to restrictions set in these terms and conditions.</p>
            <p><strong>Enrollment:</strong> All program fees are non-refundable under any circumstances. A personal laptop and regular attendance are mandatory for all programs and internships.</p>
            <p><strong>Liability:</strong> We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>
          </div>
          <motion.button onClick={onClose} whileHover={{ scale: 1.05 }} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg">
            Close
          </motion.button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
