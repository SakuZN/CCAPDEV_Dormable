const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const listingAdminSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { collection: "listingAdmins" }
);

module.exports = mongoose.model("listingAdmins", listingAdminSchema);
