import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux'; 
import { clearCart } from '../redux/cartSlice'; 
import API_URL from '../utils/Api_Url';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    if (userId) {
      // Clear cart from the server
      fetch(`${API_URL}api/cart/clearcart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Cart cleared from server:', data);
        })
        .catch((err) => {
          console.error('Failed to clear cart from server:', err);
        });
    }

    // Clear cart from Redux (frontend)
    dispatch(clearCart());

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      dispatch(clearCart());
      navigate('/'); 
      window.location.reload();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [dispatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ClipLoader color="#22c55e" size={50} />
      <h1 className="text-2xl font-bold text-black-600 mt-4">Order Successfully</h1>
      <p className="mt-2 text-gray-600">Redirecting to home in {countdown} second{countdown !== 1 && 's'}...</p>
    </div>
  );
};

export default Checkout;
