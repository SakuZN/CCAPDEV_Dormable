const express = require("express");
const router = express.Router();
const userLoginInfoDB = require("../model/userLoginInfoDB");
const userDatabase = require("../model/userDB");
const listingAdminDB = require("../model/listingAdminDB");
const upload = require("../modules/multerUpload");
const argon2 = require("argon2");
const cloudinary = require("../modules/cloudinaryConnect");
const path = require("path");

const isValidPassword = (plaintextPassword, hashedPassword) => {
    return argon2.verify(hashedPassword, plaintextPassword);
};
router.get("/", async (req, res) => {
    try {
        const userLoginInfo = await userLoginInfoDB.find();
        res.json(userLoginInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Handle Login
router.post("/login", async (req, res) => {
    //Get the needed data
    const { email, password, rememberMe } = req.body;
    //Validate if email or password field is empty
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    } else if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        let user = await authenticate(email, password, userLoginInfoDB);

        if (!user) {
            user = await authenticate(email, password, listingAdminDB);
        }

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        req.session.userID = user.username;
        if (rememberMe) {
            req.session.cookie.maxAge = new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
            );
        }
        req.session.save();

        //Once saved, send the user's data to the client
        res.json(user);
    } catch (Err) {
        // Handle error
        console.log(Err);
        res.status(500).json({ message: "Internal server error!" });
    }
});

//Handle logout
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

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

//Helper function to authenticate user

async function authenticate(email, password, Model) {
    // Check if the email exists in the given Model
    const user = await Model.findOne({ email: email });
    if (!user) {
        return false;
    }
    // Validate password
    const validPassword = await isValidPassword(password, user.password);
    if (!validPassword) {
        return false;
    }

    return user;
}

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
        if (profilePic) {
            const uniqueFilename = path.parse(profilePic.originalname).name;
            result = await cloudinary.uploader.upload(profilePic.path, {
                public_id: uniqueFilename,
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
