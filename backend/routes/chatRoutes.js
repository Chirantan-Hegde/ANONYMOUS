const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Get chat history
router.get('/:room', chatController.getChatHistory);

// Save chat message
router.post('/', chatController.saveChatMessage);

module.exports = router;