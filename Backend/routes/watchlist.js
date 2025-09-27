const express = require("express");
const router = express.Router();

const User = require("../models/User");
const auth = require("../middlewares/auth");

// Get watchlist
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("watchlist");
    res.json({ watchlist: user.watchlist });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add to watchlist
router.post("/add", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user.watchlist.includes(productId)) {
      user.watchlist.push(productId);
      await user.save();
    }
    res.json({ watchlist: user.watchlist });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Remove from watchlist
router.delete("/remove/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.watchlist = user.watchlist.filter(
      (pid) => pid.toString() !== req.params.id
    );
    await user.save();
    res.json({ watchlist: user.watchlist });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
