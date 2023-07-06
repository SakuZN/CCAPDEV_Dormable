const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

//Middleware for static assets
app.use("/vendor", express.static(path.join(__dirname, "vendor")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
// app.use("/web_pages", express.static(path.join(__dirname, "web_pages")));

//Routes to individual pages
app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "index.html"));
});

app.get("/404.html", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "404.html"));
});

app.get("/explore-listing.html", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "explore-listing.html"));
});

app.get("/listing.html", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "listing.html"));
});

app.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "login.html"));
});

app.get("/profile.html", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "profile.html"));
});

app.get("/request-listing.html", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "request-listing.html"));
});

app.get("/search-result.html", (req, res) => {
    res.sendFile(path.join(__dirname, "web_pages", "search-result.html"));
});

//Listening to the server
app.listen(PORT, () => {
    console.log(
        `Server is running on port ${PORT} at http://localhost:${PORT}`
    );
});

//Make 404 request refer to custom 404 page
app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, "/web_pages/404.html"));
});

console.log(`Current directory: ${process.cwd()}`);
console.log(`__dirname: ${__dirname}`);
