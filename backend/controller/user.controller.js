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
            return res
                .status(400)
                .json({ message: 'Invalid credentials password not match' });
        }
        const token = await jwt.sign(
            { id: user._id, name: user.name, username: user.username },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );
        res.cookie('token', token, {
            httpOnly: true
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message, error });
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
