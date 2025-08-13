
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ProfileCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

export const ProfileCompletionModal: React.FC<ProfileCompletionModalProps> = ({ isOpen, onClose, onNavigate }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-gray-800 rounded-xl w-full max-w-md p-8 border border-gray-700 shadow-2xl text-center"
          onClick={e => e.stopPropagation()}
        >
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Complete Your Profile</h2>
          <p className="text-gray-300 my-4">Please fill out all your profile details before enrolling in a course. This helps us tailor the best experience for you.</p>
          <motion.button onClick={onNavigate} whileHover={{ scale: 1.05 }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg">
            Go to Profile
          </motion.button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
