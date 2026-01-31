import { useState, useEffect } from "react";
import axios from "axios";
import { authService } from "../services/authServices";

const OrderStatus = () => {
  const [foodlist, setFoodlist] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    Orders();
  }, []);

  const Orders = async () => {
    const token = authService.getToken();
    axios
      .get("https://campus-food-delivery.onrender.com/api/ResOrder", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        const initializedFoodlist = response.data.map((item) => ({
          _id: item._id,
          dishName: item.dishName,
          quantity: item.quantity,
          price: item.dishPrice * item.quantity,
          ph: item.ph,
          accept: false, // Add accept field for handling dish acceptance
        }));
        setFoodlist(initializedFoodlist);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDishAccept = (index) => {
    const updatedFoodlist = [...foodlist];
    updatedFoodlist[index].accept = !updatedFoodlist[index].accept;
    setFoodlist(updatedFoodlist);
  };
 
  
  const handleOrder = async () => {
    try {
      const token = authService.getToken();
      const data = {
        foodlist,
        token,
      };
      const response = await axios.post(
        "https://campus-food-delivery.onrender.com/api/updateOrder",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
     // console.log("order confirmed", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container mx-auto mt-20 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Order List</h1>
      <table className="w-full mb-6 border-collapse bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-700">Dish Name</th>
            <th className="px-4 py-2 border border-gray-700">Price</th>
            <th className="px-4 py-2 border border-gray-700">Contact Info</th>
            <th className="px-4 py-2 border border-gray-700">Quantity</th>
            <th className="px-4 py-2 border border-gray-700">Select</th>
          </tr>
        </thead>
        <tbody>
          {foodlist.map((item, index) => (
            <tr key={item._id} className="hover:bg-gray-700">
              <td className="border border-gray-700 px-4 py-2">{item.dishName}</td>
              <td className="border border-gray-700 px-4 py-2">{item.price}</td>
              <td className="border border-gray-700 px-4 py-2">{item.ph}</td>
              <td className="border border-gray-700 px-4 py-2">{item.quantity}</td>
              <td className="border border-gray-700 px-4 py-2">
                <button
                  className={`${
                    foodlist[index].accept ? "bg-red-500" : "bg-blue-500"
                  } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                  onClick={() => handleDishAccept(index)}
                >
                  {foodlist[index].accept ? "Reject" : "Accept"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleOrder}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default OrderStatus;
