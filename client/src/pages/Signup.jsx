import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import API_URL from "../utils/Api_Url";

const Signup = () => {
  const [info, setInfo] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = info;
    setLoading(true);

    // 🔍 Validation
    if (!name.trim()) {
      setError("Please enter your full name.");
      toast.error("Name is required.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      toast.error("Invalid email format.");
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      toast.error("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      // Make API call to Node.js backend
      const response = await axios.post(`${API_URL}auth/register`, {
        username: name,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success("Registration successful!");
        setInfo({ name: "", email: "", password: "" }); // Clear input
        navigate("/login");
      }
    } catch (err) {
      toast.error("Error registering: " + err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[500px] flex justify-center items-center bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-[350px] p-6 bg-white rounded-md shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Sign up</h2>

        <input
          type="text"
          name="name"
          value={info.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          value={info.email}
          onChange={handleChange}
          placeholder="Email address"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          value={info.password}
          onChange={handleChange}
          placeholder="Password"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>

        <Link
          to="/"
          className="bg-[#dfe6e9] text-black text-center py-2 rounded-md hover:bg-[#ecf0f1] transition"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default Signup;
