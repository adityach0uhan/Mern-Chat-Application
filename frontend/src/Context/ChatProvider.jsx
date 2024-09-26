import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const UserInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(UserInfo);
        if (!UserInfo) {
            navigate('/');
        } else {
            navigate('/chat');
        }
    }, [navigate]);

    return (
        <ChatContext.Provider
            value={{
                user,
                setUser,
                selectedChat,
                setSelectedChat,
                chats,
                setChats
            }}>
            {children}
        </ChatContext.Provider>
    );
};

export const chatState = () => useContext(ChatContext);

export default ChatProvider;
