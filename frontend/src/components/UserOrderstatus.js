import { useState, useEffect } from "react";
import axios from "axios";
import { authService } from "../services/authServices";
const UserOrderStatus = () => {
  const [foodlist, setFoodlist] = useState([]);
  const [data, setData] = useState([]);
  const [RestName, setRestName] = useState("");
  useEffect(() => {
    // Use Axios for fetching data
    Orders();
  }, []);
  const Orders = async () => {
    const token = authService.getToken();
    //console.log("Token for user is ", token);
    axios
      .get("https://campus-food-delivery.onrender.com/api/userOrder", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
       // console.log("User Order Data ", response);
        const initializedFoodlist = response.data.map((item) => ({
          _id: item._id,
          dishName: item.dishName,
          quantity: item.quantity,
          price: item.dishPrice,
          userid: item.ph,
        }));
        setFoodlist(initializedFoodlist);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className="container mx-auto mt-20 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Order List</h1>
      <table className="w-full mb-6 border-collapse bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-700">Dish Name</th>
            <th className="px-4 py-2 border border-gray-700">Quantity</th>
            <th className="px-4 py-2 border border-gray-700">Dish Price</th>
            <th className="px-4 py-2 border border-gray-700">Delivery Info</th>
          </tr>
        </thead>
        <tbody>
          {foodlist.map((item, index) => (
            <tr key={item._id} className="hover:bg-gray-700">
              <td className="border border-gray-700 px-4 py-2">
                {item.dishName}
              </td>
              <td className="border border-gray-700 px-4 py-2">
                {item.quantity}
              </td>
              <td className="border border-gray-700 px-4 py-2">
                {item.price * item.quantity}
              </td>
              <td className="border border-gray-700 px-4 py-2">
                Item will be delivered in the next 30 minutes.
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrderStatus;
