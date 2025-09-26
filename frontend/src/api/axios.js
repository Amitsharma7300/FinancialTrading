// src/api/axios.js
import axios from "axios";

// Create an axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API; // ✅ default export
