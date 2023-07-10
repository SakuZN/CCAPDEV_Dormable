const express = require("express");
const router = express.Router();
const listingAdminDB = require("../model/listingAdminDB");

//Returns all info
router.get("/", async (req, res) => {
    try {
        const info = await listingAdminDB.find();
        res.json(info);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
