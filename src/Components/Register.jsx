import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleRegisterUser } from "../APIs/usersApi";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="signup-container flex justify-center items-center text-xl">
      <form
        onSubmit={handleRegisterUser}
        className="w-full max-w-[490px] px-8 py-10 rounded-lg shadow-md bg-white"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Register User
        </h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
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
              placeholder="Create password"
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
          <select
            name="role"
            id="role"
            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Choose a role</option>
            <option value="Principal">Principal</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
