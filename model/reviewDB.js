const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        reviewID: { type: Number, required: true },
        userID: { type: String, required: true },
        listingID: { type: String, required: true },
        reviewTitle: { type: String, required: true },
        reviewContent: { type: String, required: true },
        reviewIMG: [{ type: String, required: false }], // array of images. String is mandatory for each image.
        reviewScore: { type: Number, required: true },
        reviewDate: { type: Date, required: true },
        reviewMarkedHelpful: { type: Number, required: true },
        wasEdited: { type: Boolean, required: false },
        isDeleted: { type: Boolean, required: false },
    },
    { collection: "review" }
);

module.exports = mongoose.model("review", reviewSchema);
