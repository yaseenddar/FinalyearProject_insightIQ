const express = require("express");
const router = express.Router();
const multer = require("multer");
const questionRouter = require("../middleware/Question");
const answerRouter = require("../middleware/Answer");
const userAuth = require('../middleware/user');
const path = require("path");

const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");
const messageRoutes = require("./messageRoutes");
const { notFound, errorHandler } = require("../middleware/errorMiddleware");
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

router.use("/users", userRoutes);
router.use("/chat", chatRoutes);
router.use("/message", messageRoutes);

module.exports = router;
