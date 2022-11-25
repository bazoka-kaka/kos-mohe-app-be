const Notification = require("../model/Notification");

const getAllNotifications = async (req, res) => {
  const notifications = await Notification.find();
  if (!notifications)
    return res.status(204).json({ message: "No notification found." });
  res.json(notifications);
};

const getAllUserNotifications = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Notification ID required." });
  const notifications = await Notification.find({ user_id: req.params.id });
  if (!notifications)
    return res.status(204).json({ message: "No notification found." });
  res.json(notifications);
};

const createNewNotification = async (req, res) => {
  if (
    !req?.body?.user_id ||
    !req?.body?.title ||
    !req?.body?.description ||
    !req?.body?.link
  ) {
    return res
      .status(400)
      .json({ message: "user_id, title, description, and link are required" });
  }

  try {
    const result = await Notification.create({
      user_id: req.body.user_id,
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const deleteNotification = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Notification ID required." });

  const notification = await Notification.findOne({ _id: req.body.id }).exec();
  if (!notification) {
    return res
      .status(204)
      .json({ message: `No notification matches ID ${req.body.id}.` });
  }
  const result = await notification.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

module.exports = {
  getAllNotifications,
  getAllUserNotifications,
  createNewNotification,
  deleteNotification,
};
