import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useMobile } from '@/hooks/use-mobile';
import { BarChart3, BarChart4, Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const [location] = useLocation();
  const isMobile = useMobile();

  const LinkItem = ({ href, text, Icon }: { href: string; text: string; Icon: React.ElementType }) => {
    const isActive = location === href;
    
    return (
      <motion.li 
        initial={{ opacity: 0, x: -10 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.2 }}
      >
        <Link href={href} className={`flex items-center p-2 text-base font-medium rounded-lg ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} group transition-colors duration-200`}>
            <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'} transition duration-75 group-hover:text-white`} />
            {!collapsed && <span className="ml-3">{text}</span>}
        </Link>
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
      
      <motion.aside
        className={`bg-sidebar w-${collapsed ? '16' : '64'} border-r border-gray-700 flex-shrink-0 fixed h-full z-30 md:relative transition-all duration-300 ease-in-out`}
        animate={{ width: collapsed ? 64 : 256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-primary" />
              {!collapsed && <h1 className="text-xl font-bold text-white">StockInsight</h1>}
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
              <LinkItem href="/" text="Dashboard" Icon={BarChart3} />
              <LinkItem href="/company-performance" text="Company Performance" Icon={BarChart4} />
              <LinkItem href="/news-analysis" text="News Analysis" Icon={Newspaper} />
            </motion.ul>
          </nav>
          
          {/* User */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center">
              <img 
                className="h-9 w-9 rounded-full" 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="User avatar" 
              />
              {!collapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-gray-400">Premium User</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
