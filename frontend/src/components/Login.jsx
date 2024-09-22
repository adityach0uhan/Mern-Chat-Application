import { useState } from 'react';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        if (email.length < 5 || password.length < 5) {
            alert('Enter Valid Email and Password');
        } else {
            // axios
            //     .post('http://localhost:5000/api/login', {
            //         email: email,
            //         password: password
            //     })
            //     .then((response) => {
            //         console.log(response);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        }
    };
    return (
        <div className='w-96 rounded-3xl h-96 bg-blue-500 flex gap-5 items-center justify-center flex-col p-8 m-8'>
            <p className='w-full text-center text-3xl'>Login</p>
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
            <button
                className='border-2 border-black p-2 w-28 rounded-md '
                onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default Login;
