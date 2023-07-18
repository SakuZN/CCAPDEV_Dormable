const express = require("express");
const router = express.Router();
const listingOwnerDB = require("../model/listingOwnerDB");
const reviewDB = require("../model/reviewDB");

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
//Update liked reviews of user and the user of the liked review
router.patch("/owner/review/reviewLiked", async (req, res) => {
    const reviewUserID = req.body.userID;
    const reviewID = req.body.reviewID;
    const listingID = req.body.listingID;
    const currentUser = req.user.username;

    // Find the currentUser and patch the liked review
    try {
        const user = await listingOwnerDB.findOne({ username: currentUser });
        if (!user) {
            return res.status(404).send({
                message: `No user found with username: ${currentUser}`,
            });
        }

        const index = user.liked.findIndex(
            (liked) =>
                liked.reviewID === reviewID &&
                liked.listingID === listingID &&
                liked.userID === reviewUserID
        );

        // find review
        const reviewToUpdate = await reviewDB.findOne({
            reviewID: reviewID,
            listingID: listingID,
            userID: reviewUserID,
        });

        if (index === -1) {
            user.liked.push({ reviewID, listingID, userID: reviewUserID });
            reviewToUpdate.reviewMarkedHelpful += 1;
        } else {
            user.liked.splice(index, 1);
            reviewToUpdate.reviewMarkedHelpful -= 1;
        }

        // Save changes
        await user.save();
        await reviewToUpdate.save();

        res.status(200).send({
            message: "Review like status has been updated!",
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;
