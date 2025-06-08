import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer 
      className="bg-gradient-to-r from-blue-900/80 via-indigo-900/70 to-purple-900/80 py-4 px-6 border-t border-blue-800/50 shadow-inner"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-blue-200 mb-3 md:mb-0 flex items-center">
          {/* <div className="w-5 h-5 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-md mr-2 shadow-md"></div> */}
          <span>&copy; {new Date().getFullYear()} Stokis. All rights reserved.</span>
        </div>
        <div className="flex space-x-6">
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-blue-300 hover:text-white transition-colors duration-200">Terms</a>
            <a href="#" className="text-sm text-blue-300 hover:text-white transition-colors duration-200">Privacy</a>
            <a href="#" className="text-sm text-blue-300 hover:text-white transition-colors duration-200">Contact</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-3 pl-4 border-l border-blue-700/50">
            <a href="#" className="text-blue-300 hover:text-cyan-300 transition-colors">
              <Github size={16} />
            </a>
            <a href="#" className="text-blue-300 hover:text-cyan-300 transition-colors">
              <Twitter size={16} />
            </a>
            <a href="#" className="text-blue-300 hover:text-cyan-300 transition-colors">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
