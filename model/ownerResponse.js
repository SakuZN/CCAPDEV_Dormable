const mongoose = require("mongoose");

const ownerResponseSchema = new mongoose.Schema(
    {
        reviewID: { type: Number, required: true },
        listingID: { type: String, required: true },
        userID: { type: String, required: true },
        ownerID: { type: String, required: true },
        response: { type: String, required: true },
        commentDate: { type: Date, required: true }
    },
    { collection: "ownerResponse" }
);

module.exports = mongoose.model("ownerResponse", ownerResponseSchema);