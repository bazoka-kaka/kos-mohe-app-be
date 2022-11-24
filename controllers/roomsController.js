const Room = require("../model/Room");
const fs = require("fs");
const path = require("path");

const getAllRooms = async (req, res) => {
  const rooms = await Room.find();
  if (!rooms) return res.status(204).json({ message: "No rooms found." });
  res.json(rooms);
};

const createNewRoom = async (req, res) => {
  console.log(req?.file);
  if (!req?.body?.name || !req?.body?.price || !req?.file) {
    return res
      .status(400)
      .json({ message: "Name image and price are required" });
  }

  try {
    const result = await Room.create({
      name: req.body.name,
      image: {
        data: fs.readFileSync(
          path.join(
            __dirname,
            "..",
            "public",
            "img",
            "uploads",
            req.file.filename
          )
        ),
        filename: req.file.filename,
        mimetype: req.file.mimetype,
      },
      price: req.body.price,
      quantity: req.body?.quantity,
      description: req.body?.description,
      features: {
        ac: req.body?.ac,
        kmandi: req.body?.kmandi,
        capacity: req.body?.capacity,
        featured: req.body?.featured,
      },
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateRoom = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const room = await Room.findOne({ _id: req.body.id }).exec();
  if (!room) {
    return res
      .status(204)
      .json({ message: `No room matches ID ${req.body.id}.` });
  }
  if (req.body?.name) room.name = req.body.name;
  if (req.body?.price) room.price = req.body.price;
  if (req.body?.quantity) room.quantity = req.body.quantity;
  if (req.body?.description) room.description = req.body.description;
  if (req.body?.ac) room.features.ac = req.body.ac;
  if (req.body?.kmandi) room.features.kmandi = req.body.kmandi;
  if (req.body?.capacity) room.features.capacity = req.body.capacity;
  if (req.body?.featured) room.features.featured = req.body.featured;
  const result = await room.save();
  res.json(result);
};

const deleteRoom = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Room ID required." });

  const room = await Room.findOne({ _id: req.body.id }).exec();
  if (!room) {
    return res
      .status(204)
      .json({ message: `No room matches ID ${req.body.id}.` });
  }
  const result = await room.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getRoom = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Room ID required." });

  const room = await Room.findOne({ _id: req.params.id }).exec();
  if (!room) {
    return res
      .status(204)
      .json({ message: `No room matches ID ${req.params.id}.` });
  }
  res.json(room);
};

const getRoomImage = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Room ID required." });

  const room = await Room.findOne({ _id: req.params.id }).exec();
  if (!room) {
    return res
      .status(204)
      .json({ message: `No room matches ID ${req.params.id}.` });
  }
  const b64 = Buffer.from(room.image.data).toString("base64");
  const mimetype = room.image.mimetype;
  let content = fs.readFileSync(
    path.join(__dirname, "..", "public", "img", "uploads", room.image.filename)
  );
  if (!content) {
    fs.writeFileSync(
      path.join(
        __dirname,
        "..",
        "public",
        "img",
        "uploads",
        room.image.filename
      ),
      b64
    );
    content = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "public",
        "img",
        "uploads",
        room.image.filename
      )
    );
  }
  res.writeHead(200, { "Content-Type": mimetype });
  res.end(content, "utf-8");
};

module.exports = {
  getAllRooms,
  createNewRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRoomImage,
};
