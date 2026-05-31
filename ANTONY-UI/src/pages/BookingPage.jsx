import React from 'react'
import { FaCalendarAlt, FaClock, FaHome, FaPhone, FaUser } from 'react-icons/fa'
import './BookingPage.css'

export function BookingPage() {
  return (
    <div className="booking-page-wrapper">
      <div className="booking-card">
        <h2>Schedule a Viewing</h2>
        <p>Book a date to visit our premium residential townhomes</p>

        <form className="booking-form">
          {/* Client Full Name */}
          <div className="input-group">
            <span className="input-icon"><FaUser /></span>
            <input type="text" placeholder="Full Name" required />
          </div>

          {/* Contact Phone Number */}
          <div className="input-group">
            <span className="input-icon"><FaPhone /></span>
            <input type="tel" placeholder="Phone Number (e.g., 0712345678)" required />
          </div>

          {/* Property / Room Type Selection Dropdown */}
          <div className="input-group select-group">
            <span className="input-icon"><FaHome /></span>
            <select required defaultValue="">
              <option value="" disabled hidden>Select Property Type</option>
              <option value="3-bed-townhome">3 Bedroom Townhome (Kilimani)</option>
              <option value="2-bed-apartment">2 Bedroom Apartment</option>
              <option value="studio-suite">Premium Studio Suite</option>
            </select>
          </div>

          {/* Date Picker Split Row */}
          <div className="form-row">
            {/* Preferred Viewing Date */}
            <div className="input-group">
              <span className="input-icon-date"><FaCalendarAlt /></span>
              <input className='date' type="date" required />
            </div>

            {/* Preferred Viewing Time Slot */}
            <div className="input-group select-group">
              <span className="input-icon"><FaClock /></span>
              <select required defaultValue="">
                <option value="" disabled hidden>Select Time Slot</option>
                <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                <option value="afternoon">Afternoon (2:00 PM - 5:00 PM)</option>
              </select>
            </div>
          </div>

          {/* Optional Notes Message Box */}
          <div className="input-group textarea-group">
            <textarea placeholder="Any special requests or details you'd like us to know? (Optional)" rows="4"></textarea>
          </div>

          {/* Submit Action Key */}
          <button type="submit" className="booking-submit-btn">
            Confirm Booking Slot
          </button>
        </form>
      </div>
    </div>
  )
}