const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const auth = require('../middlewares/auth'); // JWT auth middleware

// multer setup to save files in uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Helper: generate JWT token
const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

// ------------------- REGISTER -------------------
router.post('/register', upload.single('idImage'), async (req, res) => {
  try {
    const { email, password, fullName, pan } = req.body;
    if (!email || !password || !fullName || !pan) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashed,
      kyc: {
        fullName,
        pan,
        idImagePath: req.file ? `/uploads/${req.file.filename}` : null,
        completedAt: new Date()
      }
    });

    await user.save();
    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        wallet: user.wallet,
        role: user.role,
        kyc: user.kyc
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ------------------- LOGIN -------------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        wallet: user.wallet,
        role: user.role,
        kyc: user.kyc
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ------------------- CURRENT USER -------------------
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      id: user._id,
      email: user.email,
      wallet: user.wallet,
      role: user.role,
      kyc: user.kyc || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
