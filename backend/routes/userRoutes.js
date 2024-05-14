const express = require("express");
const {

  allUsers,
} = require("../controlller/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);


module.exports = router;
