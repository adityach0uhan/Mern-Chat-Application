import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            default: '../assets/default.png'
        }
    },
    { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
