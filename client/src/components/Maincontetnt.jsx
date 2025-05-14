import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import axios from "axios";
import LoadingSkeleton from "../utils/LoadingSkeleton";

import ToastContainer from "../utils/ToastContainer"; 
import { toast } from "react-toastify";


const Maincontent = () => {
  const [products, setProducts] = useState(null);
  const [selectedSection, setSelectedSection] = useState("Men's Clothing");
  const [userId, setUserId] = useState(null);
  const [wishlistProductIds, setWishlistProductIds] = useState(new Set());

  // Fetch user and wishlist on mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserId(parsedUserData.id);
      fetchWishlist(parsedUserData.id);
    }

    const GetAllData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/all"
        );
        setProducts(response.data.products[0]); // Set products assuming the structure
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    GetAllData();
  }, []);

  // Fetch wishlist from backend
  const fetchWishlist = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/wishlist/get/${userId}`
      );
      const ids =
        response.data?.wishlist?.products.map((p) => p.productId) || [];
      setWishlistProductIds(new Set(ids));
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  };

  // Filter products based on the search query
  const filterProducts = (products) => {
    if (!searchQuery) return products[selectedSection] || []; // No search, return all items in the selected section
    return (
      products[selectedSection]?.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    );
  };

  // Toggle wishlist item
  const handleToggleWishlist = async (item) => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    const isWishlisted = wishlistProductIds.has(item.id);

    try {
      if (isWishlisted) {
        // Remove from wishlist
        await axios.post("http://localhost:5000/api/wishlist/remove", {
          userId,
          productId: item.id,
        });
        setWishlistProductIds((prev) => {
          const updated = new Set(prev);
          updated.delete(item.id);
          return updated;
        });
        toast.success(`${item.name} removed from wishlist!`);
      } else {
        // Add to wishlist
        await axios.post("http://localhost:5000/api/wishlist/add", {
          userId,
          productId: item.id,
          name: item.name,
          imageUrl: item.imageUrl,
          price: item.price,
        });
        setWishlistProductIds((prev) => new Set(prev).add(item.id));
        toast.success(`${item.name} added to wishlist!`);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.info(`${item.name} removed from wishlist!`);
    }
  };

  // ✅ Add to cart function
  const addToCart = async (product, userId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/addcart', {
        userId,
        productId: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
      });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error.message);
      toast.error('Failed to add to cart.');
    }
  };

  const sectionNames = ["Men's Clothing", "Women's Clothing", "Kids & Baby"];

  return (
    <div className="p-5">
      {/* Add the ToastContainer here */}
      <ToastContainer />

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {sectionNames.map((section) => (
          <button
            key={section}
            className={`px-4 py-2 rounded font-semibold ${
              selectedSection === section
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedSection(section)}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Products */}
      {products ? (
        <Section
          title={selectedSection}
          items={filterProducts(products)}
          onToggleWishlist={handleToggleWishlist}
          wishlistProductIds={wishlistProductIds}
          addToCart={addToCart}
          userId={userId}
        />
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
};

// ✅ Updated Section component with Add to Cart button
const Section = ({
  title,
  items,
  onToggleWishlist,
  wishlistProductIds,
  addToCart,
  userId
}) => (
  <div className="mb-10">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, index) => {
        const isWishlisted = wishlistProductIds.has(item.id);
        return (
          <div
            key={index}
            className="relative shadow-md p-4 rounded-md bg-white hover:shadow-lg transition duration-300"
          >
            {/* Wishlist button */}
            <button
              onClick={() => onToggleWishlist(item)}
              className={`absolute top-3 right-3 p-2 rounded-full ${
                isWishlisted
                  ? "bg-yellow-300 text-yellow-700"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {isWishlisted ? (
                <BsBookmarkFill size={22} />
              ) : (
                <BsBookmark size={22} />
              )}
            </button>

            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-[200px] object-cover rounded mb-4"
            />
            <h3 className="font-semibold text-md mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.price}</p>
            <div className="flex items-center text-yellow-500 text-sm mt-1 mb-3">
              <FaStar className="mr-1" /> {item.rating}
            </div>

            {/* ✅ Add to Cart button with click handler */}
            <button
              onClick={() => addToCart(item, userId)}
              className="cursor-pointer inline-block w-full text-center bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  </div>
);

export default Maincontent;
