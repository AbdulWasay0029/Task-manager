const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http'); // Add HTTP
const { Server } = require('socket.io'); // Add Socket.io

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // Allows any origin. In production, restrict this.
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Middleware
// CORS allows your frontend (React) to talk to this backend
app.use(cors());
// This parses incoming JSON data (e.g., from POST requests)
app.use(express.json());
// Form data parser
app.use(express.urlencoded({ extended: false }));

// Socket.io injection middleware so routes can use it
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.io Connection Logic
let connectedUsers = {}; // Map user IDs to socket IDs

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // When a user logs in, they send their ID to join their personal room
  socket.on('join', (userId) => {
    socket.join(userId);
    connectedUsers[userId] = socket.id;
    console.log(`User ${userId} joined their room.`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    // Optional: cleanup connectedUsers
    for (const [userId, socketId] of Object.entries(connectedUsers)) {
      if (socketId === socket.id) {
        delete connectedUsers[userId];
        break;
      }
    }
  });
});

// Routes
// Basic test route to check if server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use Auth Routes
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

// Start Server using the HTTP server (not app.listen directly)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server (with WebSockets) running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
