import React from 'react'
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaBell, FaTrashAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import './NotificationPage.css'

export function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); 

  /* 🔑 DYNAMIC USER LOOKUP FROM BROWSER STORAGE */
  const storedUser = localStorage.getItem('currentUser');
  const user = storedUser ? JSON.parse(storedUser) : null;
  
  // Dynamic lookup: falls back to an empty string if no user session is found
  const currentUserId = user ? (user._id || user.id) : "";

  useEffect(() => {
    // 🛡️ SECURITY GUARD LAYER: Blocks broken string representations from hitting your backend server
    if (!currentUserId || currentUserId === "undefined" || currentUserId === "null") {
      setLoading(false);
      return;
    }

    const fetchAlerts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/notifications/${currentUserId}`)
        const data = await response.json()
        setNotifications(data)
        setLoading(false)
      } catch (err) {
        console.error("Failed loading alerts:", err)
        setLoading(false)
      }
    }
    fetchAlerts()
  }, [currentUserId]) // Automatically refetches if the active login profile shifts

  // 🗑️ Delete single alert from database
  const handleDeleteNotification = async (notificationId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/notifications/${notificationId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setNotifications(prev => prev.filter(n => n._id !== notificationId))
      }
    } catch (err) {
      console.error("Failed deleting notification:", err)
    }
  }

  // 🧼 Clear all alerts
  const handleClearAllNotifications = async () => {
    // 🛡️ Guard to ensure we don't accidentally send a broken clear endpoint request
    if (!currentUserId || currentUserId === "undefined" || currentUserId === "null") return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/notifications/clear/${currentUserId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setNotifications([])
      }
    } catch (err) {
      console.error("Failed clearing notifications:", err)
    }
  }

  // Helper function to pick the correct design icon based on your backend alert types
  const getNotificationIcon = (type) => {
    if (type === 'security') return <FaExclamationCircle />
    if (type === 'alert') return <FaCheckCircle />        
    return <FaInfoCircle />                               
  };

  // Helper function to dynamically map database fields to your layout's explicit CSS type classes
  const getNotificationClass = (alert) => {
    let baseClass = "notification-item";
    baseClass += alert.isRead ? " read-type" : " unread";
    if (alert.type === 'security') baseClass += " warning-type";
    else if (alert.type === 'alert') baseClass += " success-type";
    else baseClass += " info-type";
    return baseClass;
  };

  return (
    <div className="notifications-page-wrapper">
      <div className="notifications-container">
        <div className="notifications-header">
          <div className="header-title">
            <FaBell className="bell-icon" />
            <h2>Notifications</h2>
            <span className="notification-badge">
              {notifications.filter(n => !n.isRead).length}
            </span>
          </div>
          <button type="button" className="clear-all-btn" onClick={handleClearAllNotifications}>
            Clear All
          </button>
        </div>

        <div className="notifications-feed">
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading alerts...</div>
          ) : notifications.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>No recent notifications found.</div>
          ) : (
            notifications.map((alert) => (
              <div key={alert._id} className={getNotificationClass(alert)}>
                <div className="notification-icon-wrapper">
                  {getNotificationIcon(alert.type)}
                </div>
                <div className="notification-content">
                  <h4>{alert.title}</h4>
                  <p>{alert.message}</p>
                  <span className="notification-time">
                    {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <button className="delete-notification-btn" onClick={() => handleDeleteNotification(alert._id)}>
                  <FaTrashAlt />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}