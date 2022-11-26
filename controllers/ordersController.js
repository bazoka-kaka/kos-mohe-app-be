const Order = require("../model/Order");
const fs = require("fs");
const path = require("path");

const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  if (!orders) return res.status(204).json({ message: "No orders found." });
  res.json(orders);
};

const createNewOrder = async (req, res) => {
  if (
    !req?.body?.name ||
    !req?.body?.user_id ||
    !req?.body?.room_id ||
    !req?.body?.duration ||
    !req?.body?.total_price ||
    !req?.body?.begin_date ||
    !req?.body?.end_date
  ) {
    return res.status(400).json({
      message:
        "Name, user_id, room_id, duration, total_price, begin_date, end_date are required",
    });
  }

  try {
    const result = await Order.create({
      name: req.body.name,
      user_id: req.body.user_id,
      room_id: req.body.room_id,
      duration: req.body.duration,
      total_price: req.body.total_price,
      begin_date: req.body.begin_date,
      end_date: req.body.end_date,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateOrder = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const order = await Order.findOne({ _id: req.body.id }).exec();
  if (!order) {
    return res
      .status(204)
      .json({ message: `No order matches ID ${req.body.id}.` });
  }
  if (req?.file) {
    order.image.data = fs.readFileSync(
      path.join(__dirname, "..", "public", "img", "uploads", req.file.filename)
    );
    order.image.filename = req.file.filename;
    order.image.mimetype = req.file.mimetype;
  }
  if (req.body?.name) order.name = req.body.name;
  if (req.body?.user_id) order.user_id = req.body.user_id;
  if (req.body?.room_id) order.room_id = req.body.room_id;
  if (req.body?.total_price) order.total_price = req.body.total_price;
  if (req.body?.duration) order.duration = req.body.duration;
  if (req.body?.begin_date) order.begin_date = req.body.begin_date;
  if (req.body?.end_date) order.end_date = req.body.end_date;
  if (req.body?.paid) order.paid = req.body.paid;
  if (req.body?.verified) order.verified = req.body.verified;
  const result = await order.save();
  res.json(result);
};

const verifyOrder = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const order = await Order.findOne({ _id: req.body.id }).exec();
  if (!order) {
    return res
      .status(204)
      .json({ message: `No order matches ID ${req.body.id}.` });
  }
  order.verified = true;
  const result = await order.save();
  res.json(result);
};

const deleteOrder = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Order ID required." });

  const order = await Order.findOne({ _id: req.body.id }).exec();
  if (!order) {
    return res
      .status(204)
      .json({ message: `No order matches ID ${req.body.id}.` });
  }
  const result = await order.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user_id: req.params.id });
  if (!orders) return res.status(204).json({ message: "No orders found." });
  res.json(orders);
};

const getOrder = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Order ID required." });

  const order = await Order.findOne({ _id: req.params.id }).exec();
  if (!order) {
    return res
      .status(204)
      .json({ message: `No order matches ID ${req.params.id}.` });
  }
  res.json(order);
};

const getOrderImage = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Order ID required." });

  const order = await Order.findOne({ _id: req.params.id }).exec();
  if (!order) {
    return res
      .status(204)
      .json({ message: `No order matches ID ${req.params.id}.` });
  }
  const b64 = Buffer.from(order.image.data, "base64");
  const mimetype = order.image.mimetype;
  if (
    !fs.existsSync(
      path.join(
        __dirname,
        "..",
        "public",
        "img",
        "uploads",
        order.image.filename
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
        order.image.filename
      ),
      b64
    );
  }
  const content = fs.readFileSync(
    path.join(__dirname, "..", "public", "img", "uploads", order.image.filename)
  );

  res.writeHead(200, { "Content-Type": mimetype });
  res.end(content, "utf-8");
};

module.exports = {
  getAllOrders,
  createNewOrder,
  updateOrder,
  verifyOrder,
  deleteOrder,
  getOrder,
  getUserOrders,
  getOrderImage,
};
