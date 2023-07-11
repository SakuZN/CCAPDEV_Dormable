const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const listingAdminSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password: String,
    },
    { collection: "listingAdminDatabase" }
);

listingAdminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model("listingAdminDatabase", listingAdminSchema);
