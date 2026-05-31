const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ties this alert directly to the logged-in User's ID
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['security', 'system', 'alert'], // Categorizes the alert types
    default: 'system'
  },
  isRead: {
    type: Boolean,
    default: false // Allows users to mark an alert as read/unread
  }
}, {
  timestamps: true // Automatically captures exactly *when* the alert was triggered!
});

module.exports = mongoose.model('Notification', notificationSchema);