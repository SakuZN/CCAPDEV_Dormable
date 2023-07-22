const mongoose = require("mongoose");

const listingOwnerSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        customName: { type: String, required: true },
        type: { type: String, required: true },
        profilePic: {
            type: String,
            default:
                "https://res.cloudinary.com/dsflhdid4/image/upload/v1689071540/blank_pp.webp",
        },
        description: { type: String, required: true },
        joinDate: { type: Date, required: true, default: Date.now },
        listings: { type: [String], required: true },
        liked: [
            {
                reviewID: { type: Number, required: true },
                listingID: { type: String, required: true },
                userID: { type: String, required: true },
            },
        ],
        noOfListings: { type: Number, required: true },
        followers: { type: Number, default: 0 },
        country: { type: String, required: true },
        website: { type: String, required: true },
    },
    { collection: "listingOwners" }
);

module.exports = mongoose.model("listingOwners", listingOwnerSchema);
