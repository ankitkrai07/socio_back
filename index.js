const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const connection = async () => {
  try {
    await mongoose.connect(process.env.mongoURL);
    console.log("connected to DB");
  } catch (error) {
    console.log("Error", error);
  }
};

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(8080, () => {
  connection();
  console.log("Server running on port 8080");
});
