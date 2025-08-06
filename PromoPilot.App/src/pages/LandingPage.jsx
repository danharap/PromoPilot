import React from 'react';
import LandingNavbar from '../components/LandingNavbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import PricingSection from '../components/PricingSection';
import IntegrationsSection from '../components/IntegrationsSection';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';

const LandingPage = ({ onGetStarted, onSignIn, onNavigateToHelp, onNavigateToBlog, onNavigateToCommunity }) => {
  return (
    <div className="min-h-screen">
      <LandingNavbar 
        onLogin={onSignIn} 
        onSignUp={onGetStarted}
        onNavigateToHelp={onNavigateToHelp}
        onNavigateToBlog={onNavigateToBlog}
        onNavigateToCommunity={onNavigateToCommunity}
      />
      
      {/* Hero section loads immediately */}
      <HeroSection onGetStarted={onGetStarted} />
      
      {/* Animated sections that load on scroll */}
      <AnimatedSection animationType="fadeInUp" delay={0}>
        <FeaturesSection />
      </AnimatedSection>
      
      <AnimatedSection animationType="fadeInUp" delay={200}>
        <PricingSection />
      </AnimatedSection>
      
      <AnimatedSection animationType="fadeInUp" delay={100}>
        <IntegrationsSection />
      </AnimatedSection>
      
      <AnimatedSection animationType="fadeIn" delay={0}>
        <Footer />
      </AnimatedSection>
    </div>
  );
};

export default LandingPage;
