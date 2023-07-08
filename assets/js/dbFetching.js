/* ==============================================================
   BASE CRUD OPERATIONS FOR LISTING DATABASE
   ============================================================== */

async function getListingDatabase() {
    const listingDB = await fetch("/api/listingDB");
    if (listingDB.ok) return await listingDB.json();
    else console.error("Error fetching listingDB:", listingDB);
}

function setListingDatabase(listingDatabase) {
    localStorage.setItem("listingDatabase", JSON.stringify(listingDatabase));
}

/* ==============================================================
   LISTING DATABASE FUNCTIONS USED BY VARIOUS SCRIPTS AND PAGES
   ============================================================== */

//Function that will return a specific listing from the database based on the listing ID
async function getSpecificListing(listingID) {
    const specificListing = await fetch("/api/listingDB/" + listingID);
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
async function updateListingReviewScore() {
    let listingDatabase = await getListingDatabase();
    let reviewDatabase = getListingReviewDatabase();

    listingDatabase.forEach((listing) => {
        let reviews = reviewDatabase.filter(
            (review) =>
                review.listingID === listing.listingID &&
                review.isDeleted === false
        );
        let totalScore = 0;
        reviews.forEach((review) => (totalScore += review.reviewScore));
        listing.reviewScore = totalScore / reviews.length;
        listing.reviews = reviews.length;
    });
    setListingDatabase(listingDatabase);
}

/* ==============================================================
   BASE CRUD OPERATIONS FOR USER DATABASE
   ============================================================== */
function getUserDatabase() {
    return JSON.parse(localStorage.getItem("userDatabase"));
}

function setUserDatabase(userDatabase) {
    localStorage.setItem("userDatabase", JSON.stringify(userDatabase));
}

/* ==============================================================
   USER DATABASE FUNCTIONS USED BY VARIOUS SCRIPTS AND PAGES
   ============================================================== */

//Updates the given user in the database
function updateUserDatabase(user) {
    let userDatabase = getUserDatabase();

    let userIndex = userDatabase.findIndex((x) => x.username === user.username);

    if (userIndex === -1) {
        console.error("User not found in database:", user);
        return;
    }

    userDatabase[userIndex] = user;
    setUserDatabase(userDatabase);

    if (isInLocalStorage()) setLocalStorage(userDatabase[userIndex]);
    else setSessionStorage(userDatabase[userIndex]);
}

//Updates the given user's review count in the database
function updateUserReviewCount(userID) {
    let userDatabase = getUserDatabase();
    let userIndex = userDatabase.findIndex((x) => x.username === userID);
    userDatabase[userIndex].noOfReviews++;
    setUserDatabase(userDatabase);

    if (isInLocalStorage()) setLocalStorage(userDatabase[userIndex]);
    else setSessionStorage(userDatabase[userIndex]);
}

//Updates the given user's liked review in the database
function updateLikedReviews(userID, reviewID, listingID) {
    let currentUser = getCurrentUser();
    let userDatabase = getUserDatabase();
    let userIndex = userDatabase.findIndex(
        (x) => x.username === currentUser.username
    );
    let likedReview = {
        userID: userID,
        reviewID: reviewID,
        listingID: listingID,
    };
    let index = userDatabase[userIndex].liked.findIndex(
        (liked) =>
            liked.userID === likedReview.userID &&
            liked.reviewID === likedReview.reviewID &&
            liked.listingID === likedReview.listingID
    );

    if (index !== -1) {
        userDatabase[userIndex].liked.splice(index, 1);
    } else {
        userDatabase[userIndex].liked.push(likedReview);
    }

    setUserDatabase(userDatabase);

    if (isInLocalStorage()) setLocalStorage(userDatabase[userIndex]);
    else setSessionStorage(userDatabase[userIndex]);
}

// Checks if the current User is following the given user
function isFollowingUser(userID) {
    let currentUser = getCurrentUser();
    if (!currentUser) {
        return false;
    }
    return currentUser.following.some((following) => following === userID);
}

// Follows the given user
function followUser(userID) {
    let currentUser = getCurrentUser();
    let userDatabase = getUserDatabase();
    let toFollow = userDatabase.find((user) => user.username === userID);
    let toFollowIndex = userDatabase.findIndex((x) => x.username === userID);
    let userIndex = userDatabase.findIndex(
        (x) => x.username === currentUser.username
    );

    let index = userDatabase[userIndex].following.findIndex(
        (following) => following === toFollow.username
    );

    if (index !== -1) {
        userDatabase[userIndex].following.splice(index, 1);
        toFollow.followers--;
    } else {
        userDatabase[userIndex].following.push(toFollow.username);
        toFollow.followers++;
    }

    userDatabase[toFollowIndex] = toFollow;

    setUserDatabase(userDatabase);

    if (isInLocalStorage()) setLocalStorage(userDatabase[userIndex]);
    else setSessionStorage(userDatabase[userIndex]);
}

// Gets the specific user from the database
function getSpecificUser(userID) {
    const users = getUserDatabase();
    return users.find((user) => user.username === userID);
}

/* ==============================================================
   BASE CRUD OPERATIONS FOR LISTING REVIEW DATABASE
   ============================================================== */

function getListingReviewDatabase() {
    return JSON.parse(localStorage.getItem("reviewDatabase"));
}

function setListingReviewDatabase(reviewDatabase) {
    localStorage.setItem("reviewDatabase", JSON.stringify(reviewDatabase));
}

/* ==============================================================
   FUNCTION OPERATIONS FOR LISTING REVIEW DATABASE
   ============================================================== */
function generateReviewID(listingID) {
    let reviewDatabase = getListingReviewDatabase();
    let listingReviews = reviewDatabase.filter(
        (review) => review.listingID === listingID
    );
    return listingReviews.length + 1;
}

function addListingReview(review) {
    let reviewDatabase = getListingReviewDatabase();
    reviewDatabase.push(review);
    setListingReviewDatabase(reviewDatabase);
}

function deleteListingReview(reviewID, listingID) {
    let reviewDatabase = getListingReviewDatabase();
    let reviewToDelete = reviewDatabase.find(
        (review) =>
            review.listingID === listingID && review.reviewID === reviewID
    );

    if (reviewToDelete) {
        reviewToDelete.isDeleted = true;
        let userDatabase = getUserDatabase();
        let userToUpdate = userDatabase.find(
            (user) => user.username === reviewToDelete.userID
        );
        if (userToUpdate) {
            userToUpdate.noOfReviews--;
        }
        setListingReviewDatabase(reviewDatabase);
        setUserDatabase(userDatabase);
        if (isInLocalStorage()) setLocalStorage(userToUpdate);
        else setSessionStorage(userToUpdate);
    } else {
        console.log("Review not found.");
    }
}

function checkIfLikedReview(reviewID, listingID, userID) {
    let currentUser = getCurrentUser();
    if (!currentUser) return false;
    return currentUser.liked.some(
        (likedReview) =>
            likedReview.reviewID === reviewID &&
            likedReview.listingID === listingID &&
            likedReview.userID === userID
    );
}

function editListingReview(reviewToEdit) {
    let reviewDatabase = getListingReviewDatabase();
    let reviewIndex = reviewDatabase.findIndex(
        (review) =>
            review.listingID === reviewToEdit.listingID &&
            review.reviewID === reviewToEdit.reviewID
    );
    if (reviewIndex !== -1) {
        reviewDatabase[reviewIndex] = reviewToEdit;
        setListingReviewDatabase(reviewDatabase);
    }
}

function getUserReviews(userID) {
    const reviews = getListingReviewDatabase();
    return reviews.filter(
        (review) => review.userID === userID && review.isDeleted === false
    );
}

function getSpecificUserReview(listingID, reviewID) {
    const reviews = getListingReviewDatabase();
    return reviews.find(
        (review) =>
            review.listingID === listingID && review.reviewID === reviewID
    );
}

function getListingReviews(listingID) {
    const reviews = getListingReviewDatabase();
    return reviews.filter(
        (review) => review.listingID === listingID && review.isDeleted === false
    );
}

function reviewMarkedHelpful(reviewID, listingID, value) {
    let reviewDatabase = getListingReviewDatabase();
    let reviewToMark = reviewDatabase.find(
        (review) =>
            review.listingID === listingID && review.reviewID === reviewID
    );
    let reviewIndex = reviewDatabase.findIndex(
        (review) =>
            review.listingID === listingID && review.reviewID === reviewID
    );
    reviewToMark.reviewMarkedHelpful += value;
    if (reviewIndex !== -1) {
        reviewDatabase[reviewIndex] = reviewToMark;
        setListingReviewDatabase(reviewDatabase);
    }
}

/* ==============================================================
   BASE CRUD OPERATIONS FOR LISTING OWNER DATABASE
   ============================================================== */

function getListingOwnerDatabase() {
    return JSON.parse(localStorage.getItem("listingOwnerDatabase"));
}

function setListingOwnerDatabase(listingOwnerDatabase) {
    localStorage.setItem(
        "listingOwnerDatabase",
        JSON.stringify(listingOwnerDatabase)
    );
}

/* ==============================================================
   FUNCTION OPERATIONS FOR LISTING OWNER DATABASE
   ============================================================== */

function getSpecificListingOwner(ownerID) {
    const listingOwners = getListingOwnerDatabase();
    return listingOwners.find(
        (listingOwner) => listingOwner.username === ownerID
    );
}

function checkIfSameOwnerID(ownerID) {
    let currentUser = getCurrentUser();
    if (currentUser) {
        return ownerID === currentUser.username;
    } else return false;
}

function checkIfOwnerExist(ownerID) {
    const listingOwners = getListingOwnerDatabase();
    return listingOwners.some(
        (listingOwner) => listingOwner.username === ownerID
    );
}

/* ==============================================================
   BASE CRUD OPERATIONS FOR OWNER RESPONSE DATABASE
   ============================================================== */

function getOwnerResponseDatabase() {
    return JSON.parse(localStorage.getItem("ownerResponseDatabase"));
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

function getSpecificOwnerResponses(ownerID) {
    const ownerResponses = getOwnerResponseDatabase();
    return ownerResponses.find(
        (ownerResponse) => ownerResponse.ownerID === ownerID
    );
}

function checkIfCommented(reviewID, listingID, userID) {
    const ownerResponses = getOwnerResponseDatabase();
    return ownerResponses.some(
        (ownerResponse) =>
            ownerResponse.reviewID === reviewID &&
            ownerResponse.listingID === listingID &&
            ownerResponse.userID === userID
    );
}

function getReviewResponse(reviewID, listingID, userID) {
    const ownerResponses = getOwnerResponseDatabase();
    return ownerResponses.find(
        (ownerResponse) =>
            ownerResponse.reviewID === reviewID &&
            ownerResponse.listingID === listingID &&
            ownerResponse.userID === userID
    );
}

function addNewOwnerResponse(ownerResponse) {
    let ownerResponseDatabase = getOwnerResponseDatabase();
    ownerResponseDatabase.push(ownerResponse);
    setOwnerResponseDatabase(ownerResponseDatabase);
}

/* ==============================================================
   REGISTER FUNCTIONS
   ============================================================== */

function checkIfSameUserID(userID) {
    let currentUser = getCurrentUser();
    if (currentUser) {
        return userID === currentUser.username;
    }
    return false;
}

function checkIfUserExists(email) {
    /*
    return 1 if user exist and is type student
    return 2 if user exist and is type owner
    return 0 if user does not exist
    */
    const adminDatabase = JSON.parse(
        localStorage.getItem("listingAdminDatabase")
    );
    const userLoginDatabase = JSON.parse(
        localStorage.getItem("userLoginDatabase")
    );

    const user = userLoginDatabase.find((user) => user.email === email);
    if (user) return 1;

    const owner = adminDatabase.find((owner) => owner.email === email);
    if (owner) return 2;

    return 0;
}

function checkUserInfo(email, password) {
    const userLoginDatabase = JSON.parse(
        localStorage.getItem("userLoginDatabase")
    );
    const user = userLoginDatabase.find(
        (user) => user.email === email && user.password === password
    );
    return !!user;
}

function checkExistingUserEmail(email) {
    const userLoginDatabase = JSON.parse(
        localStorage.getItem("userLoginDatabase")
    );
    const user = userLoginDatabase.find((user) => user.email === email);
    return !!user;
}

function checkExistingUsername(username) {
    const userLoginDatabase = JSON.parse(
        localStorage.getItem("userLoginDatabase")
    );
    const user = userLoginDatabase.find((user) => user.username === username);
    return !!user;
}

function addNewUser(user, userData) {
    let userLoginDatabase = JSON.parse(
        localStorage.getItem("userLoginDatabase")
    );
    let userDatabase = getUserDatabase();
    userLoginDatabase.push(userData);
    userDatabase.push(user);
    localStorage.setItem(
        "userLoginDatabase",
        JSON.stringify(userLoginDatabase)
    );
    setUserDatabase(userDatabase);
}

/* ==============================================================
   LOGIN FUNCTIONS
   ============================================================== */

function getUserInfo(email, password) {
    const userLoginDatabase = JSON.parse(
        localStorage.getItem("userLoginDatabase")
    );
    const userInfoDatabase = getUserDatabase();
    const user = userLoginDatabase.find(
        (user) => user.email === email && user.password === password
    );
    return userInfoDatabase.find((x) => x.username === user.username);
}

function checkOwnerInfo(email, password) {
    const adminDatabase = JSON.parse(
        localStorage.getItem("listingAdminDatabase")
    );
    return adminDatabase.some(
        (owner) => owner.email === email && owner.password === password
    );
}

function getOwnerInfo(email, password) {
    const adminDatabase = JSON.parse(
        localStorage.getItem("listingAdminDatabase")
    );
    const ownerInfoDatabase = JSON.parse(
        localStorage.getItem("listingOwnerDatabase")
    );
    const owner = adminDatabase.find(
        (owner) => owner.email === email && owner.password === password
    );
    console.log(owner);
    return ownerInfoDatabase.find((x) => x.username === owner.username);
}

/* ==============================================================
   USER SESSION FUNCTIONS
   ============================================================== */

function isInLocalStorage() {
    let ls = localStorage.getItem("currentUser");
    let ls_login = localStorage.getItem("isLoggedIn");
    return !!(ls_login === "true" && ls);
}

function isInSessionStorage() {
    let ss = sessionStorage.getItem("currentUser");
    let ss_login = sessionStorage.getItem("isLoggedIn");
    return !!(ss_login === "true" && ss);
}

function getCurrentUser() {
    let ls = localStorage.getItem("currentUser");
    let ls_login = localStorage.getItem("isLoggedIn");
    let ss = sessionStorage.getItem("currentUser");
    let ss_login = sessionStorage.getItem("isLoggedIn");

    if (ls_login === "true" && ls) {
        return JSON.parse(ls);
    } else if (ss_login === "true" && ss) {
        return JSON.parse(ss);
    } else return false;
}

function setLocalStorage(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
}

function setSessionStorage(user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    sessionStorage.setItem("isLoggedIn", "true");
}

function setCurrentUser(user, remember) {
    if (remember) {
        setLocalStorage(user);
    } else {
        setSessionStorage(user);
    }
}

function logoutSession() {
    localStorage.removeItem("currentUser");
    localStorage.setItem("isLoggedIn", "false");
    sessionStorage.removeItem("currentUser");
    sessionStorage.setItem("isLoggedIn", "false");
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
