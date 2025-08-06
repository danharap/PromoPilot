import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const AnimatedSection = ({ 
  children, 
  className = '', 
  animationType = 'fadeInUp',
  delay = 0 
}) => {
  const [ref, isVisible] = useScrollAnimation(0.1, '-50px');

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animationType) {
        case 'fadeInUp':
          return 'opacity-0 translate-y-8';
        case 'fadeInLeft':
          return 'opacity-0 -translate-x-8';
        case 'fadeInRight':
          return 'opacity-0 translate-x-8';
        case 'fadeIn':
          return 'opacity-0';
        case 'scaleIn':
          return 'opacity-0 scale-95';
        default:
          return 'opacity-0 translate-y-8';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${getAnimationClass()} ${className}`}
      style={{ 
        transitionDelay: isVisible ? `${delay}ms` : '0ms' 
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
