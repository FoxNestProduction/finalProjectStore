const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    itemNo: {
      type: String,
      required: false
    },
    enabled: {
      type: Boolean,
      required: false,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    currentPrice: {
      type: Number,
      required: true
    },
    previousPrice: {
      type: Number
    },
    categories: {
      type: String,
      required: false
    },
    productUrl: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    rating: {
      type: Number,
      default: 3,
    },
    isSupreme: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isHealthy: {
      type: Boolean,
      default: false,
    },
    filterCategories: {
      type: String
    },
    restaurant_name: {
      type: String
    },
  },
  { strict: false }
);

ProductSchema.index({ "$**": "text" });

module.exports = Product = mongoose.model("products", ProductSchema);
