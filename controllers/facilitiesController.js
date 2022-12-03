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

const updateFacility = async (req, res) => {
  console.log(req?.body);
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const facility = await Facility.findOne({ _id: req.body.id }).exec();
  if (!facility) {
    return res
      .status(204)
      .json({ message: `No facility matches ID ${req.body.id}.` });
  }
  if (req.body?.name) facility.name = req.body.name;
  if (req.body?.description) facility.description = req.body.description;
  if (req.body?.features) facility.features = req.body.features;
  const result = await facility.save();
  res.json(result);
};

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

const updateFacilityImage = async (req, res) => {
  console.log(req?.params?.id);
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const facility = await Facility.findOne({ _id: req.params.id }).exec();
  if (!facility) {
    return res
      .status(204)
      .json({ message: `No facility matches ID ${req.params.id}.` });
  }
  if (req?.file) {
    facility.image.data = fs.readFileSync(
      path.join(__dirname, "..", "public", "img", "uploads", req.file.filename)
    );
    facility.image.filename = req.file.filename;
    facility.image.mimetype = req.file.mimetype;
  }
  const result = await facility.save();
  res.json(result);
};

module.exports = {
  getAllFacilities,
  createNewFacility,
  updateFacility,
  updateFacilityImage,
  deleteFacility,
  getFacility,
  getFacilityImage,
};
