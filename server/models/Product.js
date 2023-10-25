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
    imageUrls: [
      {
        type: String,
        required: false
      }
    ],
    quantity: {
      type: Number,
      required: false,
      default: 0
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
    },
    isSupreme: {
      type: Boolean,
    },
    isTrending: {
      type: Boolean,
    },
    isHealthy: {
      type: Boolean,
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
