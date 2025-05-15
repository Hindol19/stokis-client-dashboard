import React, { useState } from 'react';
import { Home, Settings, Moon, Sun, Menu, LogOut } from 'lucide-react';
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
    <header className="bg-card border-b border-gray-700">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side: Date and toggle button */}
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none mr-2 md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-gray-300 text-sm font-medium">
            {currentDate}
          </span>
        </div>
        
        {/* Right side: Icons */}
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button className="text-gray-400 hover:text-white p-1" aria-label="Home">
            <Home className="w-6 h-6" />
          </button>
          <button className="text-gray-400 hover:text-white p-1" aria-label="Settings">
            <Settings className="w-6 h-6" />
          </button>
          <button 
            onClick={toggleTheme} 
            className="text-gray-400 hover:text-white p-1" 
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500" aria-label="User menu">
                  <img 
                    className="h-8 w-8 rounded-full" 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="User avatar" 
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
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
