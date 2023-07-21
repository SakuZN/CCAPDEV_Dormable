const LocalStrategy = require("passport-local").Strategy;
const argon2 = require("argon2");
const userLoginInfoDB = require("../model/userLoginInfo");
const listingAdminDB = require("../model/listingAdmins");
const userDatabase = require("../model/userInfos");
const listingOwnerDB = require("../model/listingOwners");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                // Try to find the user with the provided email
                let user = await userLoginInfoDB.findOne({ email: email });

                // If no user is found, try to find the admin
                if (!user) {
                    user = await listingAdminDB.findOne({ email: email });
                }

                // If the user (or admin) was found and the password is correct, return the user
                if (user && (await argon2.verify(user.password, password))) {
                    return done(null, user);
                }

                // If no user or admin is found, or the password is incorrect, return an error
                return done(null, false, {
                    message: "Incorrect email or password.",
                });
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser(async (username, done) => {
        let user = await userDatabase.findOne({ username: username });
        if (!user) user = await listingOwnerDB.findOne({ username: username });
        done(null, user);
    });
};
