import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      className="bg-card py-4 px-6 border-t border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-400 mb-3 md:mb-0">&copy; {new Date().getFullYear()} StockInsight. All rights reserved.</div>
        <div className="flex space-x-4">
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Terms</a>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Privacy</a>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Contact</a>
        </div>
      </div>
    </motion.footer>
  );
}
