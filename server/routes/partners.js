const express = require("express");
const router = express.Router();
const passport = require("passport"); // multer for parsing multipart form data (files)

//Import controllers
const {
  addPartner,
  updatePartner,
  deletePartner,
  getPartners,
  getPartnersNames,
  getPartnerById,
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

// @route   GET /partners/names
// @desc    GET existing partners names
// @access  Public
router.get("/names", getPartnersNames);

// @route   GET /partners/filter
// @desc    GET appropriate filtered partners
// @access  Public
router.get("/filter", getPartnersFilterParams);

// @route   POST /partners/search
// @desc    POST appropriate to search query partners
// @access  Public
router.post("/search", searchPartners);

// @route   GET /partner/:id
// @desc    GET existing partner by id
// @access  Public
router.get("/:customId", getPartnerById);

module.exports = router;
