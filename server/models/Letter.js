const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LetterSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customers"
    },
    email: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

module.exports = Letter = mongoose.model("letters", LetterSchema);