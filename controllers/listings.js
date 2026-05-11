const Listing = require("../models/listing.js");//requiring listing model


module.exports.index = async (req, res) => {
    let listings = await Listing.find({});
    res.render("index.ejs", { listings });
}

module.exports.newListingForm = (req, res) => {
    res.render("form.ejs");
}

module.exports.postNewListing = async (req, res, next) => {
    let { title, des, image, price, location, country } = req.body;
    let listing = new Listing({ title: title, description: des, image: image, price: price, location: location, country: country, })
    listing.owner = req.user._id;
    await listing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
    return;
}

module.exports.editForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for doesnot exist!");
        res.redirect("/listings");
        return;
    } else {
        res.render("edit.ejs", { listing });
    }
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let { title, des, image, price, location, country } = req.body;
    await Listing.updateOne({ _id: id }, {
        title: title,
        description: des,
        image: image,
        price: price,
        location: location,
        country: country,
    })
    // await Listing.findByIdAndUpdate(id,{...req.body.listing})
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
}

module.exports.allListings = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for doesnot exist!");
        res.redirect("/listings");
    } else {
        res.render("show.ejs", { listing });
    }
}

module.exports.deleteListing = async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing successfully deleted!");
    res.redirect("/listings");
}
