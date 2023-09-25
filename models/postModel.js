const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  device: { type: String, enum: ["PC", "TABLET", "MOBILE"], required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

const postModel = mongoose.model("post", postSchema);

module.exports = { postModel };
