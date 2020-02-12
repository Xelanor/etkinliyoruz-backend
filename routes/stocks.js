const router = require("express").Router();
let Stock = require("../models/stock");

router.route("/").get((req, res) => {
  Stock.find()
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/single/:name").get((req, res) => {
  Stock.findOne({ name: req.params.name })
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const newStock = new Stock({ name });

  newStock
    .save()
    .then(post => {
      res.json("Stock added!");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/setbuytarget").post((req, res) => {
  Stock.findOneAndUpdate(
    { name: req.body.name },
    {
      $set: {
        buyTarget: req.body.target,
        prevBuyTarget: req.body.prevTarget
      }
    }
  )
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/setselltarget").post((req, res) => {
  Stock.findOneAndUpdate(
    { name: req.body.name },
    {
      $set: {
        sellTarget: req.body.target,
        prevSellTarget: req.body.prevTarget
      }
    }
  )
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete").post((req, res) => {
  Stock.findOneAndDelete({ name: req.body.name })
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/set-disable").post((req, res) => {
  Stock.findOneAndUpdate(
    { name: req.body.name },
    {
      $set: {
        target: 0,
        condition: req.body.condition,
        state: false
      }
    }
  )
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
