import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios
import OrderStatus from "./OrderStatus";
import { authService } from "../services/authServices";
import UserOrderStatus from "./UserOrderstatus";
const Foodlist = () => {
  const { phone } = useParams();
  const [foodlist, setFoodlist] = useState([]);
  const [data, setData] = useState([]);
 // console.log("phone number of restaurant is ", phone);
  // console.log("food list is ", foodlist);

  useEffect(() => {
    // Use Axios for fetching data
    axios
      // .get(`http://localhost:8001/api/getAllDishes/${phone}`)
      .get(`https://campus-food-delivery.onrender.com/api/getAllDishes/${phone}`)
      .then((response) => {
        setData(response.data);
       // console.log("Response from ", response.data);
        const initializedFoodlist = response.data.map((item) => ({
          ...item,
          selected: false,
        }));
        setFoodlist(initializedFoodlist);
       // console.log("food list is now after setting ", foodlist);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [phone]);

  const handleQuantityChange = (index, quantity) => {
    const updatedFoodlist = [...foodlist];
    updatedFoodlist[index].quantity = quantity;
    setFoodlist(updatedFoodlist);
  };

  const handleDishSelection = (index) => {
    const updatedFoodlist = [...foodlist];
    updatedFoodlist[index].selected = !updatedFoodlist[index].selected;
    //console.log(updatedFoodlist);
    setFoodlist(updatedFoodlist);
  };

  const handlePlaceOrder = async () => {
    try {
      const selectedItems = foodlist.filter((item) => item.selected);
      const token = authService.getToken();
      const data = {
        ...selectedItems,
        token,
      };
      // Stringify the data and set the Content-Type header
      // const requestData = JSON.stringify(selectedItems);
      // console.log("Data for backend :", data);
      // Use Axios for the POST request with proper headers
      const response = await axios.post(
        "https://campus-food-delivery.onrender.com/api/sendOrder",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("response :", response);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="mt-20">
      <h1 className="text-2xl mb-4">Restaurant's Menu</h1>
      <table className="w-full mb-4">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="p-2">Dish Name</th>
            <th className="p-2">Dish Price</th>
            <th className="p-2">Contact Info</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Select</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="border-b">
              <td className="p-2">{item.dishName}</td>
              <td className="p-2">{item.dishPrice}</td>
              <td className="p-2">{item.ph}</td>
              <td className="p-2">
                <input
                  
                  type="number"
                  value={foodlist[index].quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, e.currentTarget.value)
                  }
                  className="w-20 p-1 text-black border"
                />
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleDishSelection(index)}
                  className={`bg-blue-500 text-white text-black px-2 py-1 rounded ${
                    foodlist[index].selected ? "bg-red-500" : ""
                  }`}
                >
                  {foodlist[index].selected ? "Unselect" : "Select"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handlePlaceOrder}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Place order
      </button>
      {/* <OrderStatus/>  */}
    </div>
  );
};

export default Foodlist;
