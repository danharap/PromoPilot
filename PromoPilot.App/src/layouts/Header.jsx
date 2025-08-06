import React, { useState } from 'react';
import { ChevronDown, Home, LogOut } from 'lucide-react';
import Logo from '../components/Logo';

const Header = ({ user, onSignOut, onBackToLanding }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <Logo />
        
        <div className="flex items-center space-x-4">
          {/* Back to Home Button */}
          <button
            onClick={onBackToLanding}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Back to Home"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={onSignOut}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{user.initials}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
              {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
