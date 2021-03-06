const router = require("express").Router();
let Ticker = require("../models/ticker");

router.route("/").get((req, res) => {
  Ticker.find()
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/single-ticker").post((req, res) => {
  Ticker.findOne({ name: req.body.name })
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

router.route("/add-fk").post((req, res) => {
  Ticker.findOneAndUpdate(
    { name: req.body.name },
    { fk: req.body.fk, pd_dd: req.body.pd_dd },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )
    .then(ticker => {
      res.json("Ticker added!");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/global").post((req, res) => {
  Ticker.find({
    $and: [
      {
        rsi: { $lte: req.body.rsi },
        ninja: { $lte: req.body.ninja },
        pd_dd: { $lte: req.body.pd_dd }
      }
    ]
  })
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
