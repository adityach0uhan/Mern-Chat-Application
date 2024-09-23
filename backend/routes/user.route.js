import express from 'express';
const router = express.Router();
import { userLogin, userSignUp } from '../controller/user.controller.js';

router.post('/login', userLogin);
router.post('/signUp', userSignUp);

export default router;
