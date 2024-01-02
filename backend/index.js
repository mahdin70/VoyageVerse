const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const passport = require("passport");
const passportSetup = require("./passport");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const passwordResetRoutes = require("./routes/passwordReset");
const cookieSession = require("cookie-session");
const User = require("./models/User");

// Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is Connected Successfully!");
  } catch (err) {
    console.log(err);
  }
};

// Middlewares
dotenv.config();
app.use(
  cookieSession({
    name: "session",
    keys: ["mukitmahdin"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// Image Upload
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully!");
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/passwordReset", passwordResetRoutes);

// Server listening
app.listen(process.env.PORT, () => {
  connectDB();
  console.log("App is Running on Port " + process.env.PORT);
});
