import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: name,
        });
      }
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
      toast.success("User Registered Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-md w-full max-w-md text-[#e2e8f0] border border-[#334155]">
        <div className="text-xl flex flex-col justify-center items-center gap-2 font-bold tracking-wide mb-6">
          <video
            src="/kanbanLogo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-20 w-20 rounded-full object-cover"
          />
          <span className="text-xl text-pink-700 font-bold tracking-wide">
            Kanban Lite
          </span>
        </div>
        <h2 className="text-xl font-semibold text-center mb-6 text-white">
          Create A New Account
        </h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-pink-500"
          />
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-pink-500"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-pink-500"
          />
          <button
            type="submit"
            className="w-full cursor-pointer bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
