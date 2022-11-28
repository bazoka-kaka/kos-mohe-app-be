const Facility = require("../model/Facility");
const fs = require("fs");
const path = require("path");

const getAllFacilities = async (req, res) => {
  const facilities = await Facility.find();
  if (!facilities)
    return res.status(204).json({ message: "No facilities found." });
  res.json(facilities);
};

const createNewFacility = async (req, res) => {
  console.log(req?.file);
  if (!req?.body?.name || !req?.file) {
    return res
      .status(400)
      .json({ message: "Facility name and image are required" });
  }

  try {
    const result = await Facility.create({
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
      description: req.body?.description,
      features: req.body?.features,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

// const updateRoom = async (req, res) => {
//   if (!req?.body?.id) {
//     return res.status(400).json({ message: "ID parameter is required." });
//   }

//   const room = await Room.findOne({ _id: req.body.id }).exec();
//   if (!room) {
//     return res
//       .status(204)
//       .json({ message: `No room matches ID ${req.body.id}.` });
//   }
//   if (req.body?.name) room.name = req.body.name;
//   if (req.body?.price) room.price = req.body.price;
//   if (req.body?.quantity) room.quantity = req.body.quantity;
//   if (req.body?.description) room.description = req.body.description;
//   if (req.body?.ac) room.features.ac = req.body.ac;
//   if (req.body?.kmandi) room.features.kmandi = req.body.kmandi;
//   if (req.body?.capacity) room.features.capacity = req.body.capacity;
//   if (req.body?.featured) room.features.featured = req.body.featured;
//   const result = await room.save();
//   res.json(result);
// };

const deleteFacility = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Facility ID required." });

  const facility = await Facility.findOne({ _id: req.params.id }).exec();
  if (!facility) {
    return res
      .status(204)
      .json({ message: `No facility matches ID ${req.params.id}.` });
  }
  const result = await facility.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getFacility = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Facility ID required." });

  const facility = await Facility.findOne({ _id: req.params.id }).exec();
  if (!facility) {
    return res
      .status(204)
      .json({ message: `No facility matches ID ${req.params.id}.` });
  }
  res.json(facility);
};

const getFacilityImage = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Facility ID required." });

  const facility = await Facility.findOne({ _id: req.params.id }).exec();
  if (!facility) {
    return res
      .status(204)
      .json({ message: `No facility matches ID ${req.params.id}.` });
  }
  const b64 = Buffer.from(facility.image.data, "base64");
  const mimetype = facility.image.mimetype;
  if (
    !fs.existsSync(
      path.join(
        __dirname,
        "..",
        "public",
        "img",
        "uploads",
        facility.image.filename
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
        facility.image.filename
      ),
      b64
    );
  }
  const content = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "public",
      "img",
      "uploads",
      facility.image.filename
    )
  );

  res.writeHead(200, { "Content-Type": mimetype });
  res.end(content, "utf-8");
};

module.exports = {
  getAllFacilities,
  createNewFacility,
  // updateRoom,
  deleteFacility,
  getFacility,
  getFacilityImage,
};
