import React, { lazy, Suspense } from "react"; // to impove performace of app,imports lazy and Suspense
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";

// Converting the static import to a lazy import
const AppRoutes = lazy(() => import("./routes/AppRoutes"));

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register"];

  return (
    <div className="bg-[#0f172a] text-[#e2e8f0] min-h-screen">
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>

      <ToastContainer />
    </div>
  );
};

export default App;
