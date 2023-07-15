const express = require("express");
const router = express.Router();
const ownerResponseDB = require("../model/ownerResponseDB");

//Post method to add owner response to database
router.post("/responseAdd", async (req, res) => {
    const ownerResponse = new ownerResponseDB({
        reviewID: req.body.reviewID,
        listingID: req.body.listingID,
        userID: req.body.userID,
        ownerID: req.body.ownerID,
        response: req.body.response,
        commentDate: req.body.commentDate,
    });
    try {
        const newOwnerResponse = await ownerResponse.save();
        res.status(201).json(newOwnerResponse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Get owner response given 3 parameters
router.get("/response/:reviewID/:listingID/:userID", (req, res) => {
    ownerResponseDB
        .findOne({
            reviewID: req.params.reviewID,
            listingID: req.params.listingID,
            userID: req.params.userID,
        })
        .then((ownerResponse) => {
            res.json(ownerResponse);
        })
        .catch((err) => {
            return res.status(500).json({ message: err.message });
        });
});
router.get("/", async (req, res) => {
    try {
        const ownerResponse = await ownerResponseDB.find();
        res.json(ownerResponse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
