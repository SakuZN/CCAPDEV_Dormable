const express = require("express");
const router = express.Router();
const listingOwnerDB = require("../model/listingOwnerDB");

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
