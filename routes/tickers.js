const router = require("express").Router();
let Ticker = require("../models/ticker");

router.route("/").get((req, res) => {
  Ticker.find()
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  Ticker.findOneAndUpdate(
    { name: req.body.name },
    { rsi: req.body.rsi, ninja: req.body.ninja },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )
    .then(ticker => {
      res.json("Ticker added!");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
