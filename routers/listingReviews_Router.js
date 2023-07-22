const express = require("express");
const router = express.Router();
const reviewDB = require("../model/listingReviews");
const userDB = require("../model/userInfos");
const upload = require("../modules/multerUpload");
const cloudinary = require("../modules/cloudinaryConnect");
const path = require("path");
const fs = require("fs");

//Edit a review
router.put("/reviewEdit/:img", upload.array("reviewImgs"), async (req, res) => {
    const editedReview = JSON.parse(req.body.editedReview);
    const reviewImgs = req.files;
    const imageCleared = req.params.img === "true";

    try {
        let editReviewResult = await editReview(
            editedReview,
            reviewImgs,
            imageCleared
        );

        if (!editReviewResult)
            return res.status(500).json({ message: "Error editing review" });
        else res.json({ message: "Review edited successfully!" });
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
                username: req.user.username,
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
router.post("/reviewAdd", upload.array("reviewImgs"), async (req, res) => {
    const reviewData = JSON.parse(req.body.newReview);
    const reviewImgs = req.files;

    try {
        let newReviewResult = await createNewReview(reviewData, reviewImgs);

        if (!newReviewResult)
            return res
                .status(500)
                .json({ message: "Error creating new review" });
        else res.json({ message: "Review added successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
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

//Get a new reviewID from a specific listing
router.get("/generateNewReviewID/:listingID", async (req, res) => {
    try {
        const reviewDatabase = await reviewDB.find({
            listingID: req.params.listingID,
        });
        let newReviewID = reviewDatabase.length + 1;
        res.json(newReviewID);
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

async function createNewReview(reviewData, reviewImgs) {
    try {
        //Upload the pictures to cloudinary
        let result = [];
        if (reviewImgs) {
            reviewImgs.forEach((reviewImg) => {
                const imageFileName = path.parse(reviewImg.originalname).name;
                // create new date object
                let date = new Date();
                let year = date.getFullYear();
                let month = (date.getMonth() + 1).toString().padStart(2, "0"); // months in JavaScript start from 0
                let day = date.getDate().toString().padStart(2, "0");
                let formattedDate = `${year}${month}${day}`;
                result.push(
                    cloudinary.uploader.upload(reviewImg.path, {
                        folder: `review/${reviewData.listingID}/${reviewData.reviewID}_${reviewData.userID}`,
                        public_id: `${formattedDate}_${imageFileName}`,
                    })
                );
            });
        }
        //Wait for all the pictures to be uploaded
        result = await Promise.all(result);
        //Extract url from the result
        let imgURLs = result.map((img) =>
            img.secure_url.replace("/upload/", "/upload/f_auto,q_auto/")
        );
        // Delete temp files
        reviewImgs.forEach((reviewImg) => {
            fs.unlink(reviewImg.path, (err) => {
                if (err) console.error("Error deleting file:", err);
                else console.log("File deleted:", reviewImg.path);
            });
        });

        //Create a new review
        const newReview = new reviewDB({
            reviewID: reviewData.reviewID,
            userID: reviewData.userID,
            listingID: reviewData.listingID,
            reviewTitle: reviewData.reviewTitle,
            reviewContent: reviewData.reviewContent,
            reviewIMG: imgURLs,
            reviewScore: reviewData.reviewScore,
            reviewDate: reviewData.reviewDate,
            reviewMarkedHelpful: reviewData.reviewMarkedHelpful,
            wasEdited: reviewData.wasEdited,
            isDeleted: reviewData.isDeleted,
        });

        //Update the user's number of reviews
        let user = await userDB.findOne({
            username: reviewData.userID,
        });
        if (user == null) {
            return false;
        }
        user.noOfReviews = user.noOfReviews + 1;

        await user.save();
        await newReview.save();

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function editReview(editedReview, reviewImages, imageCleared) {
    try {
        //Upload the pictures to cloudinary
        let result = [];
        if (reviewImages.length > 0) {
            reviewImages.forEach((reviewImg) => {
                const imageFileName = path.parse(reviewImg.originalname).name;
                // create new date object
                let date = new Date();
                let year = date.getFullYear();
                let month = (date.getMonth() + 1).toString().padStart(2, "0"); // months in JavaScript start from 0
                let day = date.getDate().toString().padStart(2, "0");
                let formattedDate = `${year}${month}${day}`;
                result.push(
                    cloudinary.uploader.upload(reviewImg.path, {
                        folder: `review/${editedReview.listingID}/${editedReview.reviewID}_${editedReview.userID}`,
                        public_id: `${formattedDate}_${imageFileName}`,
                        overwrite: true,
                    })
                );
            });
        }
        //Wait for all the pictures to be uploaded
        result = await Promise.all(result);

        //Extract url from the result
        let imgURLs = result.map((img) =>
            img.secure_url.replace("/upload/", "/upload/f_auto,q_auto/")
        );

        // Delete temp files
        reviewImages.forEach((reviewImg) => {
            fs.unlink(reviewImg.path, (err) => {
                if (err) console.error("Error deleting file:", err);
                else console.log("File deleted:", reviewImg.path);
            });
        });

        //Finally delete the old images
        if (imageCleared) {
            editedReview.reviewIMG.forEach((img) => {
                let publicID = img.split("/").pop().split(".")[0];
                cloudinary.uploader.destroy(publicID, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });
            });
        }

        //Update the review
        const reviewToEdit = await reviewDB.findOne({
            reviewID: editedReview.reviewID,
            listingID: editedReview.listingID,
        });
        if (reviewToEdit == null) {
            return false;
        }

        reviewToEdit.reviewTitle = editedReview.reviewTitle;
        reviewToEdit.reviewContent = editedReview.reviewContent;
        if (imageCleared) {
            reviewToEdit.reviewIMG = imgURLs;
        } else {
            reviewToEdit.reviewIMG.push(...imgURLs);
        }
        reviewToEdit.reviewScore = editedReview.reviewScore;
        reviewToEdit.wasEdited = true;

        await reviewToEdit.save();

        return true;
    } catch (err) {
        console.log(err);
        // Delete temp files regardless of error
        reviewImages.forEach((reviewImg) => {
            fs.unlink(reviewImg.path, (err) => {
                if (err) console.error("Error deleting file:", err);
                else console.log("File deleted:", reviewImg.path);
            });
        });
        return false;
    }
}

module.exports = router;
