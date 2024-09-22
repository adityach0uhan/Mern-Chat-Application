import { useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
function App() {
    return (
        <>
            <div className='w-screen h-screen flex flex-wrap gap-4 items-center justify-evenly '>
                <Login></Login>
                <SignUp></SignUp>
            </div>
        </>
    );
}

export default App;
