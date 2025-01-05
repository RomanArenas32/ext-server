const { Router } = require('express');
const { createChat, getAllChats, getChatById, addMessageToChat } = require('../controllers/chats');

const router = Router();

router.post('/', createChat);
router.get('/', getAllChats);
router.get('/:id', getChatById);
router.put('/:id/message', addMessageToChat);


module.exports = router;
