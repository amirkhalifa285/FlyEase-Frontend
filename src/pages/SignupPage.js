import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Add this
import api from "../api";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Add this

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signup", {
        username,
        email,
        password,
        role: "traveler",
      });

      const { access_token: token, username: responseUsername, role } = response.data;

      // Save token and update auth state
      localStorage.setItem("token", token);
      login({ username: responseUsername, role, token });

      navigate("/userinterface"); // Use lowercase consistently
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.detail || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="h-screen md:flex">
      {/* Left Section */}
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
        <div>
          <img
            src="/logo.jpeg"
            alt="FlyEase Logo"
            className="h-32 w-32 object-contain mx-auto mb-4"
          />
          <h1 className="text-white font-bold text-4xl font-sans">Welcome to FlyEase</h1>
          <p className="text-white mt-1">Your seamless travel companion</p>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>

      {/* Right Section */}
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white w-full max-w-md" onSubmit={handleSignup}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Create an Account</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Join FlyEase today!</p>

          {/* Username Field */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none w-full"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.94 6.94A1.5 1.5 0 004.5 6h11a1.5 1.5 0 011.56.94l-7.06 4.72a.5.5 0 01-.5 0L2.94 6.94z" />
              <path d="M2 8.4v5.1A1.5 1.5 0 003.5 15h11a1.5 1.5 0 001.5-1.5V8.4l-6.56 4.38a2.5 2.5 0 01-2.88 0L2 8.4z" />
            </svg>
            <input
              className="pl-2 outline-none border-none w-full"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-indigo-700"
          >
            Sign Up
          </button>

          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Already have an account? <a href="/login">Log in</a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
