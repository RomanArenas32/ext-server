const Chat = require('../models/chat');

const createChat = async (req, res) => {
    console.log("first");

    const { code, seller } = req.body;

    if (!code || !seller) {
        return res.status(400).json({ message: 'El código y el vendedor son obligatorios.' });
    }

    try {
        const newChat = new Chat({
            productCode: code,    
            seller, 
            messages: [
                {
                    content: '¡Hola! Soy la máquina, ¿en qué puedo ayudarte?',
                },
            ],
        });
        await newChat.save();
        res.status(201).json({
            message: 'Chat creado exitosamente.',
            chat: newChat,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el chat.', error: error.message });
    }
};


const getAllChats = async (req, res) => {
    console.log("first")
    try {
        const chats = await Chat.find(); // Recupera todos los chats

        res.status(200).json({
            message: 'Chats recuperados exitosamente.',
            chats,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los chats.', error: error.message });
    }
};


const getChatById = async (req, res) => {
    const { id } = req.params; // Obtiene el ID desde los parámetros de la URL
    try {
        const chat = await Chat.findById(id); // Busca el chat por ID

        if (!chat) {
            return res.status(404).json({ message: 'Chat no encontrado.' });
        }

        res.status(200).json({
            message: 'Chat recuperado exitosamente.',
            chat,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el chat.', error: error.message });
    }
};

module.exports = {
    createChat,
    getAllChats,
    getChatById,
};
