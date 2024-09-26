import UserModel from '../models/user.model.js';
import MessageModel from '../models/message.model.js';
import chatModel from '../models/chat.model.js';

export async function sendMessage(req, res) {
    const { content, chatId } = await req.body;
    if (!content || !chatId) {
        return res
            .status(400)
            .json({ message: 'Content and chatId are required' });
    }
    let newMessage = {
        content,
        chat: chatId,
        sender: req.user._id
    };
    try {
        let message = await MessageModel.create(newMessage);
        message = await message.populate('sender', 'username name');

        message = await message.populate('chat');
        message = await UserModel.populate(message, {
            path: 'chat.users',
            select: 'username name'
        });
        await chatModel.findByIdAndUpdate(chatId, {
            latestMessage: message
        });

        return res.status(201).json({ message });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getAllMessages(req, res) {
    try {
        const messages = await MessageModel.find({ chat: req.params.chatId })
            .populate('sender', 'username name')
            .populate('chat');
        return res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
