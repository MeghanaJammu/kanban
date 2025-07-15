import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-indigo-900">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
          className="w-16 mx-auto mb-4"
          alt="login"
        />
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Welcome Back
        </h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
