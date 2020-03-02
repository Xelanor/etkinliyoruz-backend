const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    category: String,
    date: Date,
    image: String,
    icon: String,
    eventAge: String,
    eventPrice: String,
    eventLink: String,
    location: String,
    place: String,
    latitude: {
      type: SchemaTypes.Double
    },
    longitude: {
      type: SchemaTypes.Double
    },
    city: String,
    town: String,
    active: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

eventSchema.index({ name: "text", description: "text", place: "text" });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
