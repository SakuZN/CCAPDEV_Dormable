const express = require("express");
const router = express.Router();
const userLoginInfoDB = require("../model/userLoginInfoDB");

//Returns all listings
router.get("/", async (req, res) => {
    try {
        const userLoginInfo = await userLoginInfoDB.find();
        res.json(userLoginInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
