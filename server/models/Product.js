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
      required: false
    },
    currentPrice: {
      type: Number,
      required: false
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
    color: {
      type: String
    },
    sizes: {
      type: String
    },
    productUrl: {
      type: String
    },
    brand: {
      type: String
    },
    manufacturer: {
      type: String
    },
    manufacturerCountry: {
      type: String
    },
    seller: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

ProductSchema.index({ "$**": "text" });

module.exports = Product = mongoose.model("products", ProductSchema);
