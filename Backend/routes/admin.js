// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');       // JWT auth
const role = require('../middlewares/role');       // role check middleware
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Get all users (admin only)
router.get('/users', auth, role('admin'), async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    console.log('Users:', users); // debug
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all transactions (admin only)
router.get('/transactions', auth, role('admin'), async (req, res) => {
  try {
    const txs = await Transaction.find({})
      .populate('user', 'name email')          // populate user info
      .populate('product', 'name category price'); // populate product info
    console.log('Transactions:', txs); // debug
    res.json({ transactions: txs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
