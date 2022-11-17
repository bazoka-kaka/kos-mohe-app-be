const express = require("express");
const router = express.Router();
const roomsController = require("../../controllers/roomsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(roomsController.getAllRooms)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    roomsController.createNewRoom
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    roomsController.updateRoom
  )
  .delete(verifyRoles(ROLES_LIST.Admin), roomsController.deleteRoom);

router.route("/:id").get(roomsController.getRoom);

module.exports = router;
