const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    category: {
      type: [String],
      required: true
    },
    place: String,
    location: String,
    date: Date,
    images: String,
    eventAge: String,
    eventPrice: String,
    eventLink: String
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
