const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  photoUrl: {
    type: String,
    required: true,
  },
  description: String,
  likes: Number,
  creationDate: Date,
  author: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = model("Post", postSchema);
