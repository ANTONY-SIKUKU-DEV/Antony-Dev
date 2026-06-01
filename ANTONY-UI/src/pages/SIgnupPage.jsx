import React from 'react'
import { FaEye, FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import './SignupPage.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    
    if (!agreeTerms) {
      setErrorMessage('You must agree to the Terms & Conditions.')
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed. Please try again.')
      }
      setSuccessMessage('Account created successfully!')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  return (
    <div className="signup-page-wrapper">
      <div className="signup-card">
        <h2>Create Account</h2>
        <p>Join Elite Residential Housing to find and manage your perfect home</p>

        <form onSubmit={handleSignup} className="signup-form">
          <div className="input-group">
            <span className="input-icon"><FaUser /></span>
            <input type="text" placeholder="Full Name" required onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="input-group">
            <span className="input-icon"><FaEnvelope /></span>
            <input type="email" placeholder="Email Address" required onChange={(e) => setEmail(e.target.value)} />
            {errorMessage && (
           <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
           {errorMessage}
           </div>
          )}
          </div>
          <div className="input-group password-group">
            <span className="input-icon"><FaLock /></span>
            <input type={showPassword ? "text" : "password"} placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
              <FaEye />
            </button>
          </div>
          <div className="input-group password-group">
            <span className="input-icon"><FaLock /></span>
            <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
              <FaEye />
            </button>
          </div>
          <div className="form-options">
            <label className="terms-label">
              <input type="checkbox" required onChange={(e) => setAgreeTerms(e.target.checked)} /> I agree to the Terms & Conditions
            </label>
          </div>
          <button type="submit" className="signup-submit-btn">
            Register Account
          </button>
        </form>
      </div>
    </div>
  )
}