import React, { useState, useEffect } from 'react';
import { useToast, Box, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import { chatState } from '../Context/ChatProvider';
import Loader from './Loader';
import { getSender } from '../helper/getSenderName.js';
import GroupChatModal from './GroupChatModal.jsx';

const AllChats = () => {
    const [loggedinUser, setLoggedinUser] = useState(null);
    const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
        chatState();
    const toast = useToast();

    const fetchChats = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/chat/');
            setChats(data);
        } catch (error) {
            toast({
                title: 'Something went wrong while fetching chats',
                status: 'error',
                isClosable: true
            });
        }
    };

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        setLoggedinUser(userInfo ? JSON.parse(userInfo) : null);
        fetchChats();
    }, []);

    return (
        <div className='w-1/3'>
            <Box
                display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
                flexDir='column'
                h='100vh'
                p={4}>
                <Box
                    pb={4}
                    px={4}
                    fontSize={20}
                    display='flex'
                    w='100%'
                    justifyContent='space-between'
                    alignItems='center'>
                    My Chats
                    <GroupChatModal>
                        <Button display='flex'>New Group</Button>
                    </GroupChatModal>
                </Box>

                <Box
                    display='flex'
                    flexDir='column'
                    w='100%'
                    h='100%'
                    overflowY='scroll'
                    bg='blue.500'
                    rounded={10}
                    p={4}>
                    {chats ? (
                        chats.length > 0 ? (
                            chats.map((chat) => (
                                <Box
                                    onClick={() => setSelectedChat(chat)}
                                    cursor='pointer'
                                    color={
                                        selectedChat?._id === chat._id &&
                                        'black'
                                    }
                                    bg={
                                        selectedChat?._id === chat._id
                                            ? 'yellow.300'
                                            : 'gray.200'
                                    }
                                    p={3}
                                    m={1}
                                    borderRadius={10}
                                    key={chat._id}>
                                    <Text>
                                        {!chat.isGroupChat && loggedinUser
                                            ? getSender(
                                                  loggedinUser,
                                                  chat.users
                                              )
                                            : chat.chatName}
                                    </Text>
                                </Box>
                            ))
                        ) : (
                            <Text>No chats available.</Text>
                        )
                    ) : (
                        <Loader />
                    )}
                </Box>
            </Box>
        </div>
    );
};

export default AllChats;
