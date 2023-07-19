// sessionConfig.js
require("dotenv").config();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@dormabledb.gxbndyi.mongodb.net/DormableDB?retryWrites=true&w=majority`;

const store = new MongoDBStore({
    uri: uri,
    collection: "userSessions",
});

store.on("error", function (error) {
    console.log(error);
});

const sessionConfig = session({
    name: "userSession",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: store,
    proxy: process.env.NODE_ENV === "production", // it is 'true' in production, otherwise 'false'
    cookie: {
        maxAge: null,
        sameSite: "lax", // or 'strict'
        secure: process.env.NODE_ENV === "production", // it is 'true' in production, otherwise 'false'
    },
});

module.exports = sessionConfig;
