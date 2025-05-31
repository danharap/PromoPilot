import React from 'react';

const Logo = ({ size = 'default', showText = true, className = '' }) => {
  const sizes = {
    small: { container: 'w-6 h-6', text: 'text-sm' },
    default: { container: 'w-8 h-8', text: 'text-xl' },
    large: { container: 'w-12 h-12', text: 'text-2xl' }
  };

  const currentSize = sizes[size] || sizes.default;
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Minimalistic logo with two overlapping P's */}
      <div className={`${currentSize.container} relative flex items-center justify-center`}>
        {/* Background circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg"></div>        {/* Two stylized "P"s with overlapping design - centered */}
        <svg 
          className="relative z-10 w-3/4 h-3/4 text-white" 
          viewBox="0 0 28 20" 
          fill="currentColor"
        >
          {/* First P - centered and slightly offset left */}
          <path 
            d="M3 2v16h2.5v-6h3.5c2.76 0 5-2.24 5-5s-2.24-5-5-5H3zm2.5 2.5h3.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5H5.5V4.5z" 
            className="opacity-90"
          />
          {/* Second P - centered and slightly offset right with small gap */}
          <path 
            d="M15.5 2v16h2.5v-6h3.5c2.76 0 5-2.24 5-5s-2.24-5-5-5H15.5zm2.5 2.5h3.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5H18V4.5z" 
            className="opacity-95"
          />
        </svg>
      </div>
      
      {showText && (
        <span className={`font-semibold text-gray-900 ${currentSize.text} tracking-tight`}>
          PromoPilot
        </span>
      )}
    </div>
  );
};

export default Logo;
