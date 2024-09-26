import express from 'express';
import protectedRoute from '../middleware/protectedRoute.js';
import {
    sendMessage,
    getAllMessages
} from '../controller/message.controller.js';
const router = express.Router();

router.post('/', protectedRoute, sendMessage);
router.get('/:chatId', protectedRoute, getAllMessages);

export default router;
