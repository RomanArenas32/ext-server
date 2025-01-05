const { Router } = require('express');
const { createChat, getAllChats, getChatById } = require('../controllers/chats');

const router = Router();

router.post('/', createChat);
router.get('/chats', getAllChats);
router.get('/chats/:id', getChatById);



module.exports = router;
