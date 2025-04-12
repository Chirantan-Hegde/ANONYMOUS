const Chat = require('../models/Chat');

// Get chat history for a room (doctor-patient)
exports.getChatHistory = async (req, res) => {
  try {
    const messages = await Chat.find({ room: req.params.room })
      .sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save chat message to database
exports.saveChatMessage = async (req, res) => {
  try {
    const { room, sender, message } = req.body;
    
    const chatMessage = new Chat({
      room,
      sender,
      message
    });
    
    await chatMessage.save();
    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};