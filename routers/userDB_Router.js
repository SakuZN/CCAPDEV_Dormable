const express = require("express");
const router = express.Router();
const userDB = require("../model/userDB");
const upload = require("../modules/multerUpload");
const cloudinary = require("../modules/cloudinaryConnect");
const path = require("path");
const fs = require("fs");

//Return current user's information based on the sessionID
router.get("/current-user", (req, res) => {
    if (!req.session.userID) {
        return res.status(401).json({ message: "Not Logged In" });
    }

    //Find the user's data in the userDB
    userDB
        .findOne({ username: req.session.userID })
        .then((user) => {
            // Send the user's data to the client
            res.json(user);
        })
        .catch((err) => {
            return res.status(500).json({ message: err.message });
        });
});

//Update a specific user's info
router.put("/update", upload.single("profilePic"), async (req, res) => {
    const userData = JSON.parse(req.body.userData);
    const profilePic = req.file;

    try {
        if (profilePic) {
            const result = await cloudinary.uploader.upload(profilePic.path, {
                public_id:
                    userData.username +
                    "_" +
                    path.parse(profilePic.originalname).name,
            });

            // Check for old picture and delete it
            if (userData.profilePic) {
                const urlParts = new URL(userData.profilePic).pathname.split(
                    "/"
                );
                const oldPicId = path.parse(urlParts[urlParts.length - 1]).name;
                // Delete old pic from Cloudinary
                await cloudinary.uploader.destroy(
                    oldPicId,
                    function (error, result) {
                        if (error) {
                            return res
                                .status(500)
                                .send({ message: error.message });
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
        }

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

//Update reviewCount of user
router.patch("/users/review/:username", async (req, res) => {
    try {
        const user = await userDB.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).send({
                message: `No user found with username: ${req.params.username}`,
            });
        }

        user.noOfReviews = user.noOfReviews + 1;

        await user.save();

        res.status(200).send({ message: "Review count updated successfully!" });
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

module.exports = router;
