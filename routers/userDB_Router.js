const express = require("express");
const router = express.Router();
const userDB = require("../model/userDB");

//Returns all listings
router.get("/", async (req, res) => {
    try {
        const user = await userDB.find();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
