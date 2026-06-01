import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyData } from '../data/properties';
import './PropertyDetails.css';

function PropertyDetails() {
  const { id } = useParams();
  
  const house = propertyData.find(item => item.id === parseInt(id));

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
      <Link to="/" className="back-navigation-btn">← Back to Listings</Link>
      <div className="details-split-layout">     
        <div className="details-image-wrapper">
          <img src={house.image} alt={house.title} className="details-main-img" />
          <span className="details-type-tag">{house.type === 'rent' ? 'FOR RENT' : 'FOR SALE'}</span>
        </div>

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

          <div className="details-extra-amenities">
            <h4>💡 Premium Features Included:</h4>
            <ul>
              <li>24/7 Fully Controlled Security & Guard Post</li>
              <li>Continuous Water Storage & Solar Water Heating</li>
              <li>Ample Secure Parking Spaces (Automated Gates)</li>
              <li>Beautifully Landscaped Environment</li>
            </ul>
          </div>

          <button className="details-book-viewing-btn" onClick={() => alert('Viewing request logged! Our Mombasa team will contact you shortly.')}>
            Schedule a Private Viewing
          </button>
        </div>

      </div>
    </div>
  );
}

export default PropertyDetails;