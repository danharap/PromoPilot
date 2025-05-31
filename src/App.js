import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import LandingNavbar from './components/LandingNavbar';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import Campaigns from './pages/Campaigns';
import ScheduledPosts from './pages/ScheduledPosts';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';
import Blog from './pages/Blog';
import Community from './pages/Community';
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

  const handleNavigateToHelp = () => {
    setCurrentPage('help');
  };

  const handleNavigateToBlog = () => {
    setCurrentPage('blog');
  };  const handleNavigateToCommunity = () => {
    setCurrentPage('community');
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
      case 'help':
        return <HelpCenter />;
      case 'blog':
        return <Blog />;
      case 'community':
        return <Community />;
      default:
        return <Dashboard />;
    }
  };  // Show landing page when not authenticated and on landing page
  if (!isAuthenticated && currentPage === 'landing') {
    return (
      <LandingPage 
        onGetStarted={handleSignUp}
        onSignIn={handleNavigateToSignIn}
        onNavigateToHelp={handleNavigateToHelp}
        onNavigateToBlog={handleNavigateToBlog}
        onNavigateToCommunity={handleNavigateToCommunity}
      />
    );
  }
  // Show resource pages even when not authenticated
  if (!isAuthenticated && (currentPage === 'help' || currentPage === 'blog' || currentPage === 'community')) {
    const resourcePages = {
      'help': <HelpCenter onBackToLanding={handleBackToLanding} />,
      'blog': <Blog onBackToLanding={handleBackToLanding} />,
      'community': <Community onBackToLanding={handleBackToLanding} />
    };
    
    return (
      <div className="min-h-screen">
        <LandingNavbar 
          onLogin={handleNavigateToSignIn}
          onSignUp={handleSignUp}
          onNavigateToHelp={handleNavigateToHelp}
          onNavigateToBlog={handleNavigateToBlog}
          onNavigateToCommunity={handleNavigateToCommunity}
          onBackToLanding={handleBackToLanding}
        />
        {resourcePages[currentPage]}
      </div>
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
