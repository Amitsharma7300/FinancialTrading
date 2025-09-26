const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// buy product
router.post('/buy', auth, async (req, res) => {
  try {
    const { productId, units } = req.body;
    if (!productId || !units || units <= 0) return res.status(400).json({ message: 'Invalid input' });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const total = Number((product.price * Number(units)).toFixed(2));
    const user = req.user;
    if (user.wallet < total) return res.status(400).json({ message: 'Insufficient wallet balance' });

    // deduct
    user.wallet = Number((user.wallet - total).toFixed(2));
    await user.save();

    const tx = new Transaction({
      user: user._id,
      product: product._id,
      units,
      pricePerUnit: product.price,
      total,
      type: 'buy'
    });
    await tx.save();
    res.json({ message: 'Purchase successful', transaction: tx, wallet: user.wallet });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// sell product
router.post('/sell', auth, async (req, res) => {
  try {
    const { productId, units } = req.body;
    if (!productId || !units || units <= 0) return res.status(400).json({ message: 'Invalid input' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const user = req.user;

    // Calculate user's current holdings
    const transactions = await Transaction.find({ user: user._id, product: productId });
    const totalUnits = transactions.reduce(
      (sum, tx) => tx.type === 'buy' ? sum + tx.units : sum - tx.units,
      0
    );

    if (totalUnits < units) return res.status(400).json({ message: 'Not enough units to sell' });

    const total = Number((product.price * Number(units)).toFixed(2));

    // Increase wallet balance
    user.wallet = Number((user.wallet + total).toFixed(2));
    await user.save();

    // Record transaction
    const tx = new Transaction({
      user: user._id,
      product: product._id,
      units,
      pricePerUnit: product.price,
      total,
      type: 'sell'
    });
    await tx.save();

    res.json({ message: 'Sell successful', transaction: tx, wallet: user.wallet });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// user's transactions
router.get('/me', auth, async (req, res) => {
  try {
    const txs = await Transaction.find({ user: req.user._id }).populate('product');
    res.json({ transactions: txs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
