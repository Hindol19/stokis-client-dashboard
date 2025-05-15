import React, { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Footer from "./footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-background p-4">
          <div className="w-full flex flex-row justify-center">
            <Navbar toggleSidebar={toggleSidebar} />
          </div>
          <div className="mt-[100px]">{children}</div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
