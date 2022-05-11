const express = require("express");

const router = express.Router();
const mqtt = require("mqtt");
const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");
const Post = require("../models/Post");
const User = require("../models/User");

// router.post("/:id/comment", async (req, res) => {
//   const post = req.body.post;
//   // find out which post you are commenting

//   // get the comment text and record post id
//   const comment = new Comment({
//     author: req.body.author,
//     text: req.body.text,
//     post: post,
//   });
//   // save comment
//   await comment.save();
//   // get this particular post
//   const postRelated = await Post.findById(post);
//   // push the comment into the post.comments array
//   postRelated.comments.push(comment);
//   // save and redirect...
//   await postRelated.save(function (err) {
//     if (err) {
//       console.log(err);
//     }
//     res.redirect("/");
//   });
// });
// router.get("/:id/comment", (req, res) => {
//   res.json("post-comment", { title: "Post a comment" });
// });
// router.get("/:id", (req, res) => {
//   Post.findById(req.params.id)
//     .populate("comments")
//     .exec(function (err, results) {
//       if (err) {
//         console.log(err);
//       }
//       res.json("post_details", {
//         title: "Post details",
//         post: results,
//         comments: results.comments,
//       });
//     });
// });
router.get("/authors", async (req, res) => {
  try {
    const result = await Post.aggregate([
      {
        $group: {
          _id: "$author",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          author: 1,
          count: 1,
        },
      },
    ]);
    const tab = [];
    console.log(result);
    for (const data of result) {
      const user = await User.find({ login: data._id });
      tab.push({ user: [...user][0].login, count: data.count });
    }

    return res.send(tab);
  } catch (err) {
    console.error(err);
  }
});
router.get("/", async (req, res) => {
  Post.find().exec(function (error, posts) {
    if (error) {
      return res.send(error);
    }
    return res.send({
      allPosts: [...posts],
    });
  });
});

router.post("/", async (req, res) => {
  let newPost = new Post({
    creationDate: new Date(),
    ...req.body,
  });
  client.publish("/posts");
  await newPost.save();
  return res.send(newPost);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatePost = await Post.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  client.publish("/posts");
  return res.send(updatePost);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    Post.findByIdAndDelete(id, function (error, response) {
      if (error) {
        return res.send(error);
      }
      client.publish("/posts");
      return res.send(id);
    });
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
