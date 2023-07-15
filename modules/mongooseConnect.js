require("dotenv").config();
const path = require("path");
const { mongoose } = require("mongoose");

async function connectDB(retries = 5) {
    const USERNAME = process.env.DB_USER;
    const PASSWORD = process.env.DB_PASSWORD;

    const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@dormabledb.gxbndyi.mongodb.net/DormableDB?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB successfully connected...");
    } catch (err) {
        if (retries === 0) {
            console.error("MongoDB connection error. All retries failed.", err);
            throw err;
        } else {
            console.log(
                `MongoDB connection failed. Retrying (${retries} retries left)`
            );

            // Retry after 5 seconds (5000 milliseconds)
            setTimeout(() => connectDB(retries - 1), 1000);
        }
    }
}

module.exports = connectDB;
