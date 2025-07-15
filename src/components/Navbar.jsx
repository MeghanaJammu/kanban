import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <Link to="/" className="text-xl font-bold tracking-wide">
        🧠 KanbanFlow
      </Link>

      <div className="hidden md:flex items-center space-x-6">
        <Link
          to="/login"
          className="hover:text-gray-200 flex items-center gap-1"
        >
          <FiLogIn />
          Login
        </Link>
        <Link
          to="/register"
          className="hover:text-gray-200 flex items-center gap-1"
        >
          <FiUserPlus />
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
