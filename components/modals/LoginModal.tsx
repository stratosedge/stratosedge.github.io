
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (payload: { email: string; password: string; mode: 'login' | 'signup' }) => void;
  onTermsClick: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, onTermsClick }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gray-800 rounded-xl w-full max-w-md p-8 border border-gray-700 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{mode === 'login' ? 'Login to StratosEdge' : 'Create your account'}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white"><X /></button>
            </div>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
              const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
              onLogin({ email, password, mode });
            }}>
              <div className="space-y-4">
                <input type="email" name="email" placeholder="Email Address" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500" />
                <input type="password" name="password" placeholder="Password" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500" />
              </div>
              {mode === 'signup' && (
                <div className="mt-4 flex items-center">
                  <input id="terms" name="terms" type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                    I agree to the <button onClick={(e) => { e.preventDefault(); onTermsClick(); }} className="text-indigo-400 hover:text-indigo-300 underline">Terms and Conditions</button>
                  </label>
                </div>
              )}
              <motion.button type="submit" whileHover={{ scale: 1.02 }} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={mode === 'signup' && !isChecked}>
                {mode === 'login' ? 'Login' : 'Create account'}
              </motion.button>
              <div className="mt-4 text-center text-sm text-gray-400">
                {mode === 'login' ? (
                  <>
                    Don&apos;t have an account?{' '}
                    <button onClick={(e) => { e.preventDefault(); setMode('signup'); }} className="text-indigo-400 hover:text-indigo-300 underline">Create one</button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button onClick={(e) => { e.preventDefault(); setMode('login'); }} className="text-indigo-400 hover:text-indigo-300 underline">Log in</button>
                  </>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
