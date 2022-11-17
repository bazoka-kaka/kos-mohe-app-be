const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  people: {
    type: Number,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
  detail: {
    type: Array,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);
