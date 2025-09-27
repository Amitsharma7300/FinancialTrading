require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const seed = async () => {
  try {
    await connectDB();

    // Only add products if they do not already exist
    const products = [
      { name: 'Acme Telecom Ltd', category: 'Stock', price: 480.25, peRatio: 18.2, description: 'Large cap telecom co.' },
      { name: 'GreenEnergy Mutual Fund', category: 'Mutual Fund', price: 1200.00, peRatio: -3.0, description: 'Renewable energy fund' },
      { name: 'SilverAuto Ltd', category: 'Stock', price: 780.5, peRatio: 22.4, description: 'Auto manufacturer' },
      { name: 'InfraBuilder Fund', category: 'Mutual Fund', price: 620.75, peRatio: 1.0, description: 'Infrastructure focused' }
    ];
    for (const prod of products) {
      const exists = await Product.findOne({ name: prod.name });
      if (!exists) {
        await Product.create(prod);
        console.log(`Product seeded: ${prod.name}`);
      } else {
        console.log(`Product already exists: ${prod.name}`);
      }
    }

    // Only create admin and user if they do not exist
    const adminExists = await User.findOne({ email: 'admin@miniapp.com' });
    if (!adminExists) {
      const adminPass = await bcrypt.hash('Admin123!', 10);
      const admin = new User({ email: 'admin@miniapp.com', password: adminPass, role: 'admin', wallet: 100000 });
      await admin.save();
      console.log('Admin user created: admin@miniapp.com / Admin123!');
    } else {
      console.log('Admin user already exists.');
    }

    const userExists = await User.findOne({ email: 'user@miniapp.com' });
    if (!userExists) {
      const userPass = await bcrypt.hash('User123!', 10);
      const user = new User({ email: 'user@miniapp.com', password: userPass, role: 'user', wallet: 100000 });
      await user.save();
      console.log('User created: user@miniapp.com / User123!');
    } else {
      console.log('Default user already exists.');
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
