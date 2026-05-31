import React from 'react';
import './AboutUs.css'; // 🔌 Imported Clean CSS File

function AboutUs() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Elite Residence</h1>
      
      <p className="about-main-desc">
        Founded with a clear vision to redefine modern living, Elite Residence stands as one of the fastest-growing 
        real estate providers in Mombasa and across Kenya. We break away from traditional housing by delivering residential 
        properties that perfectly balance architectural beauty, spacious comfort, and high-level structural safety.
      </p>

      <h2 className="about-section-heading">Our Core Pillars</h2>
      
      <div className="about-pillars-grid">
        <div className="about-pillar-card pillar-design">
          <h3>Premium Design</h3>
          <p>
            Every home layout is meticulously planned with spacious configurations, bright lighting, and premium landscape views.
          </p>
        </div>

        <div className="about-pillar-card pillar-security">
          <h3>Top-Tier Security</h3>
          <p>
            Your family's safety comes first. All our gated communities feature 24/7 controlled protection, perimeter setups, and modern safety features.
          </p>
        </div>

        <div className="about-pillar-card pillar-utilities">
          <h3>Reliable Utilities</h3>
          <p>
            We solve typical urban utility hassles by installing continuous water storage, backup systems, and pre-wired fiber-internet structures.
          </p>
        </div>
      </div>

      <div className="about-cta-banner">
        <h3>Ready to Find Your Dream Home?</h3>
        <p>Check out our currently available modern rental listings and investment options for sale.</p>
      </div>
    </div>
  );
}

export default AboutUs;