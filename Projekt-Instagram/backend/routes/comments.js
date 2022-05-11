const express = require("express");
const router = express.Router();
const mqtt = require("mqtt");
const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");
const Comment = require("../models/Comments");
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    Comment.findByIdAndDelete(id, function (error, response) {
      if (error) {
        return res.send(error);
      }
      client.publish("/comments");
      console.log(response);
      return res.send(response);
    });
  } catch (error) {
    return res.send(error);
  }
});

router.get("/", async (req, res) => {
  Comment.find().exec(function (error, allComents) {
    if (error) {
      return res.send(error);
    }
    return res.send({
      comments: [...allComents],
    });
  });
});

router.post("/", async (req, res) => {
  let newComment = new Comment({
    creationDate: new Date(),
    ...req.body,
  });
  await newComment.save();
  client.publish("/comments");
  return res.send(newComment);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updateComment = await Comment.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  client.publish("/comments");
  return res.send(updateComment);
});

module.exports = router;
