import React from 'react';
import { chatState } from '../Context/ChatProvider';
import SideDrawer from '../components/SideDrawer';
import AllChats from '../components/AllChats';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {
    const { user } = chatState();
    return (
        <div className='w-screen'>
            {user && <SideDrawer />}
            <div className=''>
                {user && <AllChats />}
                {user && <ChatBox />}
            </div>
        </div>
    );
};

export default ChatPage;
