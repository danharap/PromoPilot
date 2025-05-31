import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
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
  const [currentPage, setCurrentPage] = useState('landing');  const handleSignIn = () => {
    console.log('handleSignIn called');
    setIsAuthenticated(true);
    setCurrentPage('dashboard'); // Navigate to dashboard after successful sign-in
  };
    const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing'); // Navigate back to landing page after sign out
  };
  
  const handleBackToLanding = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing'); // Navigate back to landing page while maintaining session
  };
  
  const handleNavigateToSignIn = () => {
    setCurrentPage('signin');
  };

  const handleSignUp = () => {
    setCurrentPage('signin');
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

  // Show landing page when not authenticated and on landing page
  if (!isAuthenticated && currentPage === 'landing') {
    return (
      <LandingPage 
        onGetStarted={handleSignUp}
        onSignIn={handleNavigateToSignIn}
      />
    );
  }

  // Show sign-in page when not authenticated and on signin page
  if (!isAuthenticated) {
    return <SignIn onSignIn={handleSignIn} />;
  }  return (
    <MainLayout 
      user={mockUser}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onSignOut={handleSignOut}
      onBackToLanding={handleBackToLanding}
    >
      {renderCurrentPage()}
    </MainLayout>
  );
}

export default App;
