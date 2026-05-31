const mongoose = require('mongoose');

// 📐 Define the structural shape of a User Document
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true // Automatically chops off accidental whitespace typing errors
  },
  email: {
    type: String,
    required: true,
    unique: true, // Throws an error if someone tries to sign up twice with the same email
    lowercase: true, // Forces all strings to lowercase to prevent duplicates
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  
  // 🔐 Bring these inside the main blueprint body where they belong!
  resetPasswordToken: {
    type: String, 
    default: null
  },
  resetPasswordExpires: {
    type: Date, // Must be defined as a Date data type
    default: null
  }
}, {
  timestamps: true // Automatically inserts 'createdAt' and 'updatedAt' time logs!
});

// Compile the schema blueprint layout into a model object engine we can use in our routes
module.exports = mongoose.model('User', userSchema);