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

// Before saving the user info, ensure the password is hashed
userLoginSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model("userLoginInfo", userLoginSchema);
