import React from 'react';
import LandingNavbar from '../components/LandingNavbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import PricingSection from '../components/PricingSection';
import IntegrationsSection from '../components/IntegrationsSection';
import Footer from '../components/Footer';

const LandingPage = ({ onGetStarted, onSignIn }) => {
  return (
    <div className="min-h-screen">
      <LandingNavbar onLogin={onSignIn} onSignUp={onGetStarted} />
      <HeroSection onGetStarted={onGetStarted} />
      <FeaturesSection />
      <PricingSection />
      <IntegrationsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
