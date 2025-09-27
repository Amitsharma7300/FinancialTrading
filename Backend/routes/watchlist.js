const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/User");
const Product = require("../models/Product");

// GET all watchlist items for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("watchlist");
    res.json(user.watchlist); // returns full product objects
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ADD product to watchlist
router.post("/add", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user.watchlist.includes(productId)) {
      user.watchlist.push(productId);
      await user.save();
    }
    const populatedUser = await user.populate("watchlist");
    res.json(populatedUser.watchlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// REMOVE product from watchlist
router.delete("/remove/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);
    user.watchlist = user.watchlist.filter(
      (id) => id.toString() !== productId
    );
    await user.save();
    const populatedUser = await user.populate("watchlist");
    res.json(populatedUser.watchlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
