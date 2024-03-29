const express = require("express");
const router = express.Router();
const roomsController = require("../../controllers/roomsController");
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
  .get(roomsController.getAllRooms)
  .post(
    // verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    upload.single("image"),
    roomsController.createNewRoom
  )
  .put(
    // verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    roomsController.updateRoom
  );

router
  .route("/:id")
  .get(roomsController.getRoom)
  .delete(roomsController.deleteRoom);

router
  .route("/images/:id")
  .get(roomsController.getRoomImage)
  .put(upload.single("image"), roomsController.updateRoomImage);

module.exports = router;
