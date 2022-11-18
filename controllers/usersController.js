const User = require("../model/User");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
};

const updateUser = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No user matches ID ${req.params.id}.` });
  }
  if (req.body?.fullname) user.fullname = req.body.fullname;
  if (req.body?.offers !== null) user.notifications.offers = req.body.offers;
  if (req.body?.orderStatus !== null)
    user.notifications.orderStatus = req.body.orderStatus;
  if (req.body?.updates !== null) user.notifications.updates = req.body.updates;
  if (req.body?.email) {
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: req.body.email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict
    user.email = req.body.email;
  }
  if (req.body?.pwd) {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(req.body.pwd, 10);
    user.password = hashedPwd;
  }
  console.log(req.body, user.notifications);
  const result = await user.save();
  res.json(result);
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
};
