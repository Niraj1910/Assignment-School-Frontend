import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleUserLogin } from "../APIs/usersApi";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <section className="signup-container bg-gradient-to-r from-slate-900 to-purple-900 h-screen flex justify-center items-center text-xl">
      <form
        onSubmit={handleUserLogin}
        className="w-full max-w-md px-8 py-10 rounded-lg shadow-md bg-white absolute top-[33%]"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Sign In</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Login;
