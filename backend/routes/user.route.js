import express from 'express';
const router = express.Router();
import {
    userLogin,
    userSignUp,
    getAllUsers
} from '../controller/user.controller.js';
import protectedRoute from '../middleware/protectedRoute.js';

router.post('/login', userLogin);
router.post('/signUp', userSignUp);
router.get('/allusers', protectedRoute, getAllUsers);

export default router;
