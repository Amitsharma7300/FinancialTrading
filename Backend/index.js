require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const { initRedis } = require('./utils/redisClient');
const cors = require('cors');
const app = express();

connectDB();
initRedis().catch(err => {
  console.error('Redis init error', err);
  process.exit(1);
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/admin', require('./routes/admin'));
app.use("/api/watchlist", require("./routes/watchlist"));
app.get('/', (req, res) => res.send('Mini Trading App API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
