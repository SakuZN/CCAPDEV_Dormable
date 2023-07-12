const express = require("express");
const router = express.Router();
const ownerResponseDB = require("../model/ownerResponseDB");

router.get("/", async (req, res) => {
    try {
        const ownerResponse = await ownerResponseDB.find();
        res.json(ownerResponse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;