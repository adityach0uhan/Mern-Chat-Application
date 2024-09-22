import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatModel'
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel'
        },
        content: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;
