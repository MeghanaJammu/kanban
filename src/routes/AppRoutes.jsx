import React, { lazy, Suspense } from "react"; // Import lazy and Suspense
import { Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";

// Lazily importing each page component
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Board = lazy(() => import("../components/Board"));

const AppRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/board/:boardId" element={<Board />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
