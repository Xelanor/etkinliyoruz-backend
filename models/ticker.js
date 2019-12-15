const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

const tickerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    rsi: {
      type: SchemaTypes.Double
    },
    ninja: {
      type: SchemaTypes.Double
    },
    fk: {
      type: SchemaTypes.Double
    }
  },
  {
    timestamps: true
  }
);

const Ticker = mongoose.model("Ticker", tickerSchema);

module.exports = Ticker;
