const Modeldish = require("../models/dishes_schema");
const schema = require("../models/schema");

// Admin

async function deleteRes(req, res) {
  try {
    for (const key in req.body) {
      if (key === "token") continue;
      const item = req.body[key];
      if (item.selected === true) {
        await schema.deleteOne({ _id: item._id }); // Assuming each item has an _id field
        await Modeldish.deleteMany({ ph: item.phone }); // Assuming each item has a phone field
      }
    }

    res.status(200).json({ message: "Restaurants deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// add Restaurent

async function addRes(req, res) {
  try {
    const data = new schema({
      name: req.body.name,
      owner: req.body.owner,
      phone: req.body.phone,
    });
    await data.save();
    res.status(200).json("Restaurent added succesfully");
  } catch (error) {
    res.json({ message: error });
  }
}
module.exports = {
  deleteRes,
  addRes,
};
