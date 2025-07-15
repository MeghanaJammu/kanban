import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register"];

  return (
    <div>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <AppRoutes />
    </div>
  );
};

export default App;
