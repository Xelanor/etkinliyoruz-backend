const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
const changeSchema = new Schema(
  {
    date: {
      type: String,
      required: true
    },
    increasing: {
      type: Number
    },
    decreasing: {
      type: Number
    },
    same: {
      type: Number
    },
    bist: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

const Change = mongoose.model("Change", changeSchema);

module.exports = Change;
