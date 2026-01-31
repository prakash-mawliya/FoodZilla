const mongoose = require("mongoose");
const DishSchema = new mongoose.Schema({
  ph: {
    required: true,
    type: String,
  },
  dishName: {
    required: true,
    type: String,
  },
  dishPrice: {
    required: true,
    type: Number,
  },
});
module.exports = mongoose.model("ResdishesData", DishSchema);
