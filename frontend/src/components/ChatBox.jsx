import React from 'react';
import { chatState } from '../Context/ChatProvider';
const ChatBox = () => {
    const { selectedChat } = chatState();
    return (
        <div className='w-2/3 h-screen bg-blue-600'>
            <SingleChat />
        </div>
    );
};

export default ChatBox;
