const mongoose = require("mongoose");

// TODO: Implement this schema
const ownerResponseSchema = new mongoose.Schema(
    {
        reviewID: { type: Number, required: true },
        listingID: { type: String, required: true },
        userID: { type: String, required: true },
        ownerID: { type: String, required: true },
        response: { type: String, required: true },
        commentDate: { type: Date, required: true, default: Date.now },
    },
    { collection: "reviewComments" }
);

module.exports = mongoose.model("reviewComments", ownerResponseSchema);
