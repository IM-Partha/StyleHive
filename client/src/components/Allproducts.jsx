import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import LoadingSkeleton from "../utils/LoadingSkeleton";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchQuery } from "../redux/searchSlice";
import { addBookmark, removeBookmark } from "../redux/bookmarkSlice";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import API_URL from "../utils/Api_Url";

const Allproducts = () => {
  const [alldatas, setAlldatas] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const searchQuery = useSelector(selectSearchQuery);
  const bookmarkedProducts = useSelector((state) => state.bookmark.bookmarks);

  useEffect(() => {
    async function GateAllData() {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}api/products/all`);
        setAlldatas(res?.data?.products[0]?.pro || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    GateAllData();
  }, []);

  const handleClick = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleSelectProduct = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      window.location.href = "/login";
      return;
    }

    if (bookmarkedProducts.some((item) => item.id === product.id)) {
      dispatch(removeBookmark(product.id));
      toast.info("Removed from bookmarks");
    } else {
      dispatch(addBookmark(product));
      toast.success("Added to bookmarks");
    }
  };

  const filteredProducts = alldatas.filter(
    (item) =>
      (category === "All" || item.categories === category) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    "All",
    "Men's Clothing",
    "Women's Clothing",
    "Kids & Baby",
  ];

  async function HandelAddToCart(item) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      window.location.href = "/login";
      return;
    }

    dispatch(addToCart(item));

    try {
      await axios.post(`${API_URL}api/cart/addcart`, {
        userId: user.id,
        productId: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        price: item.price,
      });
      toast.success("Product added to cart!");
    } catch (error) {
      toast.info("Product already in cart",error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 p-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={`px-4 py-2 rounded-md text-sm sm:text-base cursor-pointer transition
              ${
                category === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
          >
            {cat === "All"
              ? "All Products"
              : cat.includes("Men")
              ? "Mens"
              : cat.includes("Women")
              ? "Womens"
              : "Kid's"}
          </button>
        ))}
      </div>

      {/* Product Grid or Loader */}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
          {filteredProducts.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-md shadow-sm hover:shadow-lg hover:scale-[1.02] transition duration-200 ease-in-out cursor-pointer bg-white ${
                bookmarkedProducts.some((product) => product.id === item.id)
                  ? "bg-yellow-100"
                  : ""
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-48 w-full object-contain mb-3"
              />
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <h2 className="text-md font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">
                    Rating: {item.rating}
                  </p>
                  <p className="text-md font-bold">{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleSelectProduct(item)}
                    className="text-lg"
                  >
                    {bookmarkedProducts.some(
                      (product) => product.id === item.id
                    ) ? (
                      <FaBookmark className= "cursor-pointer text-blue-600" />
                    ) : (
                      <FaRegBookmark className="cursor-pointer text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => HandelAddToCart(item)}
                    className="cursor-pointer bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition text-sm mt-1"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Allproducts;
