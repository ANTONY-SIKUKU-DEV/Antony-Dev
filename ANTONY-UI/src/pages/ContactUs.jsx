import React, { useState } from 'react';
import './ContactUs.css'; // 🔌 Imported Clean CSS File

function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Thank you for reaching out! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        Have questions about our premium properties or looking to book a viewing? Talk to our team today.
      </p>

      <div className="contact-split-layout">
        
        {/* Left Side: Info Cards */}
        <div className="contact-info-column">
          <div className="contact-info-card">
            <h3>📍 Our Headquarters</h3>
            <p>
              1st Floor, Nyali Centre<br />
              Malindi Road, Mombasa, Kenya
            </p>
          </div>

          <div className="contact-info-card">
            <h3>📞 Phone & WhatsApp</h3>
            <p className="contact-bold-text">+254 757 972 820</p>
          </div>

          <div className="contact-info-card">
            <h3>✉️ Email Channels</h3>
            <p>antonysikuku02@gmail.com</p>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="contact-form-column">
          <form onSubmit={handleSubmit} className="contact-form">
            <input 
              type="text" 
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="contact-input"
            />
            <input 
              type="email" 
              placeholder="Your Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="contact-input"
            />
            <textarea 
              rows="6" 
              placeholder="How can we help you?"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
              className="contact-textarea"
            ></textarea>
            
            <button type="submit" className="contact-submit-btn">
              Send Message
            </button>
          </form>
          {status && <p className="contact-success-msg">{status}</p>}
        </div>

      </div>
    </div>
  );
}

export default ContactUs;