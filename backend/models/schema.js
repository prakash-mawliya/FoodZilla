const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  owner: {
    required: true, 
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
});
module.exports = mongoose.model("ResData", restaurantSchema);
