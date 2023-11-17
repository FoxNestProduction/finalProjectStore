const express = require("express");
const router = express.Router();

//Import controllers
const {
  submitSupportRequest
} = require("../controllers/support");

// @route   POST /support
// @desc    Return success or error message
// @access  Public

router.post(
  "/",
  submitSupportRequest
);

module.exports = router;
