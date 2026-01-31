import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Dishes = () => {
    const [quantities, setQuantities] = useState([1, 1, 1, 1, 1]);
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate(); // Get access to navigation using useNavigate

    const handleSelect = (dishName, index) => {
        // Your existing code for selecting/unselecting items
        setSelectedItems([...selectedItems, dishName]);
        toast.success(`${dishName} selected.`, {
            autoClose: 500,
          });
    };

    const handleQuantityChange = (index, event) => {
        const newQuantities = [...quantities];
        newQuantities[index] = event.target.value;
        setQuantities(newQuantities);
    };

    const handleQuantityIncrease = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index]++;
        setQuantities(newQuantities);
    };

    const handleQuantityDecrease = (index) => {
        const newQuantities = [...quantities];
        if (newQuantities[index] > 1) {
            newQuantities[index]--;
            setQuantities(newQuantities);
        }
    };

    const handlePlaceOrder = () => {
        toast.error('Please log in or sign up before placing the order.');
        // Navigate to the register page after 3 seconds
        setTimeout(() => {
            navigate('/register'); // Adjust the path as needed
        }, 3000); // 3000 milliseconds = 3 seconds
    };

    const dishes = [
        { name: 'Mango', price: 900, contact: '90293' },
        { name: 'Apple', price: 500, contact: '90294' },
        { name: 'Banana', price: 300, contact: '90295' },
        { name: 'Grapes', price: 400, contact: '90296' },
        { name: 'Orange', price: 600, contact: '90297' },
    ];

    return (
        <div className="container mx-auto mt-20 p-6 text-white">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-6">Restaurant's List</h1>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="border border-gray-600 px-4 py-2">Name</th>
                        <th className="border border-gray-600 px-4 py-2">Price</th>
                        <th className="border border-gray-600 px-4 py-2">Contact</th>
                        <th className="border border-gray-600 px-4 py-2">Quantity</th>
                        <th className="border border-gray-600 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dishes.map((dish, index) => (
                        <tr key={index} className="bg-gray-200 text-gray-800">
                            <td className="border border-gray-600 px-4 py-2">{dish.name}</td>
                            <td className="border border-gray-600 px-4 py-2">{dish.price}</td>
                            <td className="border border-gray-600 px-4 py-2">{dish.contact}</td>
                            <td className="border border-gray-600 px-4 py-2">
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={quantities[index]}
                                    onChange={(event) => handleQuantityChange(index, event)}
                                    className="w-12 text-center"
                                />
                                <button
                                    className="px-2"
                                    onClick={() => handleQuantityIncrease(index)}
                                >
                                    +
                                </button>
                                <button
                                    className="px-2"
                                    onClick={() => handleQuantityDecrease(index)}
                                >
                                    -
                                </button>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={() => handleSelect(dish.name, index)}
                                >
                                    Select
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handlePlaceOrder}
            >
                Place Order
            </button>
        </div>
    );
}

export default Dishes;
