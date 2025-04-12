const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Database connection
const db = require('./config/db');
db.connect();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const patientRoutes = require('./routes/patientRoutes');
const todoRoutes = require('./routes/todoRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/api/patients', patientRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/chat', chatRoutes);

// Socket.io for real-time chat
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });
  
  socket.on('chatMessage', (data) => {
    io.to(data.room).emit('message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});