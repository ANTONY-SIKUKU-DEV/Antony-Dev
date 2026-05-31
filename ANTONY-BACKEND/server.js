const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Notification = require('./models/Notification'); // Your notification schema model
const User = require('./models/User');

const crypto = require('crypto');
const nodemailer = require('nodemailer');

// ==========================================
// 📧 1. INITIALIZE NODEMAILER TRANSPORTER
// ==========================================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});



// ========================================================
// 📡 CELLULAR SYSTEM: AFRICA'S TALKING CORE GATEWAY
// ========================================================
const AfricasTalking = require('africastalking')({
  apiKey: 'atsk_3c3b0d4a4308509a84b084a7274531eeaa914197d705ff123b491817998184aee406d859', 
  username: 'sandbox' // Kept as sandbox to route directly to your testing simulator panel
});

const sms = AfricasTalking.SMS;

// Core SMS execution pipeline
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

// 📂 Import our new user blueprint configuration engine


// Add this import near the top of server.js with your other models:


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


// ========================================================
// 🚀 REST API ENDPOINT: REGISTER A NEW USER (POST METHOD)
// ========================================================
app.post('/api/signup', async (req, res) => {
  try {
    // 1. Destructure the raw inputs sent from your React input fields
    const { fullName, email, password } = req.body;

    
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_\-.])[A-Za-z\d@$!%*?&#_\-.]{6,}$/;

    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({ 
        error: 'Password fails safety requirements. Must be 6+ chars, with upper, lower, number, and special character.' 
      });
    }

    // 2. Query MongoDB to check if this exact email address is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // 400 Bad Request status code means client sent data that fails validation checks
      return res.status(400).json({ error: 'This email is already registered.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Instantiate a clean document record matching our model parameters
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword // 🔒 We will handle the heavy security hashing on this string next!
    });

    // 4. Save the document transaction safely straight into MongoDB collection lists
    await newUser.save();

    // 211 Created status code means data creation successfully processed
    res.status(201).json({ message: 'Account created successfully inside MongoDB!' });

  } catch (error) {
    console.error('Signup error details:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
});

// ========================================================
// 🚀 REST API ENDPOINT: USER LOGIN (POST METHOD)
// ========================================================
// ========================================================
// 🚀 REST API ENDPOINT: USER LOGIN WITH AUTOMATED ALERTS
// ========================================================
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Search MongoDB for a document containing this email address
    const user = await User.findOne({ email });

    // If the email doesn't exist, return error
    if (!user) {
      return res.status(400).json({ error: 'Invalid Email or Password.' });
    }

    // 2. Compare the hashed passwords securely using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid Email or Password.' });
    }

    // 3. AUTO-TRIGGER LOG: Record this successful login event into MongoDB
    const loginNotification = new Notification({
      userId: user._id,
      title: 'New Account Login Detected',
      message: `Your account was successfully signed into on ${new Date().toLocaleTimeString()} using this device.`,
      type: 'security'
    });
    await loginNotification.save();

    // 4. ✅ SAFARICOM NETWORK TRIGGER: Send the SMS notification straight to your phone!
    // Remember to replace this with your actual phone number in international format (e.g., '+2547XXXXXXXX')
    await sendSmsNotification('+254757972820', `Security Alert: Login verified for ${user.email}.`);

    // 5. Success! Send back a single clean JSON confirmation to your React app
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


// Add this route block down with your other endpoints:
// ========================================================
// 🚀 REST API ENDPOINT: GET USER NOTIFICATIONS
// ========================================================
app.get('/api/notifications/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find notifications matching the userId and sort them by newest first
    const list = await Notification.find({ userId }).sort({ createdAt: -1 });
    
    res.status(200).json(list);
  } catch (error) {
    console.error('Notification fetch error:', error);
    res.status(500).json({ error: 'Failed to retrieve notification logs.' });
  }
});
// 🗑️ 1. ROUTE TO DELETE A SINGLE NOTIFICATION LOG BY ITS ID
app.delete('/api/notifications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the specific notification by its unique database ID and delete it
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

// 🧼 2. ROUTE TO WIPE ALL NOTIFICATIONS CLEAN FOR A SPECIFIC USER
app.delete('/api/notifications/clear/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Delete every single notification entry that matches this resident's user ID
    await Notification.deleteMany({ userId });
    
    res.status(200).json({ message: 'All notification logs cleared successfully.' });
  } catch (error) {
    console.error('Notification clear-all error:', error);
    res.status(500).json({ error: 'Failed to clear notification feed.' });
  }
});




// ==========================================
// 🔥 ROUTE A: FORGOT PASSWORD (REQUEST LINK)
// ==========================================
app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account found with that email address." });
    }

    // Generate a secure unique token (valid for 1 hour)
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Create the frontend reset link URL
    const resetUrl = `http://localhost:5173/reset-password/${token}`;

    // Email content layout
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Elite Residential - Password Reset Link',
      text: `You are receiving this email because you (or someone else) requested a password reset for your account.\n\n` +
            `Please click on the following link, or paste it into your browser to complete the process:\n\n` +
            `${resetUrl}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    // Dispatch the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "A secure reset link has been dispatched to your inbox." });

  } catch (error) {
    console.error("❌ Forgot password system error:", error);
    res.status(500).json({ message: "Internal server error running recovery pipeline." });
  }
});

// ==========================================
// 🔥 ROUTE B: RESET PASSWORD (SAVE NEW ONE)
// ==========================================
// ==========================================
// 🔥 ROUTE B: RESET PASSWORD (SAVE NEW ONE)
// ==========================================
app.post('/api/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // 🔬 DIAGNOSTIC LOGS
    console.log("=== PASSWORD RESET DEBUG ===");
    console.log("🔑 Token from browser URL:", token);
    console.log("⏰ Current Server Time:", Date.now());

    // 1. Look for matching token that hasn't expired yet
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      console.log("❌ DB LOOKUP FAILED: Token invalid or expired.");
      return res.status(400).json({ message: "Password reset token is invalid or has expired." });
    }

    console.log("✅ USER FOUND! Updating password for:", user.email);

    // 2. Securely hash the brand new password using bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 3. Wipe out the temporary tokens so they can't be reused
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Success! Your password has been updated securely." });

  } catch (error) {
    console.error("❌ Reset password processing error:", error);
    res.status(500).json({ message: "Internal server error updating credentials." });
  }
});

// ==========================================
// 🔒 ROUTE C: CHANGE PASSWORD (LOGGED IN)
// ==========================================
app.post('/api/change-password', async (req, res) => {
  try {
    // 💡 Note: Once you add JWT auth middleware later, you will get the userId from req.user.id
    // For now during development setup, we will pass the userId in the body to test the pipeline.
    const { userId, currentPassword, newPassword } = req.body;

    // 1. Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User profile not found." });
    }

    // 2. Verify that their entered current password matches what's in MongoDB
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "The current password you entered is incorrect." });
    }

    // 3. Validate safety requirements for the new password string
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_\-.])[A-Za-z\d@$!%*?&#_\-.]{6,}$/;
    if (!strongPasswordRegex.test(newPassword)) {
      return res.status(400).json({ 
        message: 'New password fails safety criteria. Must be 6+ characters with upper, lower, number, and special character.' 
      });
    }

    // 4. Hash the fresh new password and commit it to the document record
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    // 5. Trigger an automated cellular alert via Africa's Talking gateway!
    await sendSmsNotification('+254757972820', `Security Notice: Your Elite Residential account password was changed successfully.`);

    res.status(200).json({ message: "Success! Your password has been updated securely." });

  } catch (error) {
    console.error("❌ Change password execution error:", error);
    res.status(500).json({ message: "Internal server error updating your security credentials." });
  }
});

// Change this block at the bottom from process.env.PORT to a direct fallback configuration:
const PORT = 5000; 

// Change the hardcoded port listener block to this:
const PORT = process.env.PORT || 5000; 

// Keep the local listener wrapper active for your desktop terminal runs
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`📡 Server actively streaming locally on http://localhost:${PORT}`);
  });
}

// 🚀 CRUCIAL FOR VERCEL: Export the app module instance
module.exports = app;