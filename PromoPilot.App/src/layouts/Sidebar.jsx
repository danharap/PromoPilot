import React from 'react';
import { 
  Home, 
  PlusCircle, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut,
  MessageSquare
} from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, isMobile, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'create', label: 'Create Post', icon: PlusCircle },
    { id: 'campaigns', label: 'Campaigns', icon: MessageSquare },
    { id: 'scheduled', label: 'Scheduled Posts', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const sidebarClasses = isMobile 
    ? `fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
    : 'w-64 bg-white border-r border-gray-200';

  return (
    <>
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
      )}
      
      <div className={sidebarClasses}>
        <div className="flex flex-col h-full">
          <div className="flex-1 py-6">
            <nav className="px-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      if (isMobile) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      currentPage === item.id 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
