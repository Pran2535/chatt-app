import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((state) => state.user);
  
  // Check if the user is online based on onlineUsers array
  const isOnline = onlineUsers?.includes(user._id);

  // Function to dispatch action to set selected user
  const selectedUserHandler = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        onClick={selectedUserHandler}
        className={`cursor-pointer flex gap-2 p-2 rounded items-center ${
          selectedUser?._id === user?._id ? 'bg-zinc-200 text-black' : 'text-white hover:bg-zinc-200 hover:text-black'
        }`}
      >
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className='w-12 rounded-full'>
            <img src={user?.profilePhoto} alt="user-profile" />
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex justify-between gap-2'>
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className='divider my-0 py-0 h-1'></div>
    </>
  );
};

export default OtherUser;
