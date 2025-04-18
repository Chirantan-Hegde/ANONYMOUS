const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true,
    enum: ['doctor', 'patient']
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', ChatSchema);