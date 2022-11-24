const User = require("../model/User");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

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
  if (req.body?.phone) user.phone = req.body.phone;
  if (req.body?.offers !== null && req.body?.offers !== undefined)
    user.notifications.offers = req.body.offers;
  if (req.body?.orderStatus !== null && req.body?.orderStatus !== undefined)
    user.notifications.orderStatus = req.body.orderStatus;
  if (req.body?.updates !== null && req.body?.updates !== undefined)
    user.notifications.updates = req.body.updates;
  if (req.body?.email) {
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: req.body.email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict
    user.email = req.body.email;
  }
  if (req.body?.pwd && req.body?.oldPwd) {
    // check the old password
    const match = await bcrypt.compare(req.body.oldPwd, user.password);
    if (!match) {
      console.log("incorrect old password");
      return res.sendStatus(401);
    }
    //encrypt the password
    const hashedPwd = await bcrypt.hash(req.body.pwd, 10);
    user.password = hashedPwd;
  }
  console.log(req.body, user.notifications);
  const result = await user.save();
  res.json(result);
};

const getUserImage = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required." });

  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No user matches ID ${req.params.id}.` });
  }
  const b64 = Buffer.from(user.image.data, "base64");
  const mimetype = user.image.mimetype;
  if (
    !fs.existsSync(
      path.join(
        __dirname,
        "..",
        "public",
        "img",
        "uploads",
        user.image.filename
      )
    )
  ) {
    fs.writeFileSync(
      path.join(
        __dirname,
        "..",
        "public",
        "img",
        "uploads",
        user.image.filename
      ),
      b64
    );
  }
  const content = fs.readFileSync(
    path.join(__dirname, "..", "public", "img", "uploads", user.image.filename)
  );

  res.writeHead(200, { "Content-Type": mimetype });
  res.end(content, "utf-8");
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  getUserImage,
  updateUser,
};
