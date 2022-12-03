const express = require("express");
const router = express.Router();
const facilitiesController = require("../../controllers/facilitiesController");
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
  .get(facilitiesController.getAllFacilities)
  .post(
    // verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    upload.single("image"),
    facilitiesController.createNewFacility
  )
  .put(
    // verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    facilitiesController.updateFacility
  );

router
  .route("/:id")
  .get(facilitiesController.getFacility)
  .delete(facilitiesController.deleteFacility);

router
  .route("/images/:id")
  .get(facilitiesController.getFacilityImage)
  .put(upload.single("image"), facilitiesController.updateFacilityImage);

module.exports = router;
