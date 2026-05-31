import React from 'react'
import './DashboardPage.css'
import {useNavigate} from 'react-router-dom'

export function DashboardPage() {
  const navigate = useNavigate()
  return (
    <div className = "Dashboard">
     <div className='Antony'>
        <h1>ELITE RESIDENTIAL</h1>
        <input type="text" placeholder="search" />
     </div>    
     <div className='Buttons'>
        <button onClick={() => navigate('/')}>HOME</button>
        <button onClick={() => navigate('/login')}>LOGIN</button>
        <button onClick={() => navigate('/signup')}>SIGN UP</button>        
        <button onClick={() => navigate('/about')}>ABOUT US</button>
        <button onClick={() => navigate('/contact')}>CONTACT</button>
        <button onClick={() => navigate('/for-rent')}>FOR RENT</button>
        <button onClick={() => navigate('/for-sale')}>FOR SALE</button>
        <button onClick={() => navigate('/notifications')}>NOTIFICATIONS</button>
     </div>       
    </div>
  )
}
