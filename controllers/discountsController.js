const Discount = require("../model/Discount");

const getAllDiscounts = async (req, res) => {
  const discounts = await Discount.find();
  if (!discounts)
    return res.status(204).json({ message: "No discounts found" });
  res.json(discounts);
};

const createNewDiscount = async (req, res) => {
  if (
    !req?.body?.name ||
    !req?.body?.kamar_id ||
    !req?.body?.kamar_name ||
    !req?.body?.cut ||
    !req?.body?.description ||
    !req?.body?.begin_date ||
    !req?.body?.end_date
  ) {
    return res.status(400).json({
      message:
        "Discount name, kamar, cut, description, and begin also end date are required",
    });
  }

  try {
    const result = await Discount.create({
      name: req.body.name,
      kamar: {
        id: req.body.kamar_id,
        name: req.body.kamar_name,
      },
      cut: req.body.cut,
      description: req.body.description,
      beginDate: req.body.begin_date,
      endDate: req.body.end_date,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const deleteDiscount = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Discount ID required" });
  const discount = await Discount.findOne({ _id: req.body.id }).exec();
  if (!discount) {
    return res
      .status(204)
      .json({ message: `Discount ID ${req.body.id} not found` });
  }
  const result = await discount.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getDiscount = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Discount ID required" });
  const discount = await Discount.findOne({ _id: req.params.id }).exec();
  if (!discount) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(discount);
};

const updateDiscount = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const discount = await Discount.findOne({ _id: req.params.id }).exec();
  if (!discount) {
    return res
      .status(204)
      .json({ message: `No discount matches ID ${req.params.id}.` });
  }

  if (req.body?.name) discount.name = req.body.name;
  if (req.body?.kamar_id) discount.kamar.id = req.body.kamar_id;
  if (req.body?.kamar_name) discount.kamar.name = req.body.kamar_name;
  if (req.body?.cut) discount.cut = req.body.cut;
  if (req.body?.description) discount.description = req.body.description;
  if (req.body?.begin_date) discount.beginDate = req.body.begin_date;
  if (req.body?.end_date) discount.endDate = req.body.end_date;
  const result = await discount.save();
  res.json(result);
};

module.exports = {
  getAllDiscounts,
  createNewDiscount,
  deleteDiscount,
  getDiscount,
  updateDiscount,
};
