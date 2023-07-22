const express = require("express");
const router = express.Router();
const userDB = require("../model/userInfos");
const reviewDB = require("../model/listingReviews");
const listingOwnerDB = require("../model/listingOwners");
const upload = require("../modules/multerUpload");
const cloudinary = require("../modules/cloudinaryConnect");
const path = require("path");
const fs = require("fs");

//Return current user's information based on the sessionID
router.get("/current-user", (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.json(false);
    }
});

//Update a specific user's info
router.put("/update", upload.single("profilePic"), async (req, res) => {
    const userData = JSON.parse(req.body.userData);
    const profilePic = req.file;

    try {
        //Upload the profile picture to cloudinary
        let result;
        let date = new Date();
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, "0"); // months in JavaScript start from 0
        let day = date.getDate().toString().padStart(2, "0");
        let formattedDate = `${year}${month}${day}`;

        if (profilePic) {
            const uniqueFilename = path.parse(profilePic.originalname).name;
            result = await cloudinary.uploader.upload(profilePic.path, {
                public_id: `${formattedDate}_${uniqueFilename}`,
                folder: `users/${userData.username}`,
            });
        }

        // Check for old picture and delete it
        if (userData.profilePic) {
            let oldPicID = userData.profilePic.split("/").pop().split(".")[0];
            // Delete old pic from Cloudinary
            await cloudinary.uploader.destroy(
                oldPicID,
                function (error, result) {
                    if (error) {
                        return res.status(500).send({ message: error.message });
                    }
                }
            );
        }

        userData.profilePic = result.secure_url;

        //Deletes the temporary file
        fs.unlink(profilePic.path, (err) => {
            if (err) {
                console.log("Error while deleting temporary file:", err);
            }
        });

        const { username, ...rest } = userData;

        let updatedUser = await userDB.findOneAndUpdate(
            { username: username },
            rest,
            { new: true }
        );
        if (!updatedUser) {
            return res
                .status(404)
                .send({ message: `No user found with username: ${username}` });
        }
        //Send a message that the user has been updated
        res.status(200).send({ message: "Profile updated successfully!" });
    } catch (err) {
        fs.unlink(profilePic.path, (err) => {
            if (err) {
                console.log("Error while deleting temporary file:", err);
            }
        });
        res.status(500).send({ message: err.message });
    }
});

//Get specific user if exists
router.get("/users/:username", (req, res) => {
    //Find the user's data in the userDB
    userDB
        .findOne({ username: req.params.username })
        .then((user) => {
            // Send status that user exists
            res.json(user);
        })
        .catch((err) => {
            return res.status(500).json({ message: err.message });
        });
});

//Update liked reviews of user and the user of the liked review
router.patch("/users/reviewLiked", async (req, res) => {
    const reviewUserID = req.body.userID;
    const reviewID = req.body.reviewID;
    const listingID = req.body.listingID;
    const currentUser = req.user.username;

    // Find the currentUser and patch the liked review
    try {
        const user = await userDB.findOne({ username: currentUser });
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

//Follow a user
router.patch("/users/follow/:id", async (req, res) => {
    let userToFollow = req.params.id;
    let currentUser = req.user.username;

    try {
        const user = await userDB.findOne({ username: currentUser });
        let followedUser = await userDB.findOne({ username: userToFollow });
        if (!user) {
            return res.status(404).send({
                message: `No user found with username: ${currentUser}`,
            });
            //If initially can't find in userDB, check listingOwnerDB
        }
        if (!followedUser) {
            followedUser = await listingOwnerDB.findOne({
                username: userToFollow,
            });
            if (!followedUser) {
                return res.status(404).send({
                    message: `No user found with username: ${userToFollow}`,
                });
            }
        }
        const index = user.following.findIndex(
            (following) => following === userToFollow
        );

        if (index === -1) {
            user.following.push(userToFollow);
            followedUser.followers = followedUser.followers + 1;
        } else {
            user.following.splice(index, 1);
            followedUser.followers = followedUser.followers - 1;
        }

        // Save changes
        await user.save();
        await followedUser.save();

        res.status(200).send({
            message: "User follow status has been updated!",
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

//Returns all user Information
router.get("/", async (req, res) => {
    try {
        const user = await userDB.find();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const auth = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "User is not logged in / authenticated!" });
};

async function periodicUserInfoUpdate() {
    try {
        const users = await userDB.find();
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            let userReviews = await reviewDB.find({
                userID: user.username,
                isDeleted: false,
            });
            user.noOfReviews = userReviews.length;
            await user.save();
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    router: router,
    periodicUserInfoUpdate: periodicUserInfoUpdate,
};
