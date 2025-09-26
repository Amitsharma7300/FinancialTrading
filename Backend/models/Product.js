const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  peRatio: Number,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
