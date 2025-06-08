import React, { useState } from 'react';
import { Home, Settings, Moon, Sun, Menu, LogOut, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/context/auth-provider';
import { useLocation } from 'wouter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getNameInitials } from '@/lib/utilityFunctions';

interface NavbarProps {
  toggleSidebar: () => void;
  userData: any; // Adjust type as needed
}

export default function Navbar({ toggleSidebar, userData }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  // const { logout } = useAuth();
  const [, setLocation] = useLocation();
  const logout = () => {
    localStorage.removeItem('authToken'); // Clear auth token
    setLocation("/login") // Redirect to login page
  };
  const currentDate = formatDate(new Date());
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 z-40 w-[60%] bg-gradient-to-r from-blue-900/80 via-indigo-900/70 to-purple-900/80 border-b border-blue-800/50 shadow-md rounded-full m-4 backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side: Date and toggle button */}
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-blue-300 hover:text-white hover:bg-blue-800/50 focus:outline-none mr-2 md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-blue-200 text-sm font-medium px-3 py-1.5 bg-blue-800/30 rounded-full border border-blue-700/50">
            {currentDate}
          </div>
        </div>
        
        {/* Search bar - hidden on mobile */}
        {/* <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-blue-300" />
            </div>
            <input
              type="text"
              className="bg-blue-900/30 border border-blue-700/50 text-blue-100 text-sm rounded-lg focus:ring-cyan-500/50 focus:border-cyan-500/50 block w-full pl-10 p-2 transition-colors"
              placeholder="Search..."
            />
          </div>
        </div> */}
        
        {/* Right side: Icons */}
        <motion.div 
          className="flex items-center space-x-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button className="text-blue-300 hover:text-white p-2 rounded-full hover:bg-blue-800/50 transition-colors" aria-label="Home">
            <Home className="w-5 h-5" />
          </button>
          
          {/* <div className="relative">
            <button className="text-blue-300 hover:text-white p-2 rounded-full hover:bg-blue-800/50 transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0.5 block h-2 w-2 rounded-full bg-cyan-400" />
            </button>
          </div>
          
          <button className="text-blue-300 hover:text-white p-2 rounded-full hover:bg-blue-800/50 transition-colors" aria-label="Settings">
            <Settings className="w-5 h-5" />
          </button>
          
          <button 
            onClick={toggleTheme} 
            className="text-blue-300 hover:text-white p-2 rounded-full hover:bg-blue-800/50 transition-colors" 
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button> */}
        </motion.div>
      </div>
    </header>
  );
}
