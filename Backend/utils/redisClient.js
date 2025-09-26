const { createClient } = require('redis');

let client;

const initRedis = async () => {
  client = createClient({
    url: process.env.REDIS_URL
  });
  client.on('error', (err) => console.error('Redis Client Error', err));
  await client.connect();
  console.log('Redis connected');
};

const getClient = () => {
  if (!client) throw new Error('Redis client not initialized');
  return client;
};

module.exports = { initRedis, getClient };
