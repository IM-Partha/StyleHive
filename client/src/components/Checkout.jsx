import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Checkout = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    if (userId) {
      fetch('http://localhost:5000/api/cart/clearcart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Cart cleared:', data);
        })
        .catch((err) => {
          console.error('Failed to clear cart:', err);
        });
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ClipLoader color="#22c55e" size={50} />
      <h1 className="text-2xl font-bold text-green-600 mt-4">Order Successfully</h1>
      <p className="mt-2 text-gray-600">Redirecting to home in {countdown} second{countdown !== 1 && 's'}...</p>
    </div>
  );
};

export default Checkout;
