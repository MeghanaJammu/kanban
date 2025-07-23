import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    navigate("/login");
    Cookies.remove("jwt_token");
  };

  return (
    <nav className="bg-[#16334f] text-[#e2e8f0] px-6 py-3 shadow-md flex justify-between items-center">
      <Link
        to="/"
        className="text-xl flex items-center gap-2 font-bold tracking-wide"
      >
        <video
          src="/kanbanLogo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-10 w-10 rounded-full object-cover"
        />
        <span className="text-xl text-pink-500 font-bold tracking-wide">
          Kanban Lite
        </span>
      </Link>

      <div className="hidden md:flex items-center space-x-6">
        <>
          <span className="text-sm">
            Welcome ,{" "}
            <span className="font-bold text-green-500">
              {user.username.toUpperCase()}
            </span>
          </span>
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 cursor-pointer text-sm font-medium text-red bg-gray-600 hover:bg-pink-900 rounded-md transition duration-200"
          >
            Logout
          </button>
        </>
      </div>
    </nav>
  );
};

export default Navbar;
