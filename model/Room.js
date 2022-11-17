const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
    required: true,
  },
  capacity: {
    type: Number,
    default: 0,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
    required: true,
  },
  features: Array,
  detail: Array,
});

module.exports = mongoose.model("Room", roomSchema);
