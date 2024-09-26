import React from 'react';
import { chatState } from '../Context/ChatProvider';
import SingleChat from './SingleChat.jsx';
const ChatBox = () => {
    const { selectedChat } = chatState();
    return (
        <div className='w-2/3 h-screen '>
            <SingleChat />
        </div>
    );
};

export default ChatBox;
