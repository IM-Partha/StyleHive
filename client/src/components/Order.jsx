import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from '../redux/cartSlice';
import Footer from './Footer';
import Navbar from './Navbar';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

// ================= Payment Button =================
const PaymentButton = ({ amount }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // 1. Create order from backend
      const { data: order } = await axios.post(
        "http://localhost:5000/api/payment/orders",
        { amount }
      );

      // 2. Setup Razorpay checkout options
      const options = {
        key: "rzp_test_RBCZxW2LPPhd00", // use your test key
        amount: order.amount,
        currency: order.currency,
        name: "Book Store",
        description: "Purchase Books",
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3. Verify payment
            const verifyRes = await axios.post(
              "http://localhost:5000/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyRes.data.success) {
              toast.success("✅ Payment Successful!");

              
              dispatch(clearCart());

              // Redirect to home after short delay
              setTimeout(() => {
                navigate("/");
              }, 1000);
            } else {
              toast.error("❌ Payment verification failed!");
            }
          } catch (err) {
            console.error(err);
            toast.error("⚠️ Error verifying payment!");
          }
        },
        theme: { color: "#3399cc" },
      };

      // 4. Open Razorpay modal
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Error creating payment order!");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Pay ₹{amount}
    </button>
  );
};

// ================= Order Page =================
const Order = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const cleanPrice = (price) => {
    return parseFloat(price.replace(/[^\d.-]/g, '')) || 0;
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + cleanPrice(item.price) * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    console.log('Total Price:', totalPrice);
    console.log('Total Quantity:', totalQuantity);
    cartItems.forEach((item) => {
      const price = cleanPrice(item.price);
      console.log(`Item: ${item.name}, Price: ₹${price}, Quantity: ${item.quantity}, Total: ₹${price * item.quantity}`);
    });
  }, [cartItems, totalPrice, totalQuantity]);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-6 px-4 py-8 bg-gray-50 min-h-screen">
        
        <div className="lg:w-3/4 w-full space-y-4">
          <button
            onClick={() => window.history.back()}
            className="cursor-pointer inline-block px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 mb-4"
          >
            ← Back
          </button>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow-sm rounded-md hover:shadow-md transition"
              >
                <div className="flex items-center space-x-4 w-full md:w-auto">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-20 w-20 object-contain rounded"
                  />
                  <div>
                    <h3 className="text-md font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
                        className="cursor-pointer px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity({ id: item.id }))}
                        className=" cursor-pointer px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 md:mt-0 w-full md:w-auto gap-4">
                  <p className="text-md font-semibold whitespace-nowrap">
                    ₹{cleanPrice(item.price) * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="cursor-pointer text-red-600 text-xl hover:text-red-800"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-6">
              <h2 className="text-2xl font-semibold">Your Cart Is Empty</h2>
              <p>You have no product in cart.</p>
            </div>
          )}
        </div>

        {cartItems && cartItems.length > 0 && (
          <div className="lg:w-1/4 w-full bg-white p-6 shadow-md rounded-md h-fit">
            <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
            <p className="text-md mb-1">Total Items: {totalQuantity}</p>
            <p className="text-md mb-4">Total Price: ₹{totalPrice}</p>

            {/* ✅ Payment Button */}
            <PaymentButton amount={totalPrice} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Order;
