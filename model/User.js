const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  image: {
    data: {
      type: Buffer,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  notifications: {
    offers: {
      type: Boolean,
      default: true,
    },
    orderStatus: {
      type: Boolean,
      default: true,
    },
    updates: {
      type: Boolean,
      default: true,
    },
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
