const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  kamar: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  cut: {
    type: Number,
    required: true,
  },
  description: String,
  beginDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = new mongoose.model("Discount", DiscountSchema);
