import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { SlMagnifier } from "react-icons/sl";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { CiBookmark } from "react-icons/ci"; // Wishlist icon
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, selectSearchQuery } from "../redux/searchSlice";
import { selectBookmarks } from "../redux/bookmarkSlice";
import { selectCart } from "../redux/cartSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const searchQuery = useSelector(selectSearchQuery);
  const bookmarks = useSelector(selectBookmarks);
  const cartItems = useSelector(selectCart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
    window.location.href = "/";
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));
  };

  return (
    <nav className="shadow-md p-4 ">
      <div className="flex items-center justify-between">
        <img className="w-[130px] h-[36px]" src={logo} alt="Logo" />

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <Link onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between w-full max-w-[1000px] mx-auto px-4">
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-[400px] min-w-[200px]">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="border w-full px-4 py-2 rounded-md pl-10 text-sm"
              />
              <SlMagnifier className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <Link to="/bookmart" className="relative text-sm flex items-center gap-2">
              <CiBookmark size={22} />
              <span className={`absolute -top-2 -right-3 text-white text-xs px-2 py-0.5 rounded-full ${bookmarks.length ? "bg-red-500" : ""}`}>
                {bookmarks.length}
              </span>
            </Link>

            {/* Cart */}
            <Link to="/order" className="relative text-sm" aria-label="Cart">
              <IoCartOutline size={26} />
              <span className={`absolute -top-2 -right-3 text-white text-xs px-2 py-0.5 rounded-full ${cartCount ? "bg-red-500" : ""}`}>
                {cartCount}
              </span>
            </Link>

            {/* Profile / Auth */}
            {user ? (
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <CgProfile size={20} />
                <span>{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 cursor-pointer text-sm font-medium border px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-[#ecf0f1] hover:text-[#bdc3c7]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="flex items-center gap-1 text-sm font-medium border px-3 py-1.5 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                >
                  <CgProfile className="text-lg" />
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-sm font-medium border px-3 py-1.5 rounded-md bg-gradient-to-r from-black to-gray-800 text-white"
                >
                  <CiLogin className="text-lg" />
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border w-full px-4 py-2 rounded-md pl-10 text-sm"
            />
            <SlMagnifier className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Cart */}
          <Link to="/order" className="relative text-sm flex items-center gap-2">
            <IoCartOutline size={22} />
            Cart
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </Link>

          {/* Wishlist */}
          <Link to="/bookmart" className="relative text-sm flex items-center gap-2">
            <CiBookmark size={22} />
            Wishlist
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {bookmarks.length}
            </span>
          </Link>

          {/* Profile / Auth */}
          {user ? (
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <CgProfile size={18} />
              <span>{user.username}</span>
              <button
                onClick={handleLogout}
                className="text-sm py-1.5 px-2 bg-red-500 rounded-md text-white hover:bg-[#ecf0f1] hover:text-[#bdc3c7]"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/signup"
                className="w-[90px] flex items-center gap-1 text-sm font-medium border px-3 py-1.5 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                <CgProfile className="text-base" />
                Signup
              </Link>
              <Link
                to="/login"
                className="w-[90px] flex items-center gap-1 text-sm font-medium border px-3 py-1.5 rounded-md bg-gradient-to-r from-black to-gray-800 text-white"
              >
                <CiLogin className="text-base" />
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
