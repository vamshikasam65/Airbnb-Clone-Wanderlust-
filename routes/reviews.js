const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrspAsync.js");
const {isLoggedIn, validatingReview, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


//Reviews
//Adding new review
router.post("/", isLoggedIn, validatingReview, wrapAsync(reviewController.addReview));

//deleting a review
router.delete("/:reviewId", isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;