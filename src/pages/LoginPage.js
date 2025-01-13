import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const { role, token } = response.data;

      // Save token for future authenticated requests
      localStorage.setItem("token", token);

      // Redirect based on role
      if (role === "admin") {
        navigate("/AdminHomePage");
      } else if (role === "traveler") {
        navigate("/UserInterface");
      } else {
        alert("Unknown role. Please contact support.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid username or password");
    }
  };

  return (
    <div className="font-mono bg-gradient-to-tr from-purple-700 to-blue-500 h-screen flex justify-center items-center">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          {/* Left Image Section */}
          <div
            className="w-full xl:w-3/4 lg:w-11/12 flex"
          >
            <div
              className="w-full h-auto hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{ backgroundImage: `url('/logo.jpeg')` }}
            ></div>

            {/* Form Section */}
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center text-gray-800 font-bold">
                Welcome Back!
              </h3>
              <form onSubmit={handleLogin} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white rounded-full bg-gradient-to-tr from-purple-700 to-blue-500 hover:from-blue-500 hover:to-purple-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="/signup"
                  >
                    Create an Account!
                  </a>
                </div>
                <div className="text-center">
                  <button
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    onClick={() => alert("Forgot Password functionality not yet implemented.")}
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
