import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; // Use Axios to make HTTP requests
import API_URL from "../utils/Api_Url";

const Login = () => {
  const [information, setInformation] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!information.email || !emailRegex.test(information.email)) {
      setError("Please enter a valid email address.");
      toast.error("Invalid email format.");
      return;
    }

    // Password validation
    if (!information.password || information.password.length < 6) {
      setError("Password must be at least 6 characters.");
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // Send login request to backend
      const response = await axios.post(`${API_URL}auth/login`, {
        email: information.email,
        password: information.password,
      });

      const user = response.data.user; // Assuming the response contains the user data
      const token = response.data.token; // Assuming the response contains the JWT token

      if (user && token) {
        // Store the token and user info in localStorage
        localStorage.setItem("token", token); // Store the token
        localStorage.setItem("user", JSON.stringify({
          id: user.id, // Use the correct field here based on backend
          username: user.username || "User", // Assuming the response contains username
          email: user.email,
        }));

        navigate("/"); // Redirect after successful login
        toast.success("Login successful!");
      } else {
        setError("Login failed. Please try again.");
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      setError("Error logging in: " + err.response?.data?.message || err.message);
      toast.error("Error logging in: " + err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[500px] flex justify-center items-center bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-[350px] p-6 bg-white rounded-md shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <input
          type="email"
          name="email"
          value={information.email}
          onChange={handleChange}
          placeholder="Email address"
          className="cursor-pointer p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          value={information.password}
          onChange={handleChange}
          placeholder="Password"
          className="cursor-pointer p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-black cursor-pointer text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <Link
          className="bg-[#dfe6e9] text-black text-center cursor-pointer py-2 rounded-md hover:bg-[#ecf0f1] transition"
          to="/signup"
        >
          Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
