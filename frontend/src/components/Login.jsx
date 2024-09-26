import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        setLoading(true);

        if (email.length < 5 || password.length < 5) {
            alert('Enter Valid Email and Password');
        } else {
            axios
                .post(
                    'http://localhost:3000/api/user/login',
                    {
                        email: email,
                        password: password
                    },
                    { withCredentials: true } // This ensures cookies are sent/received
                )
                .then((response) => {
                    setLoading(false);
                    console.log('Login successful:', response.data);
                    localStorage.setItem(
                        'userInfo',
                        JSON.stringify(response.data)
                    );
                    navigate('/chat');
                })
                .catch((error) => {
                    setLoading(false);
                    console.error(
                        'Login error:',
                        error.response?.data || error.message
                    );
                });
        }
    };

    return (
        <div className='w-96 rounded-3xl h-96 bg-blue-500 flex gap-5 items-center justify-center flex-col p-8 m-8'>
            <p className='w-full text-center text-3xl'>Login</p>
            <input
                className='border-2 border-black p-2 rounded-md'
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className='border-2 border-black p-2 rounded-md'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className='border-2 border-black p-2 w-28 rounded-md'
                onClick={handleLogin}>
                {loading ? 'wait....' : 'Login'}
            </button>
        </div>
    );
};

export default Login;
