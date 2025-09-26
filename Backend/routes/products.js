const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const auth = require('../middlewares/auth');
const { getClient } = require('../utils/redisClient');

// get product list with Redis caching
router.get('/', async (req, res) => {
  try {
    const redis = getClient();
    const cacheKey = 'products:all';
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json({ fromCache: true, products: JSON.parse(cached) });
    }
    const products = await Product.find({});
    await redis.set(cacheKey, JSON.stringify(products), { EX: 30 }); // cache 30s
    res.json({ fromCache: false, products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// product detail
router.get('/:id', async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: 'Not found' });

    // Add dummy historical prices for chart
    const today = Date.now();
    const points = [];
    for (let i = 10; i >= 0; i--) {
      const priceFluct = prod.price * (1 + (Math.sin(i)/20) + (Math.random()-0.5)/50);
      points.push({ date: new Date(today - i * 24 * 60 * 60 * 1000), price: Number(priceFluct.toFixed(2)) });
    }
    res.json({ product: prod, history: points });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// add/remove product to/from watchlist
router.post('/:id/watch', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Use atomic update to add/remove
    const user = await User.findById(userId);
    const isInWatchlist = user.watchlist.some(id => id.toString() === productId);

    let updatedUser;
    if (isInWatchlist) {
      // remove from watchlist
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { watchlist: productId } },
        { new: true }
      ).populate('watchlist');
    } else {
      // add to watchlist
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { watchlist: productId } },
        { new: true }
      ).populate('watchlist');
    }

    res.json({ watchlist: updatedUser.watchlist });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
