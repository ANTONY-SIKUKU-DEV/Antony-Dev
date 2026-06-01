const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Notification = require('./models/Notification');
const User = require('./models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
const AfricasTalking = require('africastalking')({
  apiKey: 'atsk_3c3b0d4a4308509a84b084a7274531eeaa914197d705ff123b491817998184aee406d859', 
  username: 'sandbox'
});
const sms = AfricasTalking.SMS;
async function sendSmsNotification(recipientPhone, alertMessage) {
  try {
    const options = {
      to: [recipientPhone], 
      message: `[Elite Residential] ${alertMessage}`
    };
    const response = await sms.send(options);
    console.log('📶 Cellular Gateway Response:', JSON.stringify(response));
    return response;
  } catch (error) {
    console.error('❌ Failed to route cellular text transmission:', error);
  }
}

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/elite_residential';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB via Mongoose!'))
  .catch(err => console.error('❌ MongoDB Connection Failure:', err));
app.get('/', (req, res) => {
  res.send('🚀 Elite Residential REST API Server is Alive and Listening!');
});

app.post('/api/signup', async (req, res) => {
  try {   
    const { fullName, email, password } = req.body;    
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_\-.])[A-Za-z\d@$!%*?&#_\-.]{6,}$/;
    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({ 
        error: 'Password fails safety requirements. Must be 6+ chars, with upper, lower, number, and special character.' 
      });
    }    
    const existingUser = await User.findOne({ email });
    if (existingUser) {    
      return res.status(400).json({ error: 'This email is already registered.' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);    
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword 
    });    
    await newUser.save();   
    res.status(201).json({ message: 'Account created successfully inside MongoDB!' });
  } catch (error) {
    console.error('Signup error details:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;    
    const user = await User.findOne({ email });   
    if (!user) {
      return res.status(400).json({ error: 'Invalid Email or Password.' });
    }    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid Email or Password.' });
    }    
    const loginNotification = new Notification({
      userId: user._id,
      title: 'New Account Login Detected',
      message: `Your account was successfully signed into on ${new Date().toLocaleTimeString()} using this device.`,
      type: 'security'
    });
    await loginNotification.save();    
    await sendSmsNotification('+254757972820', `Security Alert: Login verified for ${user.email}.`);  
    return res.status(200).json({
      message: 'Authentication successful! Welcome back.',
      user: { 
        id: user._id, 
        fullName: user.fullName, 
        email: user.email 
      }
    });
  } catch (error) {
    console.error('Login engine error details:', error);
    return res.status(500).json({ error: 'Internal Server Error during authentication.' });
  }
});

app.get('/api/notifications/:userId', async (req, res) => {
  try {
    const { userId } = req.params;    
    const list = await Notification.find({ userId }).sort({ createdAt: -1 });    
    res.status(200).json(list);
  } catch (error) {
    console.error('Notification fetch error:', error);
    res.status(500).json({ error: 'Failed to retrieve notification logs.' });
  }
});

app.delete('/api/notifications/:id', async (req, res) => {
  try {
    const { id } = req.params;   
    const deletedNotification = await Notification.findByIdAndDelete(id);    
    if (!deletedNotification) {
      return res.status(404).json({ error: 'Notification log not found.' });
    }    
    res.status(200).json({ message: 'Notification deleted successfully.' });
  } catch (error) {
    console.error('Notification single delete error:', error);
    res.status(500).json({ error: 'Failed to delete notification record.' });
  }
});

app.delete('/api/notifications/clear/:userId', async (req, res) => {
  try {
    const { userId } = req.params;   
    await Notification.deleteMany({ userId });    
    res.status(200).json({ message: 'All notification logs cleared successfully.' });
  } catch (error) {
    console.error('Notification clear-all error:', error);
    res.status(500).json({ error: 'Failed to clear notification feed.' });
  }
});

app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account found with that email address." });
    }    
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();    
    const resetUrl = `http://localhost:5173/reset-password/${token}`;   
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Elite Residential - Password Reset Link',
      text: `You are receiving this email because you (or someone else) requested a password reset for your account.\n\n` +
            `Please click on the following link, or paste it into your browser to complete the process:\n\n` +
            `${resetUrl}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "A secure reset link has been dispatched to your inbox." });

  } catch (error) {
    console.error("❌ Forgot password system error:", error);
    res.status(500).json({ message: "Internal server error running recovery pipeline." });
  }
});

app.post('/api/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;   
    console.log("=== PASSWORD RESET DEBUG ===");
    console.log("🔑 Token from browser URL:", token);
    console.log("⏰ Current Server Time:", Date.now());  
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      console.log("❌ DB LOOKUP FAILED: Token invalid or expired.");
      return res.status(400).json({ message: "Password reset token is invalid or has expired." });
    }
    console.log("✅ USER FOUND! Updating password for:", user.email);    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);    
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    res.status(200).json({ message: "Success! Your password has been updated securely." });
  } catch (error) {
    console.error("❌ Reset password processing error:", error);
    res.status(500).json({ message: "Internal server error updating credentials." });
  }
});

app.post('/api/change-password', async (req, res) => {
  try {  
    const { userId, currentPassword, newPassword } = req.body;   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User profile not found." });
    }
    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "The current password you entered is incorrect." });
    }
   
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_\-.])[A-Za-z\d@$!%*?&#_\-.]{6,}$/;
    if (!strongPasswordRegex.test(newPassword)) {
      return res.status(400).json({ 
        message: 'New password fails safety criteria. Must be 6+ characters with upper, lower, number, and special character.' 
      });
    }
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();    
    await sendSmsNotification('+254757972820', `Security Notice: Your Elite Residential account password was changed successfully.`);
    res.status(200).json({ message: "Success! Your password has been updated securely." });

  } catch (error) {
    console.error("❌ Change password execution error:", error);
    res.status(500).json({ message: "Internal server error updating your security credentials." });
  }
});

const PORT = 5000; 
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`📡 Server actively streaming locally on http://localhost:${PORT}`);
  });
}
module.exports = app;