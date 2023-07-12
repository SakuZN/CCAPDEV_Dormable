const multer = require("multer");
const path = require("path");

// Config for multer
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./temp_uploads");
    },
    filename: function (req, file, callback) {
        let date = Date.now(); // gets the current timestamp in milliseconds
        let newName = `${date}-${file.originalname}`;
        callback(null, newName);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
