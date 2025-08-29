import React from 'react';
import { ToastContainer as ReactToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const ToastContainer = () => {
  return (
    <ReactToastContainer
      position="top-left"  
      autoClose={2000}       
      hideProgressBar={false} 
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover    
    />
  );
};

export default ToastContainer;
