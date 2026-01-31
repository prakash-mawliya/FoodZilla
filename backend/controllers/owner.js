const Modeldish = require("../models/dishes_schema");
const orderData = require("../models/orderData");

async function getOrderResdetails(req, res) {
  try {
    const phone = req.user;
    //console.log("phone in getorder", phone);
    const data = await orderData.find({ accept: false, ph: phone });
    //console.log("get data:", data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "error in phone" });
  }
}

// Order
async function updateOrder(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // const { input } = req.query;
    for (const key in req.body.foodlist) {
      const item = req.body.foodlist[key];
      //console.log("items", item);
      const response = await orderData.updateOne(
        { _id: item._id },
        {
          $set: {
            accept: item.accept,
          },
        }
      );
    }
    //console.log("finally update", req.body);
    res.json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteDish(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Assuming req.body is an array of items
    //console.log(req.body);
    for (const key in req.body) {
      if (key === "token") continue;
      const item = req.body[key];
     // console.log("delete", item);
      if (item.selected === true) {
        await Modeldish.deleteOne({ _id: item._id }); // Assuming each item has an _id field
      }
    }
    res.status(200).json({ message: "Dishes deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function addDish(req, res) {
  const data = new Modeldish({
    dishName: req.body.dishName,
    dishPrice: req.body.dishPrice,
    ph: req.body.ph,
  });
  await data.save();
  res.status(200).json("Dish added succesfully");
}

module.exports = {
  updateOrder,
  getOrderResdetails,
  deleteDish,
  addDish,
};
