const express = require("express");
const router = express.Router();
const reviewDB = require("../model/reviewDB");
const userDB = require("../model/userDB");

//Edit a review
router.put("/reviewEdit", async (req, res) => {
    try {
        const reviewToEdit = await reviewDB.findOne({
            reviewID: req.body.reviewID,
            listingID: req.body.listingID,
        });
        if (reviewToEdit == null) {
            return res.status(404).json({ message: "Cannot find review" });
        }

        reviewToEdit.reviewTitle = req.body.reviewTitle;
        reviewToEdit.reviewContent = req.body.reviewContent;
        reviewToEdit.reviewIMG = req.body.reviewIMG;
        reviewToEdit.reviewScore = req.body.reviewScore;
        reviewToEdit.wasEdited = true;

        await reviewToEdit.save();
        res.json({ message: "Review edited successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Deletes a review from the database
router.patch("/reviewMarkDelete", async (req, res) => {
    try {
        const review = await reviewDB.findOne({
            reviewID: req.body.reviewID,
            listingID: req.body.listingID,
        });
        if (review == null) {
            return res.status(404).json({ message: "Cannot find review" });
        } else {
            let reviewUser = await userDB.findOne({
                userID: review.userID,
            });
            if (reviewUser == null) {
                return res.status(404).json({ message: "Cannot find user" });
            }
            reviewUser.noOfReviews = reviewUser.noOfReviews - 1;
            review.isDeleted = true;
            await review.save();
            await reviewUser.save();
            res.json({ message: "Review deleted successfully!" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post("/reviewAdd", async (req, res) => {
    const review = new reviewDB({
        reviewID: req.body.reviewID,
        userID: req.body.userID,
        listingID: req.body.listingID,
        reviewTitle: req.body.reviewTitle,
        reviewContent: req.body.reviewContent,
        reviewIMG: req.body.reviewIMG,
        reviewScore: req.body.reviewScore,
        reviewDate: req.body.reviewDate,
        reviewMarkedHelpful: req.body.reviewMarkedHelpful,
        wasEdited: req.body.wasEdited,
        isDeleted: req.body.isDeleted,
    });
    try {
        const newReview = await review.save();
        res.status(201).json({ message: "Review added successfully!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Get all reviews of a specific listing
router.get("/reviewListing/:listingID", async (req, res) => {
    try {
        const reviewDatabase = await reviewDB.find({
            listingID: req.params.listingID,
            isDeleted: false,
        });
        res.json(reviewDatabase);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get a specific review given reviewID and listingID
router.get("/review/:reviewID/:listingID", async (req, res) => {
    try {
        const reviewDatabase = await reviewDB.findOne({
            reviewID: req.params.reviewID,
            listingID: req.params.listingID,
            isDeleted: false,
        });
        res.json(reviewDatabase);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get review of a specific user
router.get("/reviewUser/:userID", async (req, res) => {
    try {
        const reviewDatabase = await reviewDB.find({
            userID: req.params.userID,
            isDeleted: false,
        });
        res.json(reviewDatabase);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const reviewDatabase = await reviewDB.find({
            isDeleted: false,
        });
        res.json(reviewDatabase);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
