const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  room_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    mimetype: String,
    filename: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  begin_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
    default: false,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Order", orderSchema);
