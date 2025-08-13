
import React from 'react';

export const Footer: React.FC = () => (
  <footer className="bg-gray-900 border-t border-gray-800">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
      <p>© {new Date().getFullYear()} StratosEdge. All Rights Reserved.</p>
      <p className="text-sm mt-2">Your AI-Powered Gateway to a Career in Top Tech Companies.</p>
    </div>
  </footer>
);
