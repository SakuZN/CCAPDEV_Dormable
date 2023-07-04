/* ==============================================================
   LISTING DATABASE FUNCTIONS
   ============================================================== */
function getListingDatabase() {
  return JSON.parse(localStorage.getItem('listingDatabase'));
}

function getSpecificListing(listingID) {
  const listings = getListingDatabase();
  return listings.find(listing => listing.id === listingID);
}

function checkIfValidListingID(listingID) {
  const listings = getListingDatabase();
  return listings.some(listing => listing.id === listingID);
}

function getOwnerSpecificListings(ownerID) {
  const listings = getListingDatabase();
  return listings.filter(ownerListings => ownerListings.ownerID === ownerID);
}

//Used everytime when a review is added, edited or deleted
function updateListings() {
  let listingDatabase = getListingDatabase();
  let reviewDatabase = getReviewDatabase();

  listingDatabase.forEach(listing => {
    let reviews = reviewDatabase.filter(review => review.listingID === listing.id && review.isDeleted === false);
    let totalScore = 0;
    reviews.forEach(review => totalScore += review.reviewScore);
    listing.reviewScore = totalScore / reviews.length;
    listing.reviews = reviews.length;
  });
  localStorage.setItem('listingDatabase', JSON.stringify(listingDatabase));
}

/* ==============================================================
   LISTING REVIEWS DATABASE FUNCTIONS
   ============================================================== */

function getReviewDatabase() {
  return JSON.parse(localStorage.getItem('reviewDatabase'));
}

function generateReviewID(listingID) {
  let reviewDatabase = getReviewDatabase();
  let listingReviews = reviewDatabase.filter(review => review.listingID === listingID);
  return listingReviews.length + 1;
}

function addListingReview(review) {
  let reviewDatabase = getReviewDatabase();
  reviewDatabase.push(review);
  localStorage.setItem('reviewDatabase', JSON.stringify(reviewDatabase));
}

function deleteListingReview(reviewID, listingID) {
  let reviewDatabase = getReviewDatabase();
  let reviewToDelete = reviewDatabase.find(review => review.listingID === listingID && review.reviewID === reviewID);
  if (reviewToDelete) {
    reviewToDelete.isDeleted = true;
    let userDatabase = getUserDatabase();
    let userToUpdate = userDatabase.find(user => user.username === reviewToDelete.userID);
    if (userToUpdate) {
      userToUpdate.noOfReviews--;
    }
    localStorage.setItem('reviewDatabase', JSON.stringify(reviewDatabase));
    localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
    localStorage.setItem('currentUser', JSON.stringify(userToUpdate));
  } else {
    console.log('Review not found.');
  }
}

function checkIfLikedReview(reviewID, listingID, userID) {
  let currentUser = getCurrentUser();
  if (!currentUser)
    return false;
  return currentUser.liked.some(likedReview =>
    likedReview.reviewID === reviewID
    && likedReview.listingID === listingID
    && likedReview.userID === userID);
}


function editListingReview(reviewToEdit) {
  let reviewDatabase = getReviewDatabase();
  let reviewIndex = reviewDatabase.findIndex(review => review.listingID === reviewToEdit.listingID && review.reviewID === reviewToEdit.reviewID);
  if (reviewIndex !== -1) {
    reviewDatabase[reviewIndex] = reviewToEdit;
    localStorage.setItem('reviewDatabase', JSON.stringify(reviewDatabase));
  }
}

function getUserReviews(userID) {
  const reviews = getReviewDatabase();
  return reviews.filter(review => review.userID === userID && review.isDeleted === false);
}

function getSpecificUserReview(listingID, reviewID) {
  const reviews = getReviewDatabase();
  return reviews.find(review => review.listingID === listingID && review.reviewID === reviewID);
}

function getListingReviews(listingID) {
  const reviews = getReviewDatabase();
  return reviews.filter(review => review.listingID === listingID && review.isDeleted === false);
}

function reviewMarkedHelpful(reviewID, listingID, value) {
  let reviewDatabase = getReviewDatabase();
  let reviewToMark = reviewDatabase.find(review => review.listingID === listingID && review.reviewID === reviewID);
  let reviewIndex = reviewDatabase.findIndex(review => review.listingID === listingID && review.reviewID === reviewID);
  reviewToMark.reviewMarkedHelpful += value;
  if (reviewIndex !== -1) {
    reviewDatabase[reviewIndex] = reviewToMark;
    localStorage.setItem('reviewDatabase', JSON.stringify(reviewDatabase));
  }
}

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

/* ==============================================================
   USER DATABASE FUNCTIONS
   ============================================================== */
function getUserDatabase() {
  return JSON.parse(localStorage.getItem('userDatabase'));
}

function updateUserReviewCount(userID) {
  let userDatabase = getUserDatabase();
  let userIndex = userDatabase.findIndex(x => x.username === userID);
  userDatabase[userIndex].noOfReviews++;
  localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
  localStorage.setItem('currentUser', JSON.stringify(userDatabase[userIndex]));
}

function updateLikedReviews(userID, reviewID, listingID) {
  let currentUser = getCurrentUser();
  let userDatabase = getUserDatabase();
  let userIndex = userDatabase.findIndex(x => x.username === currentUser.username);
  let likedReview = {
    userID: userID,
    reviewID: reviewID,
    listingID: listingID
  }
  let index = userDatabase[userIndex].liked.findIndex(liked =>
    liked.userID === likedReview.userID &&
    liked.reviewID === likedReview.reviewID &&
    liked.listingID === likedReview.listingID
  );

  if (index !== -1) {
    userDatabase[userIndex].liked.splice(index, 1);
  } else {
    userDatabase[userIndex].liked.push(likedReview);
  }
  localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
  localStorage.setItem('currentUser', JSON.stringify(userDatabase[userIndex]));
}

function isFollowingUser(userID) {
  let currentUser = getCurrentUser();
  if (!currentUser)
    return false;
  return currentUser.following.some(following => following.username === userID);
}

function followUser(userID) {
  let currentUser = getCurrentUser();
  let userDatabase = getUserDatabase();
  let toFollow = userDatabase.find(user => user.username === userID);
  let toFollowIndex = userDatabase.findIndex(x => x.username === userID);
  let userIndex = userDatabase.findIndex(x => x.username === currentUser.username);
  let index = userDatabase[userIndex].following.findIndex(following => following.username === toFollow.username);
  if (index !== -1) {
    userDatabase[userIndex].following.splice(index, 1);
    toFollow.followers--;
  } else {
    userDatabase[userIndex].following.push(toFollow.username);
    toFollow.followers++;
    userDatabase[toFollowIndex] = toFollow;
    localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
    localStorage.setItem('currentUser', JSON.stringify(userDatabase[userIndex]));

  }
}

function getSpecificUser(userID) {
  const users = getUserDatabase();
  return users.find(user => user.username === userID);
}

function updateUserDatabase(user) {
  let userDatabase = localStorage.getItem('userDatabase');
  if (!userDatabase) {
    new Error('userDatabase not found in localStorage');
  } else {
    try {
      userDatabase = JSON.parse(userDatabase);
    } catch (error) {
      console.error('Error parsing userDatabase from localStorage:', error);
      return;
    }
  }

  let userIndex = userDatabase.findIndex(x => x.username === user.username);
  if (userIndex === -1) {
    console.error('User not found in database:', user);
    return;
  }

  userDatabase[userIndex] = user;
  localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
  localStorage.setItem('currentUser', JSON.stringify(user));
}

function getCurrentUser() {
  if (localStorage.getItem('isLoggedIn') === 'false' || !localStorage.getItem('currentUser')) {
    return false;
  }
  return JSON.parse(localStorage.getItem('currentUser'));
}

/* ==============================================================
   LISTING OWNER DATABASE FUNCTIONS
   ============================================================== */
function getListingOwners() {
  return JSON.parse(localStorage.getItem('listingOwnerDatabase'));
}

function getSpecificListingOwner(ownerID) {
  const listingOwners = JSON.parse(localStorage.getItem('listingOwnerDatabase'));
  return listingOwners.find(listingOwner => listingOwner.username === ownerID);
}

function checkIfSameOwnerID(ownerID) {

  let currentUser = getCurrentUser();
  if (currentUser) {
    return ownerID === currentUser.username;
  } else
    return false;
}

/* ==============================================================
   OWNER RESPONSE DATABASE FUNCTIONS
   ============================================================== */
function getOwnerResponses() {
  return JSON.parse(localStorage.getItem('ownerResponseDatabase'));
}

function getSpecificOwnerResponses(ownerID) {
  const ownerResponses = JSON.parse(localStorage.getItem('ownerResponseDatabase'));
  return ownerResponses.find(ownerResponse => ownerResponse.ownerID === ownerID);
}

function checkIfCommented(reviewID, listingID, userID) {
  const ownerResponses = JSON.parse(localStorage.getItem('ownerResponseDatabase'));
  return ownerResponses.some(ownerResponse => ownerResponse.reviewID === reviewID &&
    ownerResponse.listingID === listingID && ownerResponse.userID === userID);
}

function getReviewResponse(reviewID, listingID, userID) {
  const ownerResponses = JSON.parse(localStorage.getItem('ownerResponseDatabase'));
  return ownerResponses.find(ownerResponse => ownerResponse.reviewID === reviewID &&
    ownerResponse.listingID === listingID && ownerResponse.userID === userID);
}

function addNewOwnerResponse(ownerResponse) {
  let ownerResponseDatabase = JSON.parse(localStorage.getItem('ownerResponseDatabase'));
  ownerResponseDatabase.push(ownerResponse);
  localStorage.setItem('ownerResponseDatabase', JSON.stringify(ownerResponseDatabase));
}

/* ==============================================================
   LOGIN/REGISTER DATABASE FUNCTIONS
   ============================================================== */
function checkIfLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

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
  const adminDatabase = JSON.parse(localStorage.getItem('listingAdminDatabase'));
  const userLoginDatabase = JSON.parse(localStorage.getItem('userLoginDatabase'));

  const user = userLoginDatabase.find(user => user.email === email);
  console.log(userLoginDatabase);
  if (user) return 1;

  const owner = adminDatabase.find(owner => owner.email === email);
  console.log(owner);
  if (owner) return 2;

  return 0;
}

function checkUserInfo(email, password) {
  const userLoginDatabase = JSON.parse(localStorage.getItem('userLoginDatabase'));
  const user = userLoginDatabase.find(user => user.email === email && user.password === password);
  return !!user;

}

function checkExistingUserEmail(email) {
  const userLoginDatabase = JSON.parse(localStorage.getItem('userLoginDatabase'));
  const user = userLoginDatabase.find(user => user.email === email);
  return !!user;
}

function checkExistingUsername(username) {
  const userLoginDatabase = JSON.parse(localStorage.getItem('userLoginDatabase'));
  const user = userLoginDatabase.find(user => user.username === username);
  return !!user;
}

function addNewUser(user, userData) {
  let userLoginDatabase = JSON.parse(localStorage.getItem('userLoginDatabase'));
  let userDatabase = getUserDatabase();
  userLoginDatabase.push(userData);
  userDatabase.push(user);
  localStorage.setItem('userLoginDatabase', JSON.stringify(userLoginDatabase));
  localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
}

function getUserInfo(email, password) {
  const userLoginDatabase = JSON.parse(localStorage.getItem('userLoginDatabase'));
  const userInfoDatabase = getUserDatabase();
  const user = userLoginDatabase.find(user => user.email === email && user.password === password);
  return userInfoDatabase.find(x => x.username === user.username);
}

function checkIfOwnerExist(username) {
  const adminDatabase = JSON.parse(localStorage.getItem('listingAdminDatabase'));
  const owner = adminDatabase.find(owner => owner.username === username);
  return !!owner;
}

function checkOwnerInfo(email, password) {
  const adminDatabase = JSON.parse(localStorage.getItem('listingAdminDatabase'));
  const owner = adminDatabase.find(owner => owner.email === email && owner.password === password);
  return !!owner;
}

function getOwnerInfo(email, password) {
  const adminDatabase = JSON.parse(localStorage.getItem('listingAdminDatabase'));
  const ownerInfoDatabase = JSON.parse(localStorage.getItem('listingOwnerDatabase'));
  const owner = adminDatabase.find(owner => owner.email === email && owner.password === password);
  console.log(owner);
  return ownerInfoDatabase.find(x => x.username === owner.username);
}
