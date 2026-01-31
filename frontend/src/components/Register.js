import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authServices";
const Register = () => {
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://campus-food-delivery.onrender.com/api/signup",
        {
          username,
          email,
          phone,
          password,
          role,
        }
      );
      // console.log("Successfully registered");
      const user = response.data.user.role;
      const token = response.data.token;
      const userid = response.data.user.phone;
      toast.info("User Registered Successfully");
      if (token) {
        authService.setToken(token);
        if (user === "admin") {
          navigate("/admin");
        } else if (user === "user") {
          navigate("/Restorent");
        } else if (user === "owner") {
          navigate(`/ResDetails/${userid}`);
        }
      } else {
        toast.error("User Not Registered");
      }
    } catch (error) {
      toast.error("User Not Registered");
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center mt-16">
      <h1 className="text-4xl mb-8">User Registration Portal</h1>
      <div className="bg-slate-700 p-6 rounded-lg shadow-md w-80">
        {/* Name input */}
        <label className="block mb-2 text-white">Name:</label>
        <input
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Phone input */}
        <label className="block mb-2 text-white">Phone:</label>
        <input
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {/* Email input */}
        <label className="block mb-2 text-white">Email:</label>
        <input
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Password input */}
        <label className="block mb-2 text-white">Password:</label>
        <input
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Role select */}
        <label className="block mb-2 text-white">Role:</label>
        <select
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" disabled>
            Select your role
          </option>
          <option value="owner">Owner</option>
          <option value="user">User</option>
        </select>
        {/* Register button */}
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRegister}
        >
          Register
        </button>
        {/* Login link */}
        <Link
          to="/Login"
          className="mt-4 block text-center text-blue-500 underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
