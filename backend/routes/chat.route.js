import chatModel from '../models/chat.model.js';
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const chats = await chatModel.find();
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
