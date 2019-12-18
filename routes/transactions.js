const router = require("express").Router();
let Transaction = require("../models/transaction");

router.route("/").get((req, res) => {
  Transaction.find()
    .sort({ updated: "desc" })
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const amount = req.body.amount;
  const type = req.body.type;
  const newTransaction = new Transaction({ name, price, amount, type });

  newTransaction
    .save()
    .then(transaction => {
      res.json("Transaction added!");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add-fk").post((req, res) => {
  Transaction.findOneAndUpdate(
    { name: req.body.name },
    { fk: req.body.fk, pd_dd: req.body.pd_dd },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )
    .then(transaction => {
      res.json("Transaction added!");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/global").post((req, res) => {
  Transaction.find({
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
