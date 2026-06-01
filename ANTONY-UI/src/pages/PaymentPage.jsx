import React from 'react'
import { FaPhoneAlt, FaCreditCard, FaLock, FaBuilding } from 'react-icons/fa'
import './PaymentPage.css'

export function PaymentPage() {
  return (
    <div className="payment-page-wrapper">
      <div className="payment-dual-container">
        
        {/* Left Side: Invoice Summary Panel */}
        <div className="invoice-summary-panel">
          <h3>Payment Summary</h3>
          <div className="summary-property-card">
            <FaBuilding className="property-icon" />
            <div>
              <h4>Premium Townhome</h4>
              <p>Unit 4B, Kilimani Residential</p>
            </div>
          </div>
          
          <hr className="summary-divider" />
          
          <div className="price-breakdown">
            <div className="price-row">
              <span>Monthly Rent / Booking Deposit</span>
              <span>KES 45,000</span>
            </div>
            <div className="price-row">
              <span>Service Charge & Utilities</span>
              <span>KES 2,500</span>
            </div>
            <hr className="summary-divider" />
            <div className="price-row total-row">
              <span>Total Amount Due</span>
              <span>KES 47,500</span>
            </div>
          </div>
          
          <p className="secure-badge">
            <FaLock /> Secured 256-bit Encrypted Transaction
          </p>
        </div>

        {/* Right Side: Payment Form Options */}
        <div className="payment-form-panel">
          <h3>Choose Payment Method</h3>
          
          {/* Static Payment Method Tabs */}
          <div className="payment-method-tabs">
            <button type="button" className="method-tab active-tab">
              M-Pesa
            </button>
            <button type="button" className="method-tab">
              Credit Card
            </button>
          </div>

          <form className="payment-form">
            {/* M-Pesa Phone Field */}
            <div className="payment-input-group">
              <label>M-Pesa Mobile Number</label>
              <div className="field-container">
                <span className="field-icon"><FaPhoneAlt /></span>
                <input type="tel" placeholder="e.g., 0712345678" required />
              </div>
              <p className="input-instruction">
                You will receive an STK Push prompt on your phone to enter your M-Pesa PIN.
              </p>
            </div>

            {/* Submit Action Key */}
            <button type="submit" className="payment-submit-btn">
              Pay KES 47,500 via M-Pesa
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}