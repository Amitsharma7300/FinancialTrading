const mongoose = require('mongoose');

const KycSchema = new mongoose.Schema({
  fullName: String,
  pan: String,
  idImagePath: String, // local path to dummy uploaded ID
  completedAt: Date
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user','admin'], default: 'user' },
  wallet: { type: Number, default: 100000 }, // seed ₹100,000
  kyc: { type: KycSchema, default: null },
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
