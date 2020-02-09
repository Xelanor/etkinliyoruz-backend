const router = require("express").Router();
let Change = require("../models/change");

router.route("/").get((req, res) => {
  Change.find()
    .sort({ createdAt: "desc" })
    .limit(66)
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  Change.findOneAndUpdate(
    { date: req.body.date },
    {
      increasing: req.body.increasing,
      decreasing: req.body.decreasing,
      same: req.body.same
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )
    .then(ticker => {
      res.json("Change added!");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
