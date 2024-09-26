import React from 'react';
import { chatState } from '../Context/ChatProvider';
import { getSender } from '../helper/getSenderName';
const SingleChat = () => {
    const { selectedChat, user, setSelectedChat } = chatState();

    return (
        <div>
            {selectedChat ? (
                <div>
                    {!selectedChat.isGroupChat ? (
                        <div className='flex text-2xl mt-4'>
                            {getSender(user, selectedChat.users)}
                        </div>
                    ) : (
                        'ues'
                    )}
                </div>
            ) : (
                <div className='flex justify-center items-center h-full text-2xl text-gray-400'>
                    <p> Select a chat to start messaging</p>
                </div>
            )}
        </div>
    );
};

export default SingleChat;
