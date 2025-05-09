import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const user_Id = user ? user.id : null;

    fetch(`http://localhost:5000/api/wishlist/gate/${user_Id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setWishlist(data.data);
        } else {
          setError(data.message);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  const handleRemove = (productId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const user_Id = user ? user.id : null;

    if (!user_Id) {
      setError('User not logged in');
      return;
    }

    fetch('http://localhost:5000/api/wishlist/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user_Id, productId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const updatedList = wishlist.filter((item) => item.productId !== productId);
          setWishlist(updatedList);
        } else {
          setError(data.message);
        }
      })
      .catch(() => {
        setError('Failed to remove product',error);
      });
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '10px 20px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '10px',
          }}
        >
          ← Back
        </button>


        {wishlist && wishlist.length > 0 ? (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '20px',
              padding: '10px',
            }}
          >
            {wishlist.map((product) => (
              <div
                key={product._id}
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  position: 'relative',
                  flex: '1 1 calc(50% - 20px)',
                }}
              >
                <button
                  onClick={() => handleRemove(product.productId)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '22px',
                    cursor: 'pointer',
                    color: '#ff4d4f',
                  }}
                  title="Remove from wishlist"
                >
                  <MdDeleteOutline />
                </button>

                <img
                  src={product.imageUrl}
                  alt={product.name}
                  width="100%"
                  style={{ borderRadius: '5px' }}
                />
                <h3 style={{ fontSize: '16px', margin: '10px 0 5px' }}>{product.name}</h3>
                <p style={{ color: '#666' }}>{product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            {loading ? 'Loading wishlist...' : 'No products in the wishlist'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
