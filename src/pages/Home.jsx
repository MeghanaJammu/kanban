import React from "react";
import Board from "../components/Board";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="bg-white shadow p-4 text-2xl font-bold text-blue-700">
        🧠 My Kanban Board
      </header>
      <Board />
    </div>
  );
};

export default Home;
