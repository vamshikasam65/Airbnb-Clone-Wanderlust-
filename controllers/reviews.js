const Listing = require("../models/listing.js");//requiring listing model
const Review = require("../models/review.js");//requiring review model

module.exports.addReview = async (req, res) => {
    // console.log(req.body.review);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    // console.log(listing);
    req.flash("success", "New review created!");
    res.redirect(`/listings/${listing._id}`);
    // console.log(newReview);
}

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "review successfully deleted!");
    res.redirect(`/listings/${id}`);
}