const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { postModel } = require("../models/postModel");
const { auth } = require("../middleware/auth.middleware");

router.get("/", auth, async (req, res) => {
  try {
    const { device, page } = req.query;
    let skip;
    if (page) skip = (page - 1) * 3;
    else skip = 0;

    let query = { author: req.userId };
    if (device) {
      query.device = device;
    }

    const postData = await postModel.find(query).skip(skip).limit(3);
    res.status(200).json({ postData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("add", auth, async (req, res) => {
  try {
    let { title, body, device } = req.body;
    const obj = {
      title,
      body,
      device,
      author: req.userId,
    };
    const post = await postModel.create(obj);
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/update/:id", auth, async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) res.send("post not found");

    if (post.author.toString() !== req.userId) res.send("Not authorised");

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updatedPost);
  } catch (err) {
    res.status(500).json({ message: "Update-Error" });
  }
});
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const post = await postModel.findByid(req.params.id);
    console.log(post);
    if (!post) res.send("post not found");

    if (post.author.toString() !== req.userId) res.send("Not authorised");

    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send("post deleted");
  } catch (err) {
    res.status(500).json({ message: "Delete-Error" });
  }
});

module.exports = router;
