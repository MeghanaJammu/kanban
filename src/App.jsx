import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register"];

  return (
    <div className="bg-[#0f172a] text-[#e2e8f0] min-h-screen">
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <AppRoutes />
    </div>
  );
};

export default App;
