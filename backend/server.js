const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
// CORS allows your frontend (React) to talk to this backend
app.use(cors());
// This parses incoming JSON data (e.g., from POST requests)
app.use(express.json());
// Form data parser
app.use(express.urlencoded({ extended: false }));

// Routes
// Basic test route to check if server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use Auth Routes
// Prefixing with /api => creates /api/register, /api/login
app.use('/api', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

// Connect to database
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
