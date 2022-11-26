const express = require("express");
const router = express.Router();
const notificationsController = require("../../controllers/notificationsController");
// const ROLES_LIST = require("../../config/roles_list");
// const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(notificationsController.getAllNotifications)
  .post(
    // verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    notificationsController.createNewNotification
  )
  .delete(notificationsController.deleteNotification);

router
  .route("/:id")
  .get(notificationsController.getAllUserNotifications)
  .delete(notificationsController.deleteNotifications);

module.exports = router;
