const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  content: { type: String, required: true }, 
  timestamp: { type: Date, default: Date.now }, 
});

const chatSchema = new Schema({
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
  code: { type: String, required: true, unique: true },
  seller: { type: String, required: true },
});

module.exports = model('Chat', chatSchema);