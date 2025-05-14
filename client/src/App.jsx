import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Allproducts from "./components/Allproducts";
import Bookmark from "./components/Bookmark";
import Order from "./components/Order";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/allproducts" element={<Allproducts />} />

        <Route path="/bookmart" element={<Bookmark />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
