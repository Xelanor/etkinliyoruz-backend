const router = require("express").Router();
let Event = require("../models/event");

router.route("/").get((req, res) => {
  Event.find({ date: { $gte: new Date() } })
    .sort({ date: 1 })
    .limit(40)
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  Event.findOne({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    place: req.body.place
  }).then(event => {
    if (event) {
      res.json("Event already exist!");
    } else {
      const result = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
        image: req.body.image,
        icon: req.body.icon,
        eventAge: req.body.eventAge,
        eventPrice: req.body.eventPrice,
        eventLink: req.body.eventLink,
        location: req.body.location,
        place: req.body.place,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      };

      const newEvent = new Event(result);
      newEvent
        .save()
        .then(event => {
          res.json("Event added!");
        })
        .catch(err => res.status(400).json("Error: " + err));
    }
  });
});

router.route("/search/text").post((req, res) => {
  Event.find({
    $text: { $search: req.body.searchString },
    date: { $gte: new Date() }
  })
    .sort({ date: 1 })
    .limit(40)
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/search/category").post((req, res) => {
  Event.find({
    category: req.body.searchString,
    date: { $gte: new Date() }
  })
    .sort({ date: 1 })
    .limit(40)
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/events/multiple").get((req, res) => {
  Promise.all([
    Event.find({
      date: { $gte: new Date() }
    })
      .sort({ date: 1 })
      .limit(5),
    Event.find({
      category: "Atölye",
      date: { $gte: new Date() }
    })
      .sort({ date: 1 })
      .limit(5),
    Event.find({
      category: "Tiyatro",
      date: { $gte: new Date() }
    })
      .sort({ date: 1 })
      .limit(5),
    Event.find({
      category: "Eğlence Merkezi",
      date: { $gte: new Date() }
    })
      .sort({ date: 1 })
      .limit(5)
  ])

    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").post((req, res) => {
  Event.findById(req.params.id)
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
