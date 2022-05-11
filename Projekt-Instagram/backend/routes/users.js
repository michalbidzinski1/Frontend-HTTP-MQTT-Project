const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/", async (req, res) => {
  User.find().exec(function (error, usersX) {
    if (error) {
      return res.send(error);
    }
    return res.send({
      users: [...usersX],
    });
  });
});

// router.post("/", async (req, res) => {
//   let newUser = new User({
//     login: req.body.login,
//     password: req.body.password,
//     registrationDate: new Date(),
//   });
//   newUser.save();

//   res.send(newUser);
// });
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      login: req.body.login,
      password: hashedPass,
      registrationDate: new Date(),
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ login: req.body.login });
    if (!user) {
      return res.status(400).send({ error: [{ msg: "bad credentials" }] });
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).send({ error: [{ msg: "bad credentials" }] });
    }

    const { password, ...others } = user._doc;
    return res.status(200).send(user);
  } catch (err) {
    return res.send(error);
  }
});
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updateUser = await User.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  return res.send(updateUser);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    User.findByIdAndDelete(id, function (error, response) {
      if (error) {
        return res.send(error);
      }
      return res.send(id);
    });
  } catch (error) {
    return res.send(error);
  }
});
router.get("/registration-raport", async (req, res) => {
  const date = new Date(req.query.date);
  const response = await User.aggregate([
    { $match: { registrationDate: { $gt: date } } },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$registrationDate",
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        count: 1,
        sum: 1,
      },
    },
  ]);
  res.send({
    response: [...response],
  });
});

module.exports = router;
