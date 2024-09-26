import React, { useState } from 'react';
import axios from 'axios';
const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handelSignup = () => {
        if (
            email.length < 5 ||
            password.length < 5 ||
            confirmPassword.length < 5
        ) {
            alert('Enter Valid Email and Password');
        }
        if (password !== confirmPassword) {
            alert('Password and Confirm Password should be same');
        }

        axios
            .post(
                'http://localhost:3000/api/user/signUp',
                {
                    username: username,
                    name: name,
                    email: email,
                    password: password
                },
                { withCredentials: true }
            )
            .then((response) => {
                setLoading(false);
                console.log('SignUp successful:', response.data);
            })
            .catch((error) => {
                setLoading(false);
                console.error(
                    'SignUp error:',
                    error.response?.data || error.message
                );
            });

        console.log('SignUp');
    };

    return (
        <div className='w-96 rounded-3xl h-96 bg-blue-500 flex gap-5 items-center justify-center flex-col p-8 m-8'>
            <p className='w-full text-center text-3xl'>SignUp</p>
            <input
                type='text'
                className='border-2 border-black p-2 rounded-md'
                value={username}
                placeholder='Username'
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <input
                type='text'
                className='border-2 border-black p-2 rounded-md'
                value={name}
                placeholder='Name'
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            <input
                className='border-2 border-black p-2 rounded-md '
                type='text'
                value={email}
                placeholder='Email'
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <input
                className='border-2 border-black p-2 rounded-md '
                type='password'
                value={password}
                placeholder='Password'
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <input
                className='border-2 border-black p-2 rounded-md '
                type='password'
                value={confirmPassword}
                placeholder='Confirm Password'
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }}
            />
            <button
                className='border-2 border-black p-2 w-28 rounded-md '
                onClick={handelSignup}>
                {loading ? 'wait....' : 'SignUp'}
            </button>
        </div>
    );
};

export default SignUp;
