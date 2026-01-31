const Model = require("../models/schema");
const Modeldish = require("../models/dishes_schema");
const orderData = require("../models/orderData");
const User = require("../models/userRegistration");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Redis = require("ioredis");

const redisClient = new Redis(process.env.REDIS_URL);
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
async function getRes(req, res) {
  try {
    const { phone } = req.params;
    const restaurent = await redisClient.get(phone);
    if (restaurent) {
      res.json(JSON.parse(restaurent));
    } else {
      const restorentInfo = await Model.find({ phone });
      await redisClient.set(phone, JSON.stringify(restorentInfo), "EX", 1800);
      res.json(restorentInfo);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllUser(req, res) {
  try {
    const Userinfo = await User.find({});
    res.json(Userinfo);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
}

async function getUser(req, res) {
  try {
    const { phone } = req.params;
    const user = await redisClient.get(phone);
    if (user) {
      res.json(JSON.parse(user));
    } else {
      const Userinfo = await User.find({ phone });
      await redisClient.set(phone, JSON.stringify(Userinfo), "EX", 1800);
      res.json(Userinfo);
    }
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
}

async function getAllRes(req, res) {
  try {
    const key = "ami";
    const data = await redisClient.get(key);
    if (data) {
      res.json(JSON.parse(data));
    } else {
      const data = await Model.find({});
      await redisClient.set(key, JSON.stringify(data), "EX", 1800);
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function sendOrder(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const verified = jwt.verify(req.body.token, process.env.TOKEN_KEY);
    for (const key in req.body) {
      if (key === "token") {
        continue;
      }
      const item = req.body[key];
      if (item.selected === true) {
        const data = new orderData({
          dishName: item.dishName,
          dishPrice: item.dishPrice,
          ph: item.ph,
          phr: verified.ph,
          quantity: item.quantity,
        });
        const savedData = await data.save();
        console.log("saved order", savedData);
      }
    }
    res.status(200).json("Order sent successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllDishes(req, res) {
  try {
    const { phone } = req.params;
    const data = await redisClient.get(phone);
    if (data) {
      res.json(JSON.parse(data));
    } else {
      const data = await Modeldish.find({ ph: phone });
      await redisClient.set(phone, JSON.stringify(data), "EX", 1800);
      res.json(data);
    }
  } catch (error) {
    console.log("Error while serving dishes:", error);
    res.status(500).json({ message: error.message });
  }
}

async function getAllOrder(req, res) {
  try {
    const data = await orderData.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getOrderdetails(req, res) {
  try {
    const phone = req.user;
    const data = await orderData.find({ accept: true, phr: phone });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllDishes,
  getAllRes,
  getAllOrder,
  getOrderdetails,
  sendOrder,
  getRes,
  getUser,
  getAllUser,
};
