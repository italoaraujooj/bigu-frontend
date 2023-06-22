import NotificationContext from '@/context/NotificationContext';
import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';

export default function Notification() {
    const { type, message } = useContext(NotificationContext);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      
    />
  );
}
