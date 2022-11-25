const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationModel = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Notification", NotificationModel);
