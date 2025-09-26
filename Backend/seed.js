require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const seed = async () => {
  try {
    await connectDB();

    // clear collections
    await Product.deleteMany({});
    await User.deleteMany({});

    const products = [
      { name: 'Acme Telecom Ltd', category: 'Stock', price: 480.25, peRatio: 18.2, description: 'Large cap telecom co.' },
      { name: 'GreenEnergy Mutual Fund', category: 'Mutual Fund', price: 1200.00, peRatio: -3.0, description: 'Renewable energy fund' },
      { name: 'SilverAuto Ltd', category: 'Stock', price: 780.5, peRatio: 22.4, description: 'Auto manufacturer' },
      { name: 'InfraBuilder Fund', category: 'Mutual Fund', price: 620.75, peRatio: 1.0, description: 'Infrastructure focused' }
    ];
    await Product.insertMany(products);
    console.log('Products seeded');

    const adminPass = await bcrypt.hash('Admin123!', 10);
    const admin = new User({ email: 'admin@miniapp.com', password: adminPass, role: 'admin', wallet: 100000 });
    await admin.save();
    console.log('Admin user created: admin@miniapp.com / Admin123!');

    const userPass = await bcrypt.hash('User123!', 10);
    const user = new User({ email: 'user@miniapp.com', password: userPass, role: 'user', wallet: 100000 });
    await user.save();
    console.log('User created: user@miniapp.com / User123!');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
