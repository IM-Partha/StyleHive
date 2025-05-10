import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const user_Id = user ? user.id : null;

    if (!user_Id) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/cart/getcart/${user_Id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setCartItems(data.data);
        } else {
          setError(data.message || "Failed to load cart");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const handleRemove = (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const user_Id = user ? user.id : null;

    fetch("http://localhost:5000/api/cart/removecart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user_Id, productId }),
    })
      .then((res) => res.json())
      .then(() => {
        setCartItems((prev) =>
          prev.filter((item) => item.productId !== productId)
        );
      })
      .catch(() => {
        alert("Failed to remove item.");
      });
  };

  // Ensure price is parsed correctly
  const getNumericPrice = (price) => {
    const num = parseFloat(price.replace(/[^0-9.-]+/g, "")); // Remove non-numeric characters
    return isNaN(num) ? 0 : num;
  };

  const totalQuantity = cartItems.length;
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + getNumericPrice(item.price),
    0
  );

  return (
    <div>
      <Navbar />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Link
            to="/"
            className="inline-block mb-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
          >
            Back
          </Link>

          {loading && <p>Loading cart...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div>
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map((item, index) => (
                    <li
                      key={index}
                      className="border p-4 rounded-md shadow-sm flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            ${getNumericPrice(item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(item.productId)}
                        className="cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-100 transition"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Total Summary */}
        {!loading && !error && cartItems.length > 0 && (
          <div className="border p-4 rounded-md shadow-md h-fit">
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            <p className="mb-2">
              Total Items: <strong>{totalQuantity}</strong>
            </p>
            <p className="mb-2">
              Total Price: <strong>${totalPrice.toFixed(2)}</strong>
            </p>
            <Link
              to="/checkout"
              className="mt-4 block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
