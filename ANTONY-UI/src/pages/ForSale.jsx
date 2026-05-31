import React from 'react'
import '../pages/Homepage.css'
import { Link } from 'react-router-dom'
import { propertyData } from '../data/properties'

function ForSale() {
  // Filter out everything except properties for sale
  const saleProperties = propertyData.filter(house => house.type === 'sale');

  return (
    <div className="home-outer-container" style={{ paddingTop: '4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.8rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a1a', margin: '0' }}>
          Exclusive Properties For Sale
        </h1>
        <p style={{ color: '#555555', fontSize: '1.05rem', marginTop: '0.5rem', marginBottom: '0' }}>
          Invest in premium residential real estate built with top-tier modern standards.
        </p>
      </div>

      <div className="home-content-wrapper" style={{ marginTop: '2rem' }}>
        {saleProperties.map((house) => (
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

export default ForSale;