
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Faq {
  q: string;
  a: string;
}

interface FaqItemProps {
  faq: Faq;
  index: number;
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}

export const FaqItem: React.FC<FaqItemProps> = ({ faq, index, openIndex, setOpenIndex }) => {
  const isOpen = index === openIndex;

  return (
    <div className="border-b border-gray-700">
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full flex justify-between items-center text-left py-4"
      >
        <span className="font-semibold text-white">{faq.q}</span>
        {isOpen ? <ChevronUp className="text-indigo-400" /> : <ChevronDown className="text-indigo-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 pb-4 pr-6">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
