const express = require("express");
const router = express.Router();
const listingDB = require("../model/listingDB");
const reviewDB = require("../model/reviewDB");

//Returns all listings
router.get("/", async (req, res) => {
    try {
        const listings = await listingDB.find();
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Return one listing based on id parameter
router.get("/listing/:id", async (req, res) => {
    const listingID = req.params.id;

    try {
        const listing = await listingDB.findOne({ listingID: listingID });
        if (listing == null) {
            return res.status(404).json({ message: "Cannot find listing" });
        }
        res.json(listing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Return listings based on URL parameters
router.get("/filtered-listings", async (req, res) => {
    let filters = req.query;
    console.log(filters);
    let query = {};

    if (filters.location) {
        query["location"] = { $regex: new RegExp(filters.location, "i") };
    }
    if (filters.searchType) {
        query["name"] = { $regex: new RegExp(filters.searchType, "i") };
    }
    if (filters.rating) {
        query["reviewScore"] = { $gte: Number(filters.rating) };
    }
    if (filters.minPrice) {
        query["minPrice"] = { $gte: Number(filters.minPrice) };
    }
    if (filters.maxPrice) {
        query["maxPrice"] = { $lte: Number(filters.maxPrice) };
    }

    try {
        let filteredListings = await listingDB.find(query);
        res.json(filteredListings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Update review score of a listing based on reviewDB listingID
router.patch("/listing-score/:id", async (req, res) => {
    const listingID = req.params.id;
    const reviews = await reviewDB.find({ listingID: listingID });

    if (reviews.length === 0) {
        return res
            .status(404)
            .json({ message: "No reviews found for this listing" });
    }

    let totalScore = 0;
    for (let i = 0; i < reviews.length; i++) {
        totalScore += reviews[i].reviewScore;
    }
    let averageScore = totalScore / reviews.length;

    try {
        await listingDB.findOneAndUpdate(
            { listingID: listingID },
            { $set: { reviewScore: averageScore } }
        );

        res.status(200).json({ message: "Review score updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Update review score of all listings
async function updateAllListingScores() {
    //Get distinct listingIDs from reviewDB
    const distinctListingIds = await reviewDB.distinct("listingID");
    const promises = distinctListingIds.map(async (listingID) => {
        //Find all reviews matching current listingID
        const reviews = await reviewDB.find({ listingID: listingID });
        if (reviews.length > 0) {
            //Calculate average review score
            let totalScore = 0;
            for (let i = 0; i < reviews.length; i++) {
                totalScore += reviews[i].reviewScore;
            }
            let averageScore = totalScore / reviews.length;

            // Try to update listingDB with the new average review score
            try {
                await listingDB.updateOne(
                    { listingID: listingID },
                    { $set: { reviewScore: averageScore } }
                );
            } catch (err) {
                console.error(
                    `Error updating listing ${listingID}: ${err.message}`
                );
            }
        }
    });

    // Wait until all updates are processed
    await Promise.all(promises);
}

module.exports = {
    router: router,
    updateAllListingScores: updateAllListingScores,
};
