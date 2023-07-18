const express = require("express");
const router = express.Router();
const passport = require("passport");
const userLoginInfoDB = require("../model/userLoginInfoDB");
const userDatabase = require("../model/userDB");
const listingAdminDB = require("../model/listingAdminDB");
const upload = require("../modules/multerUpload");
const argon2 = require("argon2");
const cloudinary = require("../modules/cloudinaryConnect");
const path = require("path");

//Handle Login
router.post("/login", passport.authenticate("local"), (req, res) => {
    const user = req.user;
    if (req.body.rememberMe) {
        //3 weeks
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 21;
    }
    req.session.save();
    res.json(user);
});

//Handle logout
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.clearCookie("userSession");
        res.json({ message: "Logged out successfully!" });
    });
});

//Handle Register
router.post("/register", upload.single("profilePic"), async (req, res) => {
    const userData = JSON.parse(req.body.userData);
    const credentials = JSON.parse(req.body.userInfo);

    //Check if email or username already exists
    const userExists = await existingUser(
        credentials.username,
        credentials.email,
        userLoginInfoDB
    );
    if (userExists) {
        return res.status(400).json({ message: "User already exists!" });
    }

    //Create a new user
    const newUser = await createNewUser(userData, credentials, req.file);

    if (newUser)
        return res.status(201).json({
            message: "Registered successfully! Please login to continue.",
        });
    else return res.status(500).json({ message: "Internal server error!" });
});

async function existingUser(username, email, Model) {
    const [checkEmail, checkUsername] = await Promise.all([
        Model.findOne({ email: email }),
        Model.findOne({ username: username }),
    ]);

    return !!(checkEmail || checkUsername);
}

async function createNewUser(data, info, profilePic) {
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
                folder: `users/${info.username}`,
            });
        }
        //Hash the password
        const hashedPassword = await argon2.hash(info.password);
        //Create a new user
        const newUser = new userLoginInfoDB({
            username: info.username,
            email: info.email,
            password: hashedPassword,
        });

        //Create a new user data
        const newUserData = new userDatabase({
            username: info.username,
            customName: data.customName,
            type: data.type,
            description: data.description,
            profilePic: result ? result.url : undefined,
            joinDate: data.joinDate,
            noOfReviews: data.noOfReviews,
            followers: data.followers,
            liked: data.liked,
            following: data.following,
            college: data.college,
            course: data.course,
        });
        //Save the new user data
        await newUserData.save();
        //Save the new user
        await newUser.save();

        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports = router;
