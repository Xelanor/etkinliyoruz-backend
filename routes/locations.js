const router = require("express").Router();
let Location = require("../models/location");

router.route("/").get((req, res) => {
  Location.find()
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const result = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };

  const newLocation = new Location(result);

  newLocation
    .save()
    .then(event => {
      res.json("Location added!");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
