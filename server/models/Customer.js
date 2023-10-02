const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");

const CustomerSchema = new Schema(
  {
    // customerNo: {
    //   type: String,
    //   required: true
    // },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    telephone: {
      type: String
    },
    address: {
      type: String
    },
    cart: {
      type: [String]
    },
    favourite: {
        type: [String]
    },
    avatarUrl: {
      type: String
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: true
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: true }
);

CustomerSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = Customer = mongoose.model("customers", CustomerSchema);
