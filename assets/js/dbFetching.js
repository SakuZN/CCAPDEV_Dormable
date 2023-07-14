/* ==============================================================
   BASE CRUD OPERATIONS FOR LISTING DATABASE
   ============================================================== */

async function getListingDatabase() {
    const listingDB = await fetch("/api/listingDB");
    if (listingDB.ok) return await listingDB.json();
    else console.error("Error fetching listingDB:", listingDB);
}

/* ==============================================================
   LISTING DATABASE FUNCTIONS USED BY VARIOUS SCRIPTS AND PAGES
   ============================================================== */

//Function that will return a specific listing from the database based on the listing ID
async function getSpecificListing(listingID) {
    const specificListing = await fetch("/api/listingDB/listing/" + listingID);
    if (specificListing.ok) return await specificListing.json();
    else console.error("Error fetching specific listing:", specificListing);
}

// Function that will check if the listing ID is valid and exists in the database
async function checkIfValidListingID(listingID) {
    const listings = await getListingDatabase();
    return listings.some((listing) => listing.listingID === listingID);
}

// Function that will find the listings of the owner
async function getOwnerSpecificListings(ownerID) {
    const listings = await getListingDatabase();
    return listings.filter(
        (ownerListings) => ownerListings.ownerID === ownerID
    );
}

// Function that will update the review scores of the listings in the database
async function updateListingReviewScore(listingID) {
    let response = await fetch("/api/listingDB/listing-score/" + listingID, {
        method: "PATCH",
    });
    let message = await response.json();
    if (!response.ok)
        console.error("Error updating listing review score:", message);
    else console.log("Listing review score updated:", message);
}

/* ==============================================================
   BASE CRUD OPERATIONS FOR USER DATABASE
   ============================================================== */
async function getUserDatabase() {
    let response = await fetch("/api/userDB");
    if (response.ok) return await response.json();
    else console.error("Error fetching userDB:", response);
}

/* ==============================================================
   USER DATABASE FUNCTIONS USED BY VARIOUS SCRIPTS AND PAGES
   ============================================================== */

//Updates the given user in the database
async function updateUser(user, profilePic) {
    let userData = new FormData();
    userData.append("profilePic", profilePic);
    userData.append("userData", JSON.stringify(user));
    let response = await fetch("/api/userDB/update", {
        method: "PUT",
        body: userData,
    });
    let message = await response.json();
    if (!response.ok) {
        await showPopup(message.message);
    } else {
        await showPopup(message.message);
    }
}

//Updates the given user's review count in the database
async function updateUserReviewCount(userID) {
    let response = await fetch(`api/userDB/users/review/${userID}`);
    let message = await response.json();
    if (!response.ok) console.error(message.message);
    else console.log(message.message);
}

//Updates the given user's liked review in the database
async function updateLikedReviews(userID, reviewID, listingID) {
    let userData = {
        userID: userID,
        reviewID: reviewID,
        listingID: listingID,
    };

    let response = await fetch("/api/userDB/users/reviewLiked", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    let message = await response.json();
    if (!response.ok) console.error(message.message);
    else console.log(message.message);
}

// Checks if the current User is following the given user
async function isFollowingUser(userID) {
    let currentUser = await getCurrentUser();
    if (!currentUser) {
        return false;
    }
    return currentUser.following.some((following) => following === userID);
}

// Follows the given user
async function followUser(userID) {
    let response = await fetch("/api/userDB/users/follow/" + userID, {
        method: "PATCH",
    });
    let message = await response.json();
    if (!response.ok) console.error(message.message);
    else console.log(message.message);
}

// Gets the specific user from the database
async function getSpecificUser(userID) {
    const response = await fetch("/api/userDB/users/" + userID);
    if (response.ok) return await response.json();
    else console.error("Error fetching specific user:", response);
}

/* ==============================================================
   BASE CRUD OPERATIONS FOR LISTING REVIEW DATABASE
   ============================================================== */

async function getListingReviewDatabase() {
    const listingDB = await fetch("/api/reviewDB");
    if (listingDB.ok) return await listingDB.json();
    else console.error("Error fetching listingDB:", listingDB);
}

/* ==============================================================
   FUNCTION OPERATIONS FOR LISTING REVIEW DATABASE
   ============================================================== */
async function generateReviewID(listingID) {
    let reviewDatabase = await getListingReviewDatabase();
    let listingReviews = reviewDatabase.filter(
        (review) => review.listingID === listingID
    );
    return listingReviews.length + 1;
}

async function addListingReview(review) {
    let response = await fetch("/api/reviewDB/reviewAdd", {
        method: "POST",
        body: JSON.stringify(review),
        headers: { "Content-Type": "application/json" },
    });
    let message = await response.json();
    if (!response.ok) console.error(message.message);
    else console.log(message.message);
}

async function deleteListingReview(reviewID, listingID) {
    let userData = {
        reviewID: reviewID,
        listingID: listingID,
    };

    let response = await fetch("/api/reviewDB/reviewMarkDelete", {
        method: "PATCH",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
    });

    let message = await response.json();
    if (!response.ok) console.error(message.message);
    else console.log(message.message);
}

async function checkIfLikedReview(reviewID, listingID, userID) {
    let currentUser = await getCurrentUser();
    if (!currentUser) return false;
    return currentUser.liked.some(
        (likedReview) =>
            likedReview.reviewID === reviewID &&
            likedReview.listingID === listingID &&
            likedReview.userID === userID
    );
}

async function editListingReview(reviewToEdit) {
    let response = await fetch("/api/reviewDB/reviewEdit", {
        method: "PUT",
        body: JSON.stringify(reviewToEdit),
        headers: { "Content-Type": "application/json" },
    });
    let message = await response.json();
    if (!response.ok) console.error(message.message);
    else console.log(message.message);
}

//Gets all the review of a specific user
async function getUserReviews(userID) {
    let response = await fetch("/api/reviewDB/reviewUser/" + userID);
    if (response.ok) return await response.json();
    else console.error("Error fetching user reviews:", response);
}

//Gets a specific review, userID is not needed as it's not a primary identifier
async function getSpecificUserReview(listingID, reviewID) {
    let response = await fetch(`api/reviewDB/review/${reviewID}/${listingID}`);
    if (response.ok) return await response.json();
    else console.error("Error fetching specific user review:", response);
}

async function getListingReviews(listingID) {
    let response = await fetch("/api/reviewDB/reviewListing/" + listingID);
    if (response.ok) return await response.json();
    else console.error("Error fetching listing reviews:", response);
}

/* ==============================================================
   BASE CRUD OPERATIONS FOR LISTING OWNER DATABASE
   ============================================================== */

/* ==============================================================
   FUNCTION OPERATIONS FOR LISTING OWNER DATABASE
   ============================================================== */

async function getSpecificListingOwner(ownerID) {
    let response = await fetch("/api/listingOwnerDB/owner/" + ownerID);
    if (response.ok) return await response.json();
    else console.error("Error fetching specific listing owner:", response);
}

async function checkIfSameOwnerID(ownerID) {
    let currentUser = await getCurrentUser();
    if (currentUser) {
        return ownerID === currentUser.username;
    } else return false;
}

async function checkIfOwnerExist(ownerID) {
    const response = await fetch(`/api/listingOwnerDB/owner/${ownerID}`);
    const data = await response.json();
    return !!data;
}

/* ==============================================================
   BASE CRUD OPERATIONS FOR OWNER RESPONSE DATABASE
   ============================================================== */

async function getOwnerResponseDatabase() {
    let response = await fetch("/api/ownerResponseDB");
    if (response.ok) return await response.json();
    else console.error("Error fetching owner response database:", response);
}

function setOwnerResponseDatabase(ownerResponseDatabase) {
    localStorage.setItem(
        "ownerResponseDatabase",
        JSON.stringify(ownerResponseDatabase)
    );
}

/* ==============================================================
   FUNCTION OPERATIONS FOR OWNER RESPONSE DATABASE
   ============================================================== */

async function getSpecificOwnerResponses(ownerID) {
    const ownerResponses = await getOwnerResponseDatabase();
    return ownerResponses.find(
        (ownerResponse) => ownerResponse.ownerID === ownerID
    );
}

async function checkIfCommented(reviewID, listingID, userID) {
    let response = await fetch(
        `/api/ownerResponseDB/response/${reviewID}/${listingID}/${userID}`
    );
    return !!(response.ok && (await response.json()));
}

async function getReviewResponse(reviewID, listingID, userID) {
    let response = await fetch(
        `/api/ownerResponseDB/response/${reviewID}/${listingID}/${userID}`
    );
    if (response.ok) return await response.json();
    else console.error("Error fetching review response:", response);
}

async function addNewOwnerResponse(ownerResponse) {
    let response = await fetch("/api/ownerResponseDB/responseAdd", {
        method: "POST",
        body: JSON.stringify(ownerResponse),
        headers: { "Content-Type": "application/json" },
    });
    let message = await response.json();
    if (!response.ok) console.error(message.message);
    else console.log(message.message);
}

/* ==============================================================
   REGISTER FUNCTIONS
   ============================================================== */

async function checkIfSameUserID(userID) {
    let currentUser = await getCurrentUser();
    if (currentUser) {
        return userID === currentUser.username;
    }
    return false;
}

async function checkExistingUsername(username) {
    const response = await fetch(`api/userDB/users/${username}`);
    const user = await response.json();
    return !!user;
}

/* ==============================================================
   USER SESSION FUNCTIONS
   ============================================================== */

async function getCurrentUser() {
    let response = await fetch("api/userDB/current-user");
    if (!response.ok) return false;
    return await response.json();
}

async function logoutSession() {
    let response = await fetch("api/loginForm/logout");
    if (!response.ok) return false;
    let message = await response.json();
    return message.message;
}

/* ==============================================================
   MISC FUNCTION
   ============================================================== */
function reviewDate(date) {
    let currentDate = new Date();
    let userDate = new Date(date);
    let timeDiff = Math.abs(currentDate.getTime() - userDate.getTime());
    let minutes = Math.floor(timeDiff / (1000 * 60));
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let weeks = Math.floor(days / 7);
    let months = Math.floor(days / 30);
    let years = Math.floor(days / 365);

    if (minutes < 1) {
        return "Just now";
    } else if (minutes < 60) {
        return minutes + " minutes ago";
    } else if (hours < 24) {
        return hours + " hours ago";
    } else if (days < 7) {
        return days + " days ago";
    } else if (weeks < 4) {
        return weeks + " weeks ago";
    } else if (months < 12) {
        return months + " months ago";
    } else {
        return years + " years ago";
    }
}
