require("dotenv").config();
const path = require("path");
const { mongoose } = require("mongoose");

async function connectDB() {
    const USERNAME = process.env.DB_USER;
    const PASSWORD = process.env.DB_PASSWORD;

    const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@dormabledb.gxbndyi.mongodb.net/DormableDB?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;
