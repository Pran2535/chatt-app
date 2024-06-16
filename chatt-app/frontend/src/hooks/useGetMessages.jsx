import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '../config';

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let source = axios.CancelToken.source(); // Create a cancel token source

    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUser?._id}`, {
          cancelToken: source.token, // Pass cancel token to request config
        });
        dispatch(setMessages(res.data));
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.log(error);
        }
      }
    };

    fetchMessages();

    return () => {
      source.cancel(); // Cancel ongoing Axios request when component unmounts or on re-render
    };
  }, [selectedUser?._id, dispatch]); // Include dispatch in dependency array

  // Optionally, you can return cleanup logic here if needed
};

export default useGetMessages;
