const User = require("../models/userRegistration");
const bcrypt = require("bcryptjs");
const createSecretToken = require("./cookies");

// auth
async function verifyUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id, user.role, user.name, user.phone);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.status(200).json({ user, token });
    // res.json(token);
    // console.log(user);
  } catch (error) {
    return res.json(error);
  }
}
// signup
async function signup(req, res) {
  try {
    const { email, password, username, phone, role } = req.body;
    //console.log("data:", req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({
      email,
      password,
      username,
      phone,
      role,
    });
    //console.log("role", user.role);
    const token = createSecretToken(
      user._id,
      user.role,
      user.username,
      user.phone
    );
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id, user.role, user.name, user.phone);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.status(200).json({ user, token });
    // res.json(token);
    //console.log(user);
  } catch (error) {
    return res.json(error);
  }
}

module.exports = {
  signup,
  login,
  verifyUser,
};
