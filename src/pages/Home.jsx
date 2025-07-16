import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Board from "../components/Board";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    if (!jwtToken) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Board />
    </div>
  );
};

export default Home;
