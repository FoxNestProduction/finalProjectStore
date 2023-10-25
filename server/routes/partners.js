const express = require("express");
const router = express.Router();
const passport = require("passport"); // multer for parsing multipart form data (files)

//Import controllers
const {
  addPartner,
  updatePartner,
  deletePartner,
  getPartners,
  getPartnersFilterParams,
  searchPartners
} = require("../controllers/partners");

// @route   POST /partners
// @desc    Create new partner
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt-admin", { session: false }),
  addPartner
);

// @route   PUT /partners/:customId
// @desc    Update existing partner
// @access  Private
router.put(
  "/:customId",
  passport.authenticate("jwt-admin", { session: false }),
  updatePartner
);

// @route   DELETE /partners/:customId
// @desc    DELETE existing partner
// @access  Private
router.delete(
  "/:customId",
  passport.authenticate("jwt-admin", { session: false }),
  deletePartner
);

// @route   GET /partners
// @desc    GET existing partners
// @access  Public
router.get("/", getPartners);

// @route   GET /products/filter
// @desc    GET appropriate filtered products
// @access  Public
router.get("/filter", getPartnersFilterParams);

// @route   POST /products/search
// @desc    POST appropriate to search query products
// @access  Public
router.post("/search", searchPartners);

module.exports = router;
