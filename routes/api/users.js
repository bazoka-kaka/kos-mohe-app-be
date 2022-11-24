const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
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
  .get(
    // verifyRoles(ROLES_LIST.Admin),
    usersController.getAllUsers
  )
  .delete(
    // verifyRoles(ROLES_LIST.Admin),
    usersController.deleteUser
  );

router
  .route("/:id")
  .get(
    // verifyRoles(ROLES_LIST.Admin),
    usersController.getUser
  )
  .put(usersController.updateUser);

router
  .route("/images/:id")
  .get(usersController.getUserImage)
  .put(upload.single("image"), usersController.updateUserImage)
  .delete(usersController.deleteUserImage);

module.exports = router;
