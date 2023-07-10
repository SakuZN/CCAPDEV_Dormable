const mongoose = require("mongoose");

const listingAdminSchema = new mongoose.Schema(
    {
        "_id" : ObjectId, // This field is auto-generated unless explicitly stated.
        "username" : String,
        "email" : String,
        "password" : String
    },
    { collection: "listingAdminDatabase" }
);

module.exports = mongoose.model("listingAdminDatabase", listingAdminSchema);
