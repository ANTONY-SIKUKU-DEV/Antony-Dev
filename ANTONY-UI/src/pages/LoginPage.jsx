import React from 'react'
import { FaEye } from "react-icons/fa"
import './LoginPage.css'
import {Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()
  
  // 🧼 Force flush fields clean when the component mounts onto the screen
  useEffect(() => {
    setEmail('')
    setPassword('')
    setErrorMessage('')
    setSuccessMessage('')
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')    

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Login failed. Please check your credentials and try again.')
      }
      if (data.user) {
      localStorage.setItem('currentUser', JSON.stringify(data.user))
      } else if (data._id) {
      // Fallback case depending on how your server structure returns the payload
      localStorage.setItem('currentUser', JSON.stringify(data))
      }
      setSuccessMessage('Login successful! Redirecting...')
      setTimeout(() => {
        setEmail('')
        setPassword('')
        navigate('/')        
      }, 1500)

    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Log in to manage your residential profile data.</p>

        {/* 🟢 Render Success Banners if populated */}
        {successMessage && (
          <div style={{ color: '#28a745', fontSize: '13px', marginBottom: '12px', fontWeight: '500', textAlign: 'left' }}>
            {successMessage}
          </div>
        )}

        {/* 🔴 Render Small Red Error Banners if populated */}
        {errorMessage && (
          <div style={{ color: 'red', fontSize: '12px', marginBottom: '12px', fontWeight: '500', textAlign: 'left' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} autoComplete="none" className="login-form">
          {/* Group 1: Username */}
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Username/Email" 
              required 
              autoComplete= "none"
              value={email} // ✅ FIXED: Bound input value directly to email state
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          {/* Group 2: Password with Integrated Eye Toggle */}
          <div className="input-group password-group">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              required 
              autoComplete= "current-password"
              value={password} // ✅ FIXED: Bound input value directly to password state
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
              <FaEye />
            </button>
          </div>

          {/* Remember Me & Forgot Password Links row */}
          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div>

          {/* Action Button */}
          <button type="submit" className="login-submit-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}