const express = require("express");
const router = express.Router();
const listingDB = require("../model/listingDB");

router.get("/", async (req, res) => {
    try {
        const listings = await listingDB.find();
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
