import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import Campaigns from './pages/Campaigns';
import ScheduledPosts from './pages/ScheduledPosts';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { mockUser } from './data/mockUser';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleSignIn = () => {
    console.log('handleSignIn called');
    setIsAuthenticated(true);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'create':
        return <CreatePost />;
      case 'campaigns':
        return <Campaigns />;
      case 'scheduled':
        return <ScheduledPosts />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  return (
    <MainLayout 
      user={mockUser}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      {renderCurrentPage()}
    </MainLayout>
  );
}

export default App;
