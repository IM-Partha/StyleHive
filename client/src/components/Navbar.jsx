import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { CiLogin, CiBookmark } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { SlMagnifier } from "react-icons/sl";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, selectSearchQuery } from "../redux/searchSlice";
import { selectBookmarks } from "../redux/bookmarkSlice";
import { selectCart } from "../redux/cartSlice";

const Navbar = () => {
  const Menu = [
    { id: 1, name: "What's New", link: "/#" },
    { id: 2, name: "Top Rated", link: "/#services" },
    { id: 3, name: "Kids Wear", link: "/#" },
    { id: 4, name: "Mens Wear", link: "/#" },
    { id: 5, name: "Skin", link: "/#" },
    { id: 6, name: "Hair", link: "/#" },
    { id: 7, name: "Makeup", link: "/#" },
    { id: 8, name: "Minis", link: "/#" },
    { id: 9, name: "Gifts", link: "/#" },
    { id: 10, name: "Wellness", link: "/#" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const searchQuery = useSelector(selectSearchQuery);
  const bookmarks = useSelector(selectBookmarks);
  const cartItems = useSelector(selectCart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <nav className="shadow-md bg-white sticky top-0 z-50">
      {/* --- Top Navbar --- */}
      <div className="flex items-center justify-between px-4 md:px-10 py-3">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="font-extrabold text-lg text-gray-800">StyleHive</span>
        </Link>

        {/* Quick Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="#">Brands</Link>
          <Link to="#">Offers</Link>
          <Link to="#">Top Shelf</Link>
          <Link to="#">For You</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <HiX size={26} /> : <HiOutlineMenu size={26} />}
          </button>
        </div>

        {/* Right Side Icons (Desktop) */}
        <div className="hidden md:flex items-center gap-5">
          {/* Search */}
          <div className="relative">
            <SlMagnifier className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Wishlist */}
          <Link to="/bookmark" className="relative">
            <CiBookmark size={24} />
            {bookmarks.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {bookmarks.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/order" className="relative">
            <IoCartOutline size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-3">
              <CgProfile size={20} />
              <span className="capitalize">{user.username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/signup"
                className="flex items-center gap-1 px-4 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                <CgProfile /> Signup
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-1 px-4 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                <CiLogin /> Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {isMenuOpen && (
        <div className="flex flex-col gap-4 px-4 pb-4 md:hidden border-t bg-gray-50">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border px-3 py-2 rounded-md mt-3"
          />
          <Link to="/bookmark" className="flex items-center gap-2 relative">
            <CiBookmark size={22} /> Wishlist
            {bookmarks.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {bookmarks.length}
              </span>
            )}
          </Link>
          <Link to="/order" className="flex items-center gap-2 relative">
            <IoCartOutline size={22} /> Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/signup"
                className="flex-1 bg-purple-600 text-white py-2 rounded-md text-center hover:bg-purple-700"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="flex-1 bg-gray-800 text-white py-2 rounded-md text-center hover:bg-gray-700"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}

     {/* --- Lower Menu --- */}
<div className="bg-gray-100 shadow-inner">
  <div
    className="
      max-w-[1200px] mx-auto 
      flex justify-center gap-6 py-3 
      overflow-x-auto scrollbar-hide
      px-3 sm:px-6
    "
  >
    {Menu.map((item) => (
      <Link
        key={item.id}
        to={item.link}
        className="flex-shrink-0 text-gray-700 text-[15px] hover:text-purple-600 transition-colors"
      >
        {item.name}
      </Link>
    ))}
  </div>
</div>

    </nav>
  );
};

export default Navbar;
