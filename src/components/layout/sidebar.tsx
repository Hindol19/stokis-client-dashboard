import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useMobile } from '@/hooks/use-mobile';
import { BarChart3, BarChart4, Newspaper, ChevronLeft, ChevronRight, LayoutDashboard, TrendingUp, MessageSquare, Bot } from 'lucide-react';
import {getNameInitials} from '@/lib/utilityFunctions';
import Logo from '@/assets/Logo.png';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  userData: any; // Adjust type as needed
}

export default function Sidebar({ collapsed, setCollapsed, userData }: SidebarProps) {
  const [location] = useLocation();
  const isMobile = useMobile();

  const LinkItem = ({ href, text, Icon, disabled=false }: { href: string; text: string; Icon: React.ElementType; disabled?: boolean }) => {
    const isActive = location === href;
    
    return (
      <motion.li 
        initial={{ opacity: 0, x: -10 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.2 }}
      >
        {disabled ? (
          <div className="text-gray-400  p-2 rounded-lg cursor-not-allowed opacity-70 flex flex-row items-center">
            <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'} transition duration-75 group-hover:text-white`} />
            {!collapsed && <span className="ml-3">{text}</span>}
          </div>
        ) : (
          <Link href={href}  className={`flex items-center p-2 text-base font-medium rounded-lg ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} group transition-colors duration-200`}>
            <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'} transition duration-75 group-hover:text-white`} />
            {!collapsed && <span className="ml-3">{text}</span>}
          </Link>
        )}
      </motion.li>
    );
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setCollapsed(true)}
        />
      )}
      
      <div
        className={`bg-sidebar w-${collapsed ? '16' : '64'} border-r border-gray-700 flex-shrink-0 fixed h-full z-30 md:relative transition-all duration-300 ease-in-out`}
        
        // transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-2 transition-opacity duration-300 ease-in-out">
              <img src={Logo} alt="Logo" className={`h-16 w-16 ${collapsed ? 'hidden' : 'block'}`} />
              {!collapsed && <h1 className="text-4xl font-bold text-white">Stokis</h1>}
            </div>
            
            <button 
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white p-1 rounded-full hidden md:block"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <motion.ul className="space-y-2">
              <LinkItem href="/dashboard" text="Dashboard" Icon={LayoutDashboard} />
              {/* <LinkItem href="/company-performance" text="Company Performance" Icon={BarChart4} /> */}
              <LinkItem href="/company-performance" text="Company Performance" Icon={TrendingUp} disabled={false} />
              <LinkItem href="/news-analysis" text="News Analysis" Icon={Newspaper} disabled={false} />
              <LinkItem href="/chatbot" text="Stokis AI" Icon={Bot} disabled={false} />
            </motion.ul>
          </nav>
          
          {/* User */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center">
              <span className='bg-green-800 rounded-full flex items-center justify-center p-2 font-bold'>
                {getNameInitials(userData?.name || 'User')}
              </span>
              {!collapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{userData?.name}</p>
                  <p className="text-xs text-gray-400">{userData?.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
