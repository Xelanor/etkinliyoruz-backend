const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

const stockSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    buyTarget: {
      type: SchemaTypes.Double,
      default: 0
    },
    sellTarget: {
      type: SchemaTypes.Double,
      default: 0
    },
    prevBuyTarget: {
      type: SchemaTypes.Double,
      default: 0
    },
    prevSellTarget: {
      type: SchemaTypes.Double,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
