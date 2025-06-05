import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Footer from "./footer";
import {getUserDetails} from "@/lib/utilityFunctions";
import {HashLoader} from "react-spinners";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(false);
  useEffect(() => {
    async function fetchUserData() {
      setUserLoading(true);
      const data = await getUserDetails();
      setUserLoading(false);
      setUserData(data?.user);
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log("User data fetched in MainLayout:", userData);
    
  }, [userData]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Loading Spinner */}
      {userLoading && (
        <div className="flex z-50 absolute items-center justify-center w-full h-full bg-background">
          <HashLoader color="#FFFFFF" size={50} />
        </div>
      )}
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userData={userData}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-background p-4">
          <div className="w-full flex flex-row justify-center">
            <Navbar toggleSidebar={toggleSidebar} userData={userData} />
          </div>
          <div className="mt-[100px]">{children}</div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
