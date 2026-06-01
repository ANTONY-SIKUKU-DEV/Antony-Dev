import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ForgotPassword.css'; 

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/forgot-password`,{ email });
      setMessage(response.data.message);
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p className="auth-subtitle">
          Enter your registered email address below, and we'll send you a link to securely reset your password.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your account email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Dispatching Link...' : 'Send Reset Link'}
          </button>
        </form>

        {message && <p className="status-message success">{message}</p>}
        {error && <p className="status-message error">{error}</p>}

        <div className="auth-footer">
          <Link to="/login" className="back-link">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

