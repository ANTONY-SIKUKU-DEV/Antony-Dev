import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyData } from '../data/properties';
import './PropertyDetails.css';

function PropertyDetails() {
  // 🧭 Grab the dynamic ID from the URL parameter
  const { id } = useParams();
  
  // 🔍 Find the exact house in our database array matching that ID
  const house = propertyData.find(item => item.id === parseInt(id));

  // 🛑 Safety catch if the house ID doesn't exist
  if (!house) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>⚠️ Property Not Found</h2>
        <p>The home you are looking for doesn't exist or has been unlisted.</p>
        <Link to="/" style={{ color: '#e27d24', fontWeight: '600' }}>Back to Homepage</Link>
      </div>
    );
  }

  return (
    <div className="details-page-container">
      {/* Back Button Navigation */}
      <Link to="/" className="back-navigation-btn">← Back to Listings</Link>

      <div className="details-split-layout">
        
        {/* Left Column: Big Premium Image Showcase */}
        <div className="details-image-wrapper">
          <img src={house.image} alt={house.title} className="details-main-img" />
          <span className="details-type-tag">{house.type === 'rent' ? 'FOR RENT' : 'FOR SALE'}</span>
        </div>

        {/* Right Column: Key Specifications & Booking Box */}
        <div className="details-info-sidebar">
          <h1 className="details-main-title">{house.title}</h1>
          <p className="details-location-bar">📍 {house.location}</p>
          <div className="details-price-badge">{house.price}</div>

          <div className="details-specs-pill-box">
            <span className="spec-pill">🛏️ {house.bedrooms} Bedrooms</span>
            <span className="spec-pill">🚿 {house.bathrooms} Bathrooms</span>
            <span className="spec-pill">🌐 {house.internet}</span>
          </div>

          <hr className="details-divider" />

          <h3>Property Description</h3>
          <p className="details-full-description">{house.description}</p>

          {/* New Extra Information added seamlessly */}
          <div className="details-extra-amenities">
            <h4>💡 Premium Features Included:</h4>
            <ul>
              <li>24/7 Fully Controlled Security & Guard Post</li>
              <li>Continuous Water Storage & Solar Water Heating</li>
              <li>Ample Secure Parking Spaces (Automated Gates)</li>
              <li>Beautifully Landscaped Environment</li>
            </ul>
          </div>

          {/* Interactive Booking Call to Action */}
          <button className="details-book-viewing-btn" onClick={() => alert('Viewing request logged! Our Mombasa team will contact you shortly.')}>
            Schedule a Private Viewing
          </button>
        </div>

      </div>
    </div>
  );
}

export default PropertyDetails;