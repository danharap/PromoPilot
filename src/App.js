import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import Campaigns from './pages/Campaigns';
import ScheduledPosts from './pages/ScheduledPosts';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function AppShell() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showAuth, setShowAuth] = useState(false);
  const [globalBanner, setGlobalBanner] = useState(null); // { type: 'success'|'error', message }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connected = params.get('platform_connected');
    const err = params.get('platform_error');
    if (connected === 'mastodon') {
      setCurrentPage('settings');
      setGlobalBanner({ type: 'success', message: 'Mastodon account connected successfully!' });
      window.history.replaceState({}, '', window.location.pathname);
    } else if (err) {
      setCurrentPage('settings');
      setGlobalBanner({
        type: 'error',
        message: `Connection failed: ${decodeURIComponent(err).replace(/\+/g, ' ')}`,
      });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (showAuth) return <SignIn onBack={() => setShowAuth(false)} />;
    return <Landing onGetStarted={() => setShowAuth(true)} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'create':
        return <CreatePost setCurrentPage={setCurrentPage} />;
      case 'campaigns':
        return <Campaigns />;
      case 'scheduled':
        return <ScheduledPosts setCurrentPage={setCurrentPage} />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {globalBanner && (
        <div className={`mb-4 p-4 rounded-lg border flex items-start justify-between ${
          globalBanner.type === 'success'
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <p className="text-sm font-medium">{globalBanner.message}</p>
          <button
            onClick={() => setGlobalBanner(null)}
            className="ml-4 text-gray-400 hover:text-gray-600 text-lg leading-none"
          >
            &times;
          </button>
        </div>
      )}
      {renderCurrentPage()}
    </MainLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}

export default App;
