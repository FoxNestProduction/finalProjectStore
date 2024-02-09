const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartnerSchema = new Schema(
  {
    customId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: Schema.Types.Mixed,
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
    imageUrl: {
      type: String,
    },
    url: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isBookmark: {
      type: Boolean,
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
    rating: {
      type: Number,
    },
    address: {
      type: String,
    },
  },
  { strict: false }
);

PartnerSchema.index({ "$**": "text" });

module.exports = Partner = mongoose.model("partners", PartnerSchema);
