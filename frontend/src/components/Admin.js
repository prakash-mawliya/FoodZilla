import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { authService } from "../services/authServices";

const Admin = () => {
  const [foodlist, setFoodlist] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getAllrestaurent();
  }, []);

  const handleResSelection = (index) => {
    const updatedFoodlist = [...foodlist];
    updatedFoodlist[index].selected = !updatedFoodlist[index].selected;
    setFoodlist(updatedFoodlist);
  };

  const getAllrestaurent = async () => {
    axios
      .get("https://campus-food-delivery.onrender.com/api/getAllRes")
      .then((response) => {
        setData(response.data);
        const initializedFoodlist = response.data.map((item) => ({
          ...item,
          selected: false,
        }));
        setFoodlist(initializedFoodlist);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDeleteRes = async () => {
    try {
      const selectedItems = foodlist.filter((item) => item.selected);
      const token = authService.getToken();
      const data = {
        ...selectedItems,
        token,
      };
      //console.log("Data from frontend :", data);

      const response = await axios.post(
        "https://campus-food-delivery.onrender.com/api/deleteRes",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //console.log("response from backend :", response);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = authService.getToken();
      const response = await axios.post(
        "https://campus-food-delivery.onrender.com/api/addRes",
        {
          name,
          owner,
          phone,
          token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response from backend", response);
    } catch (error) {
      console.error("Error adding restaurant:", error);
    }
  };

  return (
    <div className="container mx-auto mt-20 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Restaurant's List</h1>
      <table className="w-full mb-6 border-collapse bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-700">
              Restaurant Name
            </th>
            <th className="px-4 py-2 border border-gray-700">Owner Name</th>
            <th className="px-4 py-2 border border-gray-700">Phone No</th>
            <th className="px-4 py-2 border border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id} className="hover:bg-gray-700">
              <td className="border border-gray-700 px-4 py-2">{item.name}</td>
              <td className="border border-gray-700 px-4 py-2">{item.owner}</td>
              <td className="border border-gray-700 px-4 py-2">{item.phone}</td>
              <td className="border border-gray-700 px-4 py-2">
                <button
                  className={`${
                    foodlist[index].selected ? "bg-red-500" : "bg-blue-500"
                  } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                  onClick={() => handleResSelection(index)}
                >
                  {foodlist[index].selected ? "Unselect" : "Select"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDeleteRes}
      >
        Delete Res
      </button>
      <form onSubmit={handelSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Restaurant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-400 p-2 w-full bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="Owner Name"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="border border-gray-400 p-2 w-full bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="Phone No"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-400 p-2 w-full bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add Res
        </button>
      </form>
    </div>
  );
};

export default Admin;
