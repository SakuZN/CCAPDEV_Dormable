/* ==============================================================
   IMPORTS AND CONFIGURATION
   ============================================================== */
const express = require("express");
const session = require("./modules/userSession");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

//Mongoose connection to DormableDB
const mongoDB = require("./modules/mongooseConnect");

//Session configuration
app.use(session);
// Use middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Redirect http to https
app.use(function (req, res, next) {
    if (
        req.get("x-forwarded-proto") !== "https" &&
        app.get("env") === "production"
    ) {
        res.redirect(`https://${req.hostname}${req.url}`);
    } else {
        next();
    }
});

//Routers for each collection
const listingDB_Router = require("./routers/listingDB_Router");
const listingOwnerDB_Router = require("./routers/listingOwnerDB_Router");
const listingAdminDB_Router = require("./routers/listingAdminDB_Router");
const userDB_Router = require("./routers/userDB_Router");
const userLoginInfoDB_Router = require("./routers/userLoginInfoDB_Router");

//Middleware for static assets
app.use("/vendor", express.static(path.join(__dirname, "vendor")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
// app.use("/web_pages", express.static(path.join(__dirname, "web_pages")));

/* ==============================================================
   FETCH/WRITE REQUESTS TO DATABASE FOR EACH COLLECTION
   ============================================================== */
app.use("/api/listingDB", listingDB_Router.router);
app.use("/api/listingOwnerDB", listingOwnerDB_Router);
app.use("/api/listingAdminDB", listingAdminDB_Router);
app.use("/api/userDB", userDB_Router);
app.use("/api/loginForm", userLoginInfoDB_Router);

/* ==============================================================
   ROUTES TO INDIVIDUAL PAGES
   ============================================================== */
app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "index.html"));
});

app.get("/404", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "404.html"));
});

app.get("/explore-listing", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "explore-listing.html"));
});

app.get("/listing", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "listing.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "login.html"));
});

app.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "profile.html"));
});

app.get("/request-listing", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "request-listing.html"));
});

app.get("/search-result", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "search-result.html"));
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
    res.status(404).sendFile(path.join(__dirname, "/web_pages/404.html"));
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
    await listingDB_Router.updateAllListingScores();

    console.log(
        `Server is running on port ${PORT} at http://localhost:${PORT}`
    );

    setInterval(listingDB_Router.updateAllListingScores, 1000 * 60 * 30);
});
