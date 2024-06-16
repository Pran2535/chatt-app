import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';

const OtherUsers = () => {
    // Custom hook to fetch other users
    useGetOtherUsers();

    // Select otherUsers from Redux store
    const { otherUsers } = useSelector((store) => store.user);

    // Handle initial loading state or empty state
    if (!otherUsers) return <div>Loading...</div>; // or any other loading state indication

    return (
        <div className='overflow-auto flex-1'>
            {otherUsers.map((user) => (
                <OtherUser key={user._id} user={user} />
            ))}
        </div>
    );
};

export default OtherUsers;
