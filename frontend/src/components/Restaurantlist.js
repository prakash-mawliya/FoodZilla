import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import res1 from "../images/res1.jpg";
import UserOrderStatus from "./UserOrderstatus";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get("https://campus-food-delivery.onrender.com/api/getAllRes")
      .then((response) => setRestaurants(response.data))
      .catch((error) =>
        console.error("Error fetching restaurant data:", error)
      );
  }, []);

  const handleRestaurantClick = (phone) => {
    window.location.href = `/Foodlist/${phone}`;
  };
  const handelMyorders = () => {
    window.location.href = "/userOrders";
  };
  return (
    <div className="bg-black text-white py-10 px-4 md:px-10 lg:px-20 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-6">Restaurants Nearby</h1>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handelMyorders}>
          My Orders
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            onClick={() => handleRestaurantClick(restaurant.phone)}
          >
            <div className="relative">
              <img
                src={res1}
                // src={restaurant.photoUrl}
                alt={restaurant.name}
                className="w-full h-48 object-cover object-center"
              />
              <div className="absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <Link
                  to={`/Foodlist/${restaurant.phone}`}
                  className="text-white text-lg font-semibold hover:text-blue-500"
                >
                  View Menu
                </Link>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-white mb-2">
                {restaurant.name}
              </h2>
              <p className="text-gray-400">{restaurant.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
