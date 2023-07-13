const express = require("express");
const router = express.Router();
const reviewDB = require("../model/reivewDB");

router.get("/", async (req, res) => {
    try {
        const reviewDatabase = await reviewDB.find();
        res.json(reviewDatabase);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;