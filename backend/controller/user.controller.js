import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userLogin = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const user = await UserModel.findOne({
            $or: [{ email }, { username }]
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const userSignUp = async (req, res) => {
    const { email, password, name, profilePic, username } = await req.body;
    try {
        const isAlreadyRegistered = await UserModel.findOne({
            $or: [{ email }, { username }]
        });
        if (isAlreadyRegistered) {
            return res.status(400).json({ message: 'User already registered' });
        }
        const user = await UserModel.create({
            email,
            password,
            name,
            profilePic,
            username
        });
        if (!user) {
            return res.status(400).json({ message: 'User not created' });
        }
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { userLogin, userSignUp };
