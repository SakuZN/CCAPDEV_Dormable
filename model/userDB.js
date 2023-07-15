const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        customName: { type: String, required: true },
        course: { type: String, required: false },
        college: { type: String, required: false },
        type: { type: String, required: true },
        description: { type: String, required: false },
        profilePic: {
            type: String,
            default:
                "https://res.cloudinary.com/dsflhdid4/image/upload/v1689071540/blank_pp.webp",
        },
        joinDate: { type: Date, default: Date.now },
        noOfReviews: { type: Number, default: 0 },
        followers: { type: Number, default: 0 },
        liked: [
            {
                reviewID: { type: Number, required: true },
                listingID: { type: String, required: true },
                userID: { type: String, required: true },
            },
        ],
        following: [String],
    },
    { collection: "userDatabase" }
);

module.exports = mongoose.model("userDatabase", userSchema);
