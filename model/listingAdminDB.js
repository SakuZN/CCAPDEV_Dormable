const mongoose = require("mongoose");

const listingAdminSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password: String,
    },
    { collection: "listingAdminDatabase" }
);

module.exports = mongoose.model("listingAdminDatabase", listingAdminSchema);
