const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customers",
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "catalogs"
    },
    rating: {
      type: Number,
      // required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

module.exports = Comment = mongoose.model("comments", CommentSchema);
