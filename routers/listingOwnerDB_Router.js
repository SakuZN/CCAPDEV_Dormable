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

//Return response if listing owner exists
router.get("/owner/:username", (req, res) => {
    listingOwnerDB
        .findOne({ username: req.params.username })
        .then((owner) => {
            res.json(owner);
        })
        .catch((err) => {
            return res.status(500).json({ message: err.message });
        });
});

module.exports = router;
