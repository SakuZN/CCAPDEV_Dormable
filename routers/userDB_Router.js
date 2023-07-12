const express = require("express");
const router = express.Router();
const userDB = require("../model/userDB");

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

//Logouts user by clearing the sessionID
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.clearCookie("userSession");
        res.json({ message: "Logged out successfully!" });
    });
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
