import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DiscoverySection from './components/DiscoverySection';
import ProductCatalog from './components/ProductCatalog';
import ProcessSection from './components/ProcessSection';
import TrustSection from './components/TrustSection';
import DifferenceSection from './components/DifferenceSection';
import SocialProofSection from './components/SocialProofSection';
import ClarityFAQSection from './components/ClarityFAQSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  const navigateTo = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = (context = '') => {
    const msg = context
      ? `Hi Cheer Up! I'm interested in a ${context}. Can you help me?`
      : `Hi Cheer Up! I'd like to know more about your personalized gifts.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Navbar onNavigate={navigateTo} onWhatsApp={openWhatsApp} />

      <main style={{ flex: 1 }}>
        <HeroSection onNavigate={navigateTo} onWhatsApp={openWhatsApp} />

        {/* Trust Marquee Strip — ambient trust signal between Hero and content */}
        <div className="trust-marquee-wrap" aria-hidden="true">
          <div className="trust-marquee-track">
            {/* Duplicated for seamless loop */}
            {[
              { icon: '🎁', text: '2,400+ gifts delivered' },
              { icon: '⭐', text: '4.9 / 5 customer rating' },
              { icon: '🚀', text: 'Pan-India delivery in 2–3 days' },
              { icon: '💬', text: 'WhatsApp design preview before printing' },
              { icon: '✅', text: 'You approve before we print' },
              { icon: '🎨', text: 'Every gift designed by hand' },
              { icon: '🇮🇳', text: 'Made with care in India' },
              { icon: '🔄', text: 'Unlimited design revisions' },
              { icon: '🎁', text: '2,400+ gifts delivered' },
              { icon: '⭐', text: '4.9 / 5 customer rating' },
              { icon: '🚀', text: 'Pan-India delivery in 2–3 days' },
              { icon: '💬', text: 'WhatsApp design preview before printing' },
              { icon: '✅', text: 'You approve before we print' },
              { icon: '🎨', text: 'Every gift designed by hand' },
              { icon: '🇮🇳', text: 'Made with care in India' },
              { icon: '🔄', text: 'Unlimited design revisions' },
            ].map((item, i) => (
              <div key={i} className="trust-marquee-item">
                <span>{item.icon}</span>
                <span>{item.text}</span>
                <span className="trust-marquee-dot" />
              </div>
            ))}
          </div>
        </div>

        <DiscoverySection onWhatsApp={openWhatsApp} />
        <ProductCatalog onWhatsApp={openWhatsApp} />
        <ProcessSection />
        <TrustSection />
        <DifferenceSection />
        <SocialProofSection />
        <ClarityFAQSection />
        <FinalCTA onWhatsApp={openWhatsApp} />
      </main>

      <Footer onNavigate={navigateTo} onWhatsApp={openWhatsApp} />
    </div>
  );
}
