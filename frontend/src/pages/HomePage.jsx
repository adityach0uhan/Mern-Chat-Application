import React, { useEffect } from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const UserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (UserInfo) {
            navigate('/chat');
        }
    }, [navigate]);

    return (
        <div className='w-screen flex h-screen gap-10 items-center justify-evenly'>
            <Login />
            <SignUp />
        </div>
    );
};

export default Home;
