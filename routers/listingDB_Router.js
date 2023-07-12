const express = require("express");
const router = express.Router();
const listingDB = require("../model/listingDB");

//Returns all listings
router.get("/", async (req, res) => {
    try {
        const listings = await listingDB.find();
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Return one listing based on id parameter
router.get("/listing/:id", async (req, res) => {
    const listingID = req.params.id;

    try {
        const listing = await listingDB.findOne({ listingID: listingID });
        if (listing == null) {
            return res.status(404).json({ message: "Cannot find listing" });
        }
        res.json(listing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
