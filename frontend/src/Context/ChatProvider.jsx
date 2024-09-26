import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState('');
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
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    );
};

export const chatState = () => useContext(ChatContext);

export default ChatProvider;
