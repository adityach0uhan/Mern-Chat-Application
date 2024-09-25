import express from 'express';
import {
    accessChat,
    fetchAllChats,
    createGroupChat,
    renameGroupChat,
    addUserToGroup,
    kickFromGroup
} from '../controller/chat.controller.js';
import protectedRoute from '../middleware/protectedRoute.js';

const router = express.Router();
router.get('/', protectedRoute, fetchAllChats);
router.post('/', protectedRoute, accessChat);
router.post('/creategroup', protectedRoute, createGroupChat);
router.put('/renamegroup', protectedRoute, renameGroupChat);
router.put('/kickfromgroup', protectedRoute, kickFromGroup);
router.put('/addtogroup', protectedRoute, addUserToGroup);
export default router;
