import UserModel from '../models/user.model';

export const fetchAllChats = async (req, res) => {
    try {
        const chats = await chatModel.find();
        res.status(200).json(chats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const accessChat = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id)
        return res.status(400).json({ message: 'User ID is required' });
    try {
        var isChat = await chatModel
            .find({
                isGroupChat: false,
                $and: [
                    { users: { $elemMatch: { $eq: user._id } } },
                    { users: { $elemMatch: { $eq: user_id } } }
                ]
            })
            .populate('users', '-password')
            .populate('latestMessage');
        isChat = await UserModel.populate(isChat, {
            path: 'latestMessage.sender',
            select: 'name email profilePic -password'
        });

        if (isChat.length > 0) {
            res.status(200).json(isChat[0]);
        } else {
            const chatData = {
                chatName: 'Sender',
                users: [req.user._id, user_id],
                isGroupChat: false
            };
            try {
                const createdChat = await chatModel.create(chatData);
                createdChat.save();
                const fullChat = await chatModel
                    .findOne({
                        _id: createdChat._id
                    })
                    .populate('users', '-password');

                return res.status(200).json(fullChat);
            } catch (error) {
                return res.status(404).json({ message: error.message });
            }
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
