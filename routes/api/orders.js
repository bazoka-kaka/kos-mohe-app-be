const express = require("express");
const router = express.Router();
const ordersController = require("../../controllers/ordersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const multer = require("multer");
const path = require("path");

// config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "public", "img", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .route("/")
  .get(ordersController.getAllOrders)
  .post(
    // verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    ordersController.createNewOrder
  )
  .put(
    // verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    upload.single("image"),
    ordersController.updateOrder
  )
  .delete(verifyRoles(ROLES_LIST.Admin), ordersController.deleteOrder);

router
  .route("/admin")
  .put(verifyRoles(ROLES_LIST.Admin), ordersController.verifyOrder);

router.route("/:id").get(ordersController.getUserOrders);

router.route("/images/:id").get(ordersController.getOrderImage);

module.exports = router;
