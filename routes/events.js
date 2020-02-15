const router = require("express").Router();
let Event = require("../models/event");
const all_ticker_details = require("../utils/all_ticker_details");
const my_ticker_details = require("../utils/my_ticker_details");
const single_ticker_details = require("../utils/single_ticker_details");

router.route("/").get((req, res) => {
  Event.find({ date: { $gte: new Date() } });
  Event.find()
    .sort({ date: 1 })
    // .limit(40)
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
        longitude: req.body.longitude,
        city: req.body.city,
        town: req.body.town
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
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/search/category").post((req, res) => {
  Event.find({
    category: req.body.searchString,
    date: { $gte: new Date() }
  })
    .sort({ date: 1 })
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/search/town").post((req, res) => {
  Event.find({
    town: req.body.searchString,
    date: { $gte: new Date() }
  })
    .sort({ date: 1 })
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
      .limit(5),
    Event.find({
      category: "Müzikal/Gösteri",
      date: { $gte: new Date() }
    })
      .sort({ date: 1 })
      .limit(5)
  ])

    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/events/multiple/count").get((req, res) => {
  Promise.all([
    Event.countDocuments({
      category: "Atölye",
      date: { $gte: new Date() }
    }).sort({ date: 1 }),
    Event.countDocuments({
      category: "Tiyatro",
      date: { $gte: new Date() }
    }).sort({ date: 1 }),
    Event.countDocuments({
      category: "Eğlence Merkezi",
      date: { $gte: new Date() }
    }).sort({ date: 1 }),
    Event.countDocuments({
      category: "Müzikal/Gösteri",
      date: { $gte: new Date() }
    }).sort({ date: 1 })
  ])
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").post((req, res) => {
  Event.findById(req.params.id)
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/all_ticker_details").get((req, res) => {
  all_ticker_details().then(req => res.json(req));
});

router.route("/my_ticker_details").get((req, res) => {
  my_ticker_details().then(req => res.json(req));
});

router.route("/single_ticker_details/:stock").get((req, res) => {
  single_ticker_details(req.params.stock).then(req => res.json(req));
});

module.exports = router;
