const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const portfolioRoutes = require('./routes/portfolio');
const adminRoutes = require('./routes/admin');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!MONGODB_URI) {
  console.error('ERROR: MONGODB_URI is not set in environment variables!');
}

const app = express();

app.use(cors({
  origin: [
    "https://qfsledger-frontend.vercel.app", 
    "http://localhost:3000",                 
    "http://localhost:5000"               
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('QFS Ledger Backend is Running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/portfolio', portfolioRoutes);

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
    .then(() => console.log('✅ Connected to MongoDB successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;