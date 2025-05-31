import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = ({ children, user, currentPage, setCurrentPage, onSignOut, onBackToLanding }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onSignOut={onSignOut} onBackToLanding={onBackToLanding} />
      
      <div className="flex">
        <Sidebar 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
