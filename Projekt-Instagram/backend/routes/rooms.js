const express = require("express");
const mqtt = require("mqtt");
const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");
const Room = require("../models/Rooms");
router.post("/add", async (req, res) => {
  try {
    const newConversation = new Room({
      id: uuidv4(),
    });
    client.publish("/rooms");
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  Room.find().exec(function (error, roomsX) {
    if (error) {
      return res.send(error);
    }
    return res.send({
      allRooms: [...roomsX],
    });
  });
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    Room.findByIdAndDelete(id, function (error, response) {
      if (error) {
        return res.send(error);
      }
      client.publish("/rooms");
      return res.send(id);
    });
  } catch (error) {
    return res.send(error);
  }
});
router.put("/:id", async (req, res) => {
  id = req.params.id;
  const updatePost = await Room.findByIdAndUpdate(
    { _id: id },
    { id: uuidv4() },
    { new: true }
  );
  client.publish("/rooms");
  return res.send(updatePost);
});

module.exports = router;
