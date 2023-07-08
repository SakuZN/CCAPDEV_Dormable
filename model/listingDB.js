const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
    {
        listingID: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        price: { type: String, required: true },
        minPrice: { type: Number, required: true },
        maxPrice: { type: Number, required: true },
        reviewScore: { type: Number, required: true },
        reviews: { type: Number, required: true },
        img: [{ type: String, required: true }], // array of images. String is mandatory for each image.
        owner: { type: String, required: true },
        ownerID: { type: String, required: true },
        mapUrl: { type: String, required: true },
        phone: { type: String, required: false },
        website: { type: String, required: false },
        ownerImg: { type: String, required: true },
    },
    { collection: "listingDatabase" }
);

module.exports = mongoose.model("listingDatabase", listingSchema);
