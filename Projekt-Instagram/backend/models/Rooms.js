const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
  id: {
    type: String,
  },
});

module.exports = model("Room", roomSchema);
