import React, { useState } from 'react';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handelSignup = () => {
        console.log('SignUp');
    };

    return (
        <div className='w-96 rounded-3xl h-96 bg-blue-500 flex gap-5 items-center justify-center flex-col p-8 m-8'>
            <p className='w-full text-center text-3xl'>SignUp</p>
            <input
                className='border-2 border-black p-2 rounded-md '
                type='text'
                placeholder='Email'
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <input
                className='border-2 border-black p-2 rounded-md '
                type='password'
                placeholder='Password'
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <input
                className='border-2 border-black p-2 rounded-md '
                type='password'
                placeholder='Confirm Password'
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }}
            />
            <button
                className='border-2 border-black p-2 w-28 rounded-md '
                onClick={handelSignup}>
                SignUp
            </button>
        </div>
    );
};

export default SignUp;
