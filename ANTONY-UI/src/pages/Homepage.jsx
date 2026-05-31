import React from 'react'
import './Homepage.css'
import { Link } from 'react-router-dom'
import { propertyData } from '../data/properties' // 📦 Import your new array database

export function Homepage() {
  return (
    <div className="home-outer-container">
      
      {/* 🌟 SPLIT HERO SECTION */}
      <div className="home-welcome-section">
        <div className="welcome-split-wrapper">          
          
          <div className="welcome-left-content">
            <h1 className="welcome-main-title">
              Welcome to Elite Residence, the fastest growing real estate company in Mombasa!
            </h1>
            <p className="welcome-detailed-desc">
              Welcome to Elite Residence! We build beautiful, modern homes in the best 
              neighborhoods where your family can feel completely safe and comfortable. 
              Our houses come with smart features, gorgeous green gardens, and reliable 
              water and power setups. If you are looking for a peaceful, stress-free 
              place to live, you have found your perfect home.
            </p>
          </div>

          {/* Right Info Card Block */}
          <div className="welcome-right-card">
            <h3>Elite Residence Real Estate</h3>
            <p className="card-address">
              <strong>1st Floor, Nyali Centre</strong><br />
              Malindi Road, Mombasa, Kenya
            </p>
            <div className="card-contact-lines">
              <p>📞 +254757972820</p>
              <p>✉️ antonysikuku02@gmail.com</p>
              <p>🌐 Elite Residence</p>
            </div>
          </div>

        </div>
      </div>

      {/* 🏠 YOUR DYNAMIC PROPERTY CARDS GRID */}
      <div className="home-content-wrapper">
        {propertyData.map((house) => (
          <div key={house.id} className="property-card">
            <Link to={`/property/${house.id}`}>
            <img src={house.image} alt={house.title} className="home-hero-asset" />
            </Link>            
            {/* Details section */}
            <div className="property-details">
              <div className="property-header">
                <h2 className="property-title">{house.title}</h2>
                <span className="property-price">{house.price}</span>
              </div>
              
              <p className="property-location">
                <span className="location-icon">📍</span> {house.location}
              </p>
              
              <p className="property-description">
                {house.description}
              </p>
              
              <div className="property-features">
                <span>• {house.bedrooms} Bedrooms</span>
                <span>• {house.bathrooms} Bathrooms</span>
                <span>• {house.internet}</span>
              </div>
            </div>            
          </div> 
        ))}
      </div>

    </div>
  )
}