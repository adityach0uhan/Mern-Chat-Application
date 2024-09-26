import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage.jsx';
import ChatPage from './pages/ChatPage.jsx';

function App() {
    return (
        <>
            <div className='bg-green-300 min-h-screen min-w-screen'>
                <Routes>
                    <Route path='/' element={<Home />} exact />
                    <Route path='/chat' element={<ChatPage />} exact />
                </Routes>
            </div>
        </>
    );
}

export default App;
