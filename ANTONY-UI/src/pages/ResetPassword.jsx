import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css'; 

function ResetPassword() {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match. Please retype carefully.');
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`http://localhost:5000/api/reset-password/${token}`, { password });
      setMessage(response.data.message);
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      setError(err.response?.data?.message || 'Token is invalid or has expired. Please request a new link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Security Password</h2>
        <p className="auth-subtitle">
          Please enter your new password below to secure your residential profile account.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              minLength="6"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
              minLength="6"
            />
          </div>
          
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Updating Credentials...' : 'Save New Password'}
          </button>
        </form>

        {message && <p className="status-message success">{message} Redirecting to login...</p>}
        {error && <p className="status-message error">{error}</p>}

        <div className="auth-footer">
          <Link to="/login" className="back-link">Return to Sign In</Link>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;

