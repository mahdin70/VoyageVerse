const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://chadspl:chadspl@cluster0.sevp7ws.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Database is Connected Successfully!");
  } catch (err) {
    console.log(err);
  }
};

dotenv.config();

app.listen(5000, () => {
  connectDB();
  console.log("App is Running on Port " + 5000);
});
