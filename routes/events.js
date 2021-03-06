const router = require("express").Router();
let Event = require("../models/event");
const all_ticker_details = require("../utils/all_ticker_details");
const my_ticker_details = require("../utils/my_ticker_details");
const single_ticker_details = require("../utils/single_ticker_details");

router.route("/").get((req, res) => {
  Event.find({ active: true, date: { $gte: Date.now() + 10800000 } })
    .sort({ date: 1 })
    // .limit(40)
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

// router.route("/add-to-all").get((req, res) => {
//   Event.update({}, { active: true }, { multi: true }, function(
//     err,
//     numberAffected
//   ) {
//     console.log(numberAffected);
//   });
// });

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
  Event.find()
    .and([
      {
        $or: [
          { name: { $regex: req.body.searchString, $options: "i" } },
          { description: { $regex: req.body.searchString, $options: "i" } },
          { place: { $regex: req.body.searchString, $options: "i" } },
          { town: { $regex: req.body.searchString, $options: "i" } }
        ]
      },
      { active: true, date: { $gte: Date.now() + 10800000 } }
    ])
    .sort({ date: 1 })
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/search/category").post((req, res) => {
  Event.find({
    active: true,
    category: req.body.searchString,
    date: {
      $gte: Date.now() + 10800000
    }
  })
    .sort({ date: 1 })
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/search/town").post((req, res) => {
  Event.find({
    active: true,
    town: req.body.searchString,
    date: { $gte: Date.now() + 10800000 }
  })
    .sort({ date: 1 })
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/search/place").post((req, res) => {
  Event.find({
    active: true,
    place: req.body.searchString,
    date: { $gte: Date.now() + 10800000 }
  })
    .sort({ date: 1 })
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/events/multiple").get((req, res) => {
  Promise.all([
    Event.find({
      active: true,
      date: { $gte: Date.now() + 10800000 }
    })
      .sort({ date: 1 })
      .limit(8),
    Event.find({
      active: true,
      category: "Atölye",
      date: { $gte: Date.now() + 10800000 }
    })
      .sort({ date: 1 })
      .limit(8),
    Event.find({
      active: true,
      category: "Tiyatro",
      date: { $gte: Date.now() + 10800000 }
    })
      .sort({ date: 1 })
      .limit(8),
    Event.find({
      active: true,
      category: "Eğlence Merkezi",
      date: { $gte: Date.now() + 10800000 }
    })
      .sort({ date: 1 })
      .limit(8),
    Event.find({
      active: true,
      category: "Müzikal/Gösteri",
      date: { $gte: Date.now() + 10800000 }
    })
      .sort({ date: 1 })
      .limit(8)
  ])

    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/events/multiple/count").get((req, res) => {
  Promise.all([
    Event.countDocuments({
      active: true,
      category: "Atölye",
      date: { $gte: Date.now() + 10800000 }
    }).sort({ date: 1 }),
    Event.countDocuments({
      active: true,
      category: "Tiyatro",
      date: { $gte: Date.now() + 10800000 }
    }).sort({ date: 1 }),
    Event.countDocuments({
      active: true,
      category: "Eğlence Merkezi",
      date: { $gte: Date.now() + 10800000 }
    }).sort({ date: 1 }),
    Event.countDocuments({
      active: true,
      category: "Müzikal/Gösteri",
      date: { $gte: Date.now() + 10800000 }
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

router.route("/deactivate/:id").post((req, res) => {
  Event.findByIdAndUpdate(req.params.id, { active: false })
    .then(req => res.json(req))
    .catch(err => res.status(400).json("sError: " + id));
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
