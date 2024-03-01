const express = require("express");
const router = express.Router();
const multer = require("multer");
const questionRouter = require("./Question");
const answerRouter = require("./Answer");
const userAuth = require('./user');
const path = require("path");

router.get("/", (req, res) => {
  res.send("This api is reserved ");
});

// router.use("/images", express.static(path.join(__dirname, "public/images")));
// upload files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Specify the directory for storing files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Generate unique filename
  }
});

// Initialize multer instance with the defined storage
const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
router.use("/questions", questionRouter);
router.use("/answers", answerRouter);
router.use("/auth", userAuth);


module.exports = router;
