const mongoose = require("mongoose");

const listingOwnerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    customName: { type: String, required: true },
    type: { type: String, required: true },
    profilePic: { type: String, default: "/assets/images/default_profile_pic.jpg" },
    description: { type: String, required: true },
    joinDate: { type: Date, default: Date.now },
    listings: { type: [String], required: true },
    noOfListings: { type: Number, required: true },
    followers: { type: Number, default: 0 },
    country: { type: String, required: true },
    website: { type: String, required: true },
    },
    { collection: "listingOwnerDatabase" }
);

module.exports = mongoose.model("listingOwnerDatabase", listingOwnerSchema);