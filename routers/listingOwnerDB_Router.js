const express = require("express");
const router = express.Router();
const listingOwnerDB = require("../model/listingOwnerDB");

//Returns all listing owners
router.get("/", async (req, res) => {
    try {
        const owners = await listingOwnerDB.find();
        res.json(owners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
