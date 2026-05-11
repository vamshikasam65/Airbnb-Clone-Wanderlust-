const mongoose = require("mongoose");
const User = require("../models/user.js");
const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
    
    // Find the existing user
    let user = await User.findOne({ username: "defaultuser" });
    
    if (!user) {
        // Create it if it doesn't exist just in case
        const newUser = new User({ email: "default@example.com", username: "defaultuser" });
        user = await User.register(newUser, "password123");
        console.log("Created newly user with ID:", user._id);
    } else {
        console.log("Found existing user with ID:", user._id);
    }
    
    // Update all listings to belong to this new user
    const result = await Listing.updateMany({}, { $set: { owner: user._id } });
    console.log("Updated listings count:", result.modifiedCount);
    
    mongoose.connection.close();
}

main().catch(err => {
    console.log(err);
    mongoose.connection.close();
});
