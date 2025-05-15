import React, { useState } from 'react';
import { Home, Settings, Moon, Sun, Menu, LogOut, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/context/auth-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const currentDate = formatDate(new Date());
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 z-50 w-[60%] bg-gradient-to-r from-blue-900/80 via-indigo-900/70 to-purple-900/80 border-b border-blue-800/50 shadow-md rounded-full m-4 backdrop-blur-sm">
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
          
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500" aria-label="User menu">
                  <img 
                    className="h-8 w-8 rounded-full ring-2 ring-cyan-500/50" 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="User avatar" 
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gradient-to-b from-blue-900/95 to-indigo-900/95 border-blue-700">
                <DropdownMenuLabel className="text-blue-200">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-blue-700/50" />
                <DropdownMenuItem className="text-blue-100 hover:bg-blue-800/50 focus:bg-blue-800/50">Profile</DropdownMenuItem>
                <DropdownMenuItem className="text-blue-100 hover:bg-blue-800/50 focus:bg-blue-800/50">Settings</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-blue-700/50" />
                <DropdownMenuItem onClick={logout} className="text-rose-300 hover:text-rose-200 hover:bg-rose-900/30 focus:bg-rose-900/30">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
