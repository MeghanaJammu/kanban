import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-md w-full max-w-md text-[#e2e8f0] border border-[#334155]">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5087/5087580.png"
          className="w-16 mx-auto mb-4"
          alt="register"
        />
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Create Account
        </h2>
        <form>
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-pink-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-pink-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-pink-500"
          />
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-pink-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
