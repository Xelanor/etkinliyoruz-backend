const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

const transactionSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: SchemaTypes.Double
    },
    amount: {
      type: SchemaTypes.Double
    },
    type: {
      type: String
    },
    informCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
