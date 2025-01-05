const { Schema, model } = require('mongoose');

// Esquema de un mensaje
const messageSchema = new Schema({
  content: { type: String, required: true }, // El contenido del mensaje
  timestamp: { type: Date, default: Date.now }, // Marca de tiempo
});

// Esquema para un chat (solo historial de mensajes)
const chatSchema = new Schema({
  messages: [messageSchema], // Lista de mensajes del chat
  createdAt: { type: Date, default: Date.now }, // Fecha de creación del chat
});

module.exports = model('Chat', chatSchema);