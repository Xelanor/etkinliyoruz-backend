const router = require("express").Router();
let Event = require("../models/event");

router.route("/").get((req, res) => {
  Event.find()
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const result = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    place: req.body.place,
    date: req.body.date,
    images: req.body.images,
    eventAge: req.body.eventAge,
    eventPrice: req.body.eventPrice,
    eventLink: req.body.eventLink
  };

  const newEvent = new Event(result);

  newEvent
    .save()
    .then(event => {
      res.json("Event added!");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
