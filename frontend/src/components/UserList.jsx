import React from 'react';

const UserList = ({ user }) => {
    return (
        <div className='w-full p-2  rounded-xl overflow-hidden my-3  bg-blue-300'>
            <div className=' flex text-base px-2 items-center justify-between'>
                <p>{user.name}</p>
                <p>{user.username}</p>
            </div>
            <p className='text-xs px-2'>{user.email}</p>
        </div>
    );
};

export default UserList;
