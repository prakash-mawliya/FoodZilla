import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { authService } from "../services/authServices";
const UserProfile = () => {
  const [user, setUser] = useState("");
  const token = authService.getToken();
  const payLoad = jwtDecode(token);
  const phone = payLoad?.ph;
  useEffect(() => {
    axios
      // .get(`http://localhost:8001/api/getAllDishes/${phone}`)
      .get(`https://campus-food-delivery.onrender.com/api/userInfo/${phone}`)
      .then((response) => {
       // console.log("response", response.data);
        setUser(response.data[0]);
        // console.log("User", user);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [phone]);

  return (
    <div className="h-screen flex flex-col text-black justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">User Details</h1>
        <div className="text-lg">
          <p className="mb-2">
            <span className="font-semibold">Name:</span> {user.username}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Role:</span> {user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
