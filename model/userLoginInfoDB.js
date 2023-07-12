const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userLoginSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { collection: "userLoginInfo" }
);

module.exports = mongoose.model("userLoginInfo", userLoginSchema);
