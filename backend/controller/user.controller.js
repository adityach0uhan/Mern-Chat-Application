import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userLogin = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        // Find user by email or username
        const user = await UserModel.findOne({
            $or: [{ email }, { username }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '10d'
        });

        // Set the token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            credentials: true
        });

        // Respond with user details (excluding the token from the response body)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};

export default userLogin;

const userSignUp = async (req, res) => {
    const { email, password, name, profilePic, username } = await req.body;
    try {
        const isAlreadyRegistered = await UserModel.findOne({
            $or: [{ email }, { username }]
        });
        if (isAlreadyRegistered) {
            return res.status(400).json({ message: 'User already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            email,
            password: hashedPassword,
            name,
            profilePic,
            username
        });
        await user.save();
        if (!user) {
            return res.status(400).json({ message: 'User not created' });
        }
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const searchParams = req.query.search
            ? {
                  $or: [
                      { name: { $regex: req.query.search, $options: 'i' } },
                      { email: { $regex: req.query.search, $options: 'i' } },
                      { username: { $regex: req.query.search, $options: 'i' } }
                  ]
              }
            : {};
        const users = await UserModel.find(searchParams)
            .select('-password')
            .find({
                _id: { $ne: req.user._id }
            });
        if (!users) {
            return res.status(404).json({ message: 'Users not found' });
        }
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { userLogin, userSignUp, getAllUsers };
