import React from 'react'
import '../pages/Homepage.css' // Reusing your beautiful homepage grid styles directly!
import { propertyData } from '../data/properties'
import { Link } from 'react-router-dom'

function ForRent() {
  // Filter out everything except rental listings
  const rentalProperties = propertyData.filter(house => house.type === 'rent');

  return (
    <div className="home-outer-container" style={{ paddingTop: '4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.8rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a1a', margin: '0' }}>
          Premium Properties For Rent
        </h1>
        <p style={{ color: '#555555', fontSize: '1.05rem', marginTop: '0.5rem', marginBottom: '0' }}>
          Browse our high-security, premium rental listings available across Kenya.
        </p>
      </div>

      <div className="home-content-wrapper" style={{ marginTop: '2rem' }}>
        {rentalProperties.map((house) => (
          <div key={house.id} className="property-card">
            <Link to={`/property/${house.id}`}>
              <img src={house.image} alt={house.title} className="home-hero-asset" />
            </Link>

            <div className="property-details">
              <div className="property-header">
                <h2 className="property-title">{house.title}</h2>
                <span className="property-price">{house.price}</span>
              </div>
              
              <p className="property-location">
                <span className="location-icon">📍</span> {house.location}
              </p>
              
              <p className="property-description">{house.description}</p>
              
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

export default ForRent;