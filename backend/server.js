const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();


const db = require("./config/database");
const router = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

//database connection
const PORT = process.env.PORT|| 5000;
db();

//middle ware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//cors

app.use(cors());
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/api", router);

// CHAT API



app.use("/uploads", express.static(path.join(__dirname, "/public/images")));

// app.get("*", (req, res) => {
//   try {
//     res.send("Oops! no page at this url");
//   } catch (e) {
//     res.send("Oops! unexpected error");
//   }
// });
//server listeniprocess.env.portng

// --------------------------deployment------------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1,"..", "frontend", "dist")));  // Updated path

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend","..", "dist", "index.html"))  // Updated path
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}



const server = app.listen(PORT, () => {
  console.log(`Listening on port no ${PORT}`);
});

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);


const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id)
    socket.emit("connected");
  });
 socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
 