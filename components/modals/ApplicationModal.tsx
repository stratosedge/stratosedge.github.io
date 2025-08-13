import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';
import { Course } from '../../types';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onApply: () => Promise<void>;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, course, onApply }) => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  const handleApply = async () => {
    setStatus('processing');
    try {
      await onApply();
      setStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus('failed');
    }
  };

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
    }
  }, [isOpen]);

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="text-center py-8">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-dashed border-indigo-400 rounded-full mx-auto"></motion.div>
            <p className="text-white mt-4 text-lg">Submitting Application...</p>
            <p className="text-gray-400 text-sm">Please do not close this window.</p>
          </div>
        );
      case 'success':
        return (
          <div className="text-center py-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }} className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            <p className="text-white mt-4 text-xl font-bold">Application Submitted!</p>
            <p className="text-gray-400 text-sm">We have received your application and will be in touch soon.</p>
          </div>
        );
      case 'failed':
        return (
          <div className="text-center py-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }} className="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center">
              <X className="w-10 h-10 text-white" />
            </motion.div>
            <p className="text-white mt-4 text-xl font-bold">Application Failed</p>
            <p className="text-gray-400 text-sm mb-6">Something went wrong. Please try again.</p>
            <motion.button onClick={() => setStatus('idle')} whileHover={{ scale: 1.02 }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg">Try Again</motion.button>
          </div>
        );
      case 'idle':
      default:
        return (
          <>
            <p className="text-gray-300 mb-2">You are applying for:</p>
            <h3 className="text-xl font-semibold text-indigo-300 mb-4">{course?.title}</h3>
            <div className="bg-gray-900/50 p-4 rounded-lg flex justify-between items-center">
              <span className="text-gray-400">Program Fee</span>
              <span className="text-2xl font-bold text-white">{course?.price}</span>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">By applying, you agree to be contacted by our team.</p>
            <motion.button onClick={handleApply} whileHover={{ scale: 1.02 }} className="mt-6 w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg">
              <Send className="mr-2" /> Apply Now
            </motion.button>
             <p className="text-center text-sm text-gray-400 mt-4">We will get in touch with you soon.</p>
          </>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="bg-gray-800 rounded-xl w-full max-w-md p-8 border border-gray-700 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Complete Your Application</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white disabled:text-gray-600" disabled={status === 'processing' || status === 'success'}><X /></button>
            </div>
            {renderContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};