const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registrationDate: Date,
});

module.exports = model("User", userSchema);
