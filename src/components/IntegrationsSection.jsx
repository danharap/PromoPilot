import React from 'react';

const IntegrationsSection = () => {
  const platforms = [
    { name: "Instagram", color: "bg-gradient-to-r from-purple-500 to-pink-500", icon: "📷" },
    { name: "Facebook", color: "bg-blue-600", icon: "📘" },
    { name: "Twitter", color: "bg-sky-500", icon: "🐦" },
    { name: "TikTok", color: "bg-black", icon: "🎵" },
    { name: "Reddit", color: "bg-orange-500", icon: "📰" },
    { name: "Pinterest", color: "bg-red-500", icon: "📌" },
    { name: "LinkedIn", color: "bg-blue-700", icon: "💼" },
    { name: "YouTube", color: "bg-red-600", icon: "📹" }
  ];

  return (
    <div id="integrations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Connect all your favorite platforms
          </h2>
          <p className="text-xl text-gray-600">
            Manage your entire social media presence from one central dashboard
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <div key={index} className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center mr-4`}>
                <span className="text-white text-xl">{platform.icon}</span>
              </div>
              <span className="font-medium text-gray-900">{platform.name}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">And many more integrations coming soon...</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Request an integration →
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSection;
