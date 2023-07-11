const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        customName: { type: String, required: true },
        course: { type: String, required: false },
        college: { type: String, required: true },
        type: { type: String, required: true },
        description: { type: String, required: false },
        profilePic: { type: String, default: "/blank_profile.png" },
        joinDate: { type: Date, default: Date.now },
        noOfReviews: { type: Number, default: 0 },
        followers: { type: Number, default: 0 },
        liked: [
            {
                reviewID: { type: Number, required: true },
                listingID: { type: Number, required: true },
                userID: { type: String, required: true },
            },
            // ... more liked reviews ...
        ],
        following: [String],
    },
    { collection: "userDatabase" }
);

module.exports = mongoose.model("userDatabase", userSchema);
