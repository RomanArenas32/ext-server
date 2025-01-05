const { Router } = require('express');
const { createChat, getAllChats, getChatById } = require('../controllers/chats');

const router = Router();

router.post('/', createChat);
router.get('/', getAllChats);
router.get('/:id', getChatById);



module.exports = router;
