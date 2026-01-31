const User = require("../models/userRegistration");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyadmin = (req, res, next) => {
  const token = req.body.token;
  //if (token) token = req.token;
  console.log("token:", token);
  if (!token) {
    return res.json("not found");
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    //console.log(req);
    console.log("check admin or not ", verified);
    req.user = verified;
    if (verified.role == "admin") {
      console.log("admin Dashboard");
      next();
    } else {
      res.status(401).json("not a authorised user");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json("error occured");
  }
};
const verifyowner = (req, res, next) => {
  const token = req.body.token;
  const authHeader = req.headers["authorization"];
  const token1 = authHeader && authHeader.split(" ")[1];
  console.log("auth header:", authHeader);
  if (!token && !token1) {
    console.log("token:", token);
    console.log("token1:", token1);
    return res.json("token not matched", token, token1);
  }
  try {
    if (token) {
      const verified = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = verified;
      if (verified.role == "owner") {
        console.log("Owner Dashboard");
        next();
      } else {
        res.status(401).json("not a authorised user");
      }
    } else {
      const verified = jwt.verify(token1, process.env.TOKEN_KEY);
      req.user = verified;
      if (verified.role == "owner") {
        console.log("Owner Dashboard");
        console.log("owner details", verified.ph);
        req.user = verified.ph;
        next();
      } else {
        res.status(401).json("not a authorised user");
      }
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
const verifyuser = (req, res, next) => {
  const token = req.body.token;
  const authHeader = req.headers["authorization"];
  const token1 = authHeader && authHeader.split(" ")[1];
  console.log("token:", token);
  console.log("token1:", token1);
  

  if (!token && !token1) {
   
    console.log("token:", token);
    console.log("token1:", token1);
    return res.json("token not matched", token, token1);
  }
  try {
    if (token) {
      const verified = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = verified;
      if (verified.role == "user") {
        console.log("User Dashboard");
        next();
      } else {
        res.status(401).json("not a authorised user");
      }
    } else {
      const verified = jwt.verify(token1, process.env.TOKEN_KEY);
      req.user = verified;
      if (verified.role == "user") {
        console.log("User Dashboard");
        console.log("User details", verified.ph);
        req.user = verified.ph;
        next();
      } else {
        res.status(401).json("not a authorised user");
      }
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = { verifyadmin, verifyowner, verifyuser };
