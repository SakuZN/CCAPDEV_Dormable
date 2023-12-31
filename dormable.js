/* ==============================================================
   IMPORTS AND CONFIGURATION
   ============================================================== */
const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
require("./modules/passportConfig")(passport);
const session = require("./modules/userSession");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

//Mongoose connection to DormableDB
const mongoDB = require("./modules/mongooseConnect");

//Session configuration
app.use(cookieParser());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// Use middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Redirect http to https
if (app.get("env") === "production" || process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1); // trust first proxy, crucial
}
app.use(function (req, res, next) {
    if (
        req.get("x-forwarded-proto") !== "https" &&
        (app.get("env") === "production" ||
            process.env.NODE_ENV === "production")
    ) {
        res.redirect(`https://${req.hostname}${req.url}`);
    } else {
        next();
    }
});

//Routers for each collection
const listingDB_Router = require("./routers/listings_Router");
const listingOwnerDB_Router = require("./routers/listingOwners_Router");
const listingAdminDB_Router = require("./routers/listingAdmins_Router");
const userDB_Router = require("./routers/userInfos_Router");
const userLoginInfoDB_Router = require("./routers/userLoginInfo_Router");
const ownerResponseDB_Router = require("./routers/ownerResponse_Router");
const reviewDB_Router = require("./routers/listingReviews_Router");

//Middleware for static assets
//app.use("/vendor", express.static(path.join(__dirname, "vendor")));
//app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "dist")));

/* ==============================================================
   FETCH/WRITE REQUESTS TO DATABASE FOR EACH COLLECTION
   ============================================================== */
app.use("/api/listingDB", listingDB_Router.router);
app.use("/api/listingOwnerDB", listingOwnerDB_Router);
app.use("/api/listingAdminDB", listingAdminDB_Router);
app.use("/api/userDB", userDB_Router.router);
app.use("/api/loginForm", userLoginInfoDB_Router);
app.use("/api/reviewDB", reviewDB_Router);
app.use("/api/ownerResponseDB", ownerResponseDB_Router);

/* ==============================================================
   ROUTES TO INDIVIDUAL PAGES
   ============================================================== */
app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/404", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "404.html"));
});

app.get("/explore-listing", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "explore-listing.html"));
});

app.get("/listing", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "listing.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "login.html"));
});

app.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "profile.html"));
});

app.get("/request-listing", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "request-listing.html"));
});

app.get("/search-result", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "search-result.html"));
});

app.get("/about-us", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "about-us.html"));
});

/* ==============================================================
   MISC CONFIGURATION
   ============================================================== */

//Make index.html the default page
app.get("/", (req, res) => {
    res.redirect("/index");
});
app.get("/index.html", (req, res) => {
    res.redirect("/index");
});

//Make 404 request refer to custom 404 page
app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, "./dist/404.html"));
});

//remove .html from the url
//app.use(express.static(__dirname + "/web_pages", { extensions: ["html"] }));

console.log(`Current directory: ${process.cwd()}`);
console.log(`__dirname: ${__dirname}`);

/* ==============================================================
    START SERVER
   ==============================================================*/
//Listening to the server
app.listen(PORT, async () => {
    await mongoDB(3);
    console.log(
        `Server is running on port ${PORT} at http://localhost:${PORT}`
    );

    setInterval(listingDB_Router.updateAllListingScores, 1000 * 60 * 30);
    setInterval(userDB_Router.periodicUserInfoUpdate, 1000 * 60 * 60 * 24);
});
