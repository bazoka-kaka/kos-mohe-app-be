const express = require("express");
const router = express.Router();
const ordersController = require("../../controllers/ordersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(ordersController.getAllOrders)
  .post(
    // verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    ordersController.createNewOrder
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    ordersController.updateOrder
  )
  .delete(verifyRoles(ROLES_LIST.Admin), ordersController.deleteOrder);

router.route("/:id").get(ordersController.getOrder);

module.exports = router;
