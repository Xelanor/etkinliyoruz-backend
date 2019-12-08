const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    latitude: {
      type: SchemaTypes.Double
    },
    longitude: {
      type: SchemaTypes.Double
    }
  },
  {
    timestamps: true
  }
);

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
