const Chat = require('../models/chat');

const createChat = async (req, res) => {
    console.log("first");

    const { code, seller } = req.body;
    console.log(code, seller)
    if (!code || !seller) {
        return res.status(400).json({ message: 'El código y el vendedor son obligatorios.' });
    }
    const chatExists = await Chat.findOne(code);
    if(chatExists){
        return res.status(400).json({ message: 'El chat ya existe.' });
    }

    try {
        const newChat = new Chat({
            code, 
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

const addMessageToChat = async (req, res) => {
    const { id } = req.params; // Obtiene el ID del chat desde los parámetros de la URL
    const { content } = req.body; // Obtiene el contenido del mensaje desde el cuerpo de la solicitud
    
    if (!content) {
        return res.status(400).json({ message: 'El contenido del mensaje es obligatorio.' });
    }

    try {
        // Buscar el chat por ID
        const chat = await Chat.findById(id);

        if (!chat) {
            return res.status(404).json({ message: 'Chat no encontrado.' });
        }

        // Agregar el nuevo mensaje al historial de mensajes
        chat.messages.push({
            content,
            timestamp: new Date(),
        });

        // Guardar los cambios en la base de datos
        await chat.save();

        res.status(200).json({
            message: 'Mensaje agregado exitosamente.',
            chat,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el mensaje.', error: error.message });
    }
};


module.exports = {
    createChat,
    getAllChats,
    getChatById,
    addMessageToChat,
};
