📊 Mini Financial Trading App

A simplified financial trading platform built with the MERN stack.
It demonstrates secure APIs, authentication with KYC, portfolio management, and simple buy/sell simulation.

🚀 Features

🔐 User Authentication (JWT-based login/register)

🪪 KYC Verification (PAN, ID upload, basic info)

📈 Simple Portfolio Management

💸 Dummy Buy/Sell Trades with Balance Update

📑 REST API Documentation

🛠️ Tech Stack

Frontend: React + Tailwind CSS

Backend: Node.js + Express.js

Database: MongoDB (Mongoose)

Auth: JWT (JSON Web Tokens)

File Upload: Multer


1️⃣ Clone the Repository
git clone https://github.com/Amitsharma7300/FinancialTrading.git
cd mini-trading-app

Backend Setup
cd server
npm install

Create a .env file inside /server with the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Run the backend:

npm start

Frontend Setup
cd client
npm install
npm run dev


API Documentation
🔑 Authentication
POST /api/auth/register

Register a new user with KYC.
Request Body:

{
  "name": "Amit Sharma",
  "email": "amit@example.com",
  "password": "123456",
  "pan": "ABCDE1234F"
}

POST /api/auth/login

Login user and return JWT token.
Request Body:

{
  "email": "amit@example.com",
  "password": "123456"
}

👛 Portfolio
GET /api/portfolio


📜 License

MIT License


---

Do you also want me to make a **shorter “quickstart version”** of this README (just setup + APIs, no extras), so you can use it in hackathon-style projects?