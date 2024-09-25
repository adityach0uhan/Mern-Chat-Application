import express from 'express';
import {
    accessChat,
    fetchAllChats,
    createGroupChat,
    renameGroupChat,
    addUserToGroup
} from '../controller/chat.controller.js';
import protectedRoute from '../middleware/protectedRoute.js';

const router = express.Router();
router.get('/', protectedRoute, fetchAllChats);
router.post('/', protectedRoute, accessChat);
router.post('/creategroup', protectedRoute, createGroupChat);
router.put('/renamegroup', protectedRoute, renameGroupChat);
// router.put('/removeGroup', protectedRoute, removeGroupChat);
router.put('/addgroup', protectedRoute, addUserToGroup);
export default router;
