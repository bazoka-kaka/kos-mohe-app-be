const express = require("express");
const router = express.Router();
const discountsController = require("../../controllers/discountsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(discountsController.getAllDiscounts)
  .post(discountsController.createNewDiscount)
  .delete(discountsController.deleteDiscount);

router
  .route("/:id")
  .get(discountsController.getDiscount)
  .put(discountsController.updateDiscount);

module.exports = router;
