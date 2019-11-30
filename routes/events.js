const router = require("express").Router();
let Event = require("../models/event");

router.route("/").get((req, res) => {
  Event.find()
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const newEvent = new Event({ name });

  newEvent
    .save()
    .then(post => {
      res.json("Event added!");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
