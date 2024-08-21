import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const handleLogoutBtn = async () => {
    try {
      await fetch(`${API_URL}/user/logout`, {
        method: "GET",
        credentials: "include",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-slate-900 h-40 text-white shadow-lg">
      <div className="container mx-auto flex justify-center items py-10">
        <h1 className="text-4xl font-bold border-b-4 border-indigo-500 pb-2">
          Classrooms of Elite
        </h1>
        <button
          onClick={handleLogoutBtn}
          type="submit"
          className="inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-xl relative -right-96"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
