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
  description: String,
  // image: {
  //   fileName: {
  //     type: String,
  //     required: true,
  //   },
  //   file: {
  //     type: Buffer,
  //     required: true,
  //   },
  // },
  features: {
    ac: {
      type: Boolean,
      default: false,
    },
    kmandi: {
      type: String,
      default: "luar",
    },
    capacity: {
      type: Number,
      default: 1,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model("Room", roomSchema);
