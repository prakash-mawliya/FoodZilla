const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  dishName: {
    required: true,
    type: String,
  },
  dishPrice: {
    required: true,
    type: Number,
  },
  ph: {
    required: true,
    type: String,
  },
  phr: {
    required: true,
    type: String,
  },
  quantity: {
    required: true,
    type: Number,
  },
  accept: {
    default: false,
    type: Boolean,
  },
  delivered: {
    default: false,
    type: Boolean,
  },
});
module.exports = mongoose.model("OrderedData", OrderSchema);
