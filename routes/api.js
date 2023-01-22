const express = require("express");
const router = express.Router();
const User = require("../models/user");
router.post("/login", (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.find(req.body)
      .then((data) => {
        console.log(data);
        if (data.length === 1) {
          res.json({ success: true, user: data[0] });
        } else {
          res.json({ success: false, error: "The email or password is incorrect" });
        }
      })
      .catch(next);
  } else {
    res.json({
      success: false,
      error: "The email or password is incorrect",
    });
  }
});
router.post("/signup", (req, res, next) => {
  if (req.body.email && req.body.name && req.body.password) {
    let query = { email: req.body.email };
    let update = {
      $setOnInsert: {
        ...req.body,
      },
    };
    let options = { upsert: true, new: true, rawResult: true };
    console.log(req.body);
    User.findOneAndUpdate(query, update, options)
      .then((data) => {
        if (data.lastErrorObject.upserted) {
          res.json({ success: true, user: data.value });
        } else {
          res.json({
            success: false,
            error: "A user already exists with the same email",
          });
        }
      })
      .catch(next);
  } else {
    res.json({
      error: "The email, name and password are required.",
    });
  }
});
router.get("/users", (req, res, next) => {
  User.find({})
    .then((data) => res.json(data))
    .catch(next);
});
router.post("/setUserPermissions", (req, res, next) => {
  console.log(req.body);
  User.updateOne({ _id: req.body.id }, { isAdmin: req.body.isAdmin })
    .then(() => res.json({ success: true }))
    .catch(next);
});
module.exports = router;
