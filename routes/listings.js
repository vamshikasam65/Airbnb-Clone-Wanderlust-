const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrspAsync.js");
const {isLoggedIn, isOwner , validatingListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
// const multer  = require('multer')//to parse multipart form data
// const upload = multer({ dest: 'uploads/' })//uploades is a folder where the data is expected to be stored

router.route("/")
    //Index Route to show all listings
    .get(wrapAsync(listingController.index))
    //New listing route(post) to add new listing
    .post(isLoggedIn, validatingListing, wrapAsync(listingController.postNewListing));

//New listing route(get) to get form
router.get("/new", isLoggedIn, wrapAsync(listingController.newListingForm));

router.route("/:id")
    //Update route
    .put(isLoggedIn, isOwner, validatingListing, wrapAsync(listingController.updateListing))
    //Show Route
    .get(wrapAsync(listingController.allListings))
    //Delete route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//Editing route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editForm));

module.exports = router;