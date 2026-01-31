import React from "react";
import homephoto from "../images/pexels-chanwalrus-958545.jpg";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authServices";
const HomePage = () => {
  const isLoggedIn = authService.isLoggedIn();
  const role = authService.getUserRole();
  console.log("role", role);
  const navigate = useNavigate();
  const getRedirectPath = () => {
    if (!isLoggedIn) navigate("/menu");
    switch (role) {
      case "user":
        navigate("/Restorent");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "owner":
        navigate("/Orders");
        break;
      default:
        navigate("/menu");
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url(${homephoto})` }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to <span style={{ color: "rgb(246, 133, 59)" }}>Fo</span>
          odZilla
        </h1>
        <p className="text-2xl mb-8">
          Explore our delicious menu and enjoy great discounts.
        </p>
        <button
          onClick={getRedirectPath}
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default HomePage;
