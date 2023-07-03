/* ==============================================================
   LISTING DATABASE FUNCTIONS
   ============================================================== */
function getListingDatabase() {
  return JSON.parse(localStorage.getItem('listingDatabase'));
}

function getSpecificListing(listingID) {
  const listings = JSON.parse(localStorage.getItem('listingDatabase'));
  return listings.find(listing => listing.id === listingID);
}

function checkIfValidListingID(listingID) {
  const listings = JSON.parse(localStorage.getItem('listingDatabase'));
  return listings.some(listing => listing.id === listingID);
}

function getOwnerSpecificListings(ownerID) {
  const listings = JSON.parse(localStorage.getItem('listingDatabase'));
  return listings.filter(ownerListings => ownerListings.ownerID === ownerID);
}

//Used everytime when a review is added, edited or deleted
function updateListings() {
  let listingDatabase = JSON.parse(localStorage.getItem('listingDatabase'));
  let reviewDatabase = JSON.parse(localStorage.getItem('reviewDatabase'));

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

function generateReviewID(listingID) {
  let reviewDatabase = JSON.parse(localStorage.getItem('reviewDatabase'));
  let listingReviews = reviewDatabase.filter(review => review.listingID === listingID);
  return listingReviews.length + 1;
}

function addListingReview(review) {
  let reviewDatabase = JSON.parse(localStorage.getItem('reviewDatabase'));
  reviewDatabase.push(review);
  localStorage.setItem('reviewDatabase', JSON.stringify(reviewDatabase));
}

function deleteListingReview(reviewID, listingID) {
  let reviewDatabase = JSON.parse(localStorage.getItem('reviewDatabase'));
  let reviewToDelete = reviewDatabase.find(review => review.listingID === listingID && review.reviewID === reviewID);
  if (reviewToDelete) {
    reviewToDelete.isDeleted = true;
    let userDatabase = JSON.parse(localStorage.getItem('userDatabase'));
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


function editListingReview(reviewToEdit) {
  let reviewDatabase = JSON.parse(localStorage.getItem('reviewDatabase'));
  let reviewIndex = reviewDatabase.findIndex(review => review.listingID === reviewToEdit.listingID && review.reviewID === reviewToEdit.reviewID);
  if (reviewIndex !== -1) {
    reviewDatabase[reviewIndex] = reviewToEdit;
    localStorage.setItem('reviewDatabase', JSON.stringify(reviewDatabase));
  }
}

function getUserReviews(userID) {
  const reviews = JSON.parse(localStorage.getItem('reviewDatabase'));
  return reviews.filter(review => review.userID === userID && review.isDeleted === false);
}

function getSpecificUserReview(listingID, reviewID) {
  const reviews = JSON.parse(localStorage.getItem('reviewDatabase'));
  return reviews.find(review => review.listingID === listingID && review.reviewID === reviewID);
}

function getListingReviews(listingID) {
  const reviews = JSON.parse(localStorage.getItem('reviewDatabase'));
  return reviews.filter(review => review.listingID === listingID && review.isDeleted === false);
}

function reviewMarkedHelpful(reviewID, listingID, value) {
  let reviewDatabase = JSON.parse(localStorage.getItem('reviewDatabase'));
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

function updateUserReviewCount(userID) {
  let userDatabase = JSON.parse(localStorage.getItem('userDatabase'));
  let userIndex = userDatabase.findIndex(x => x.username === userID);
  userDatabase[userIndex].noOfReviews++;
  localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
  localStorage.setItem('currentUser', JSON.stringify(userDatabase[userIndex]));
}

function getSpecificUser(userID) {
  const users = JSON.parse(localStorage.getItem('userDatabase'));
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
  if (localStorage.getItem('isLoggedIn') === 'false') {
    return null;
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
  return ownerID === JSON.parse(localStorage.getItem('currentUser')).username;
}

/* ==============================================================
   LOGIN/REGISTER DATABASE FUNCTIONS
   ============================================================== */
function checkIfLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

function checkIfSameUserID(userID) {
  return userID === JSON.parse(localStorage.getItem('currentUser')).username;
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
  let userDatabase = JSON.parse(localStorage.getItem('userDatabase'));
  userLoginDatabase.push(userData);
  userDatabase.push(user);
  localStorage.setItem('userLoginDatabase', JSON.stringify(userLoginDatabase));
  localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
}

function getUserInfo(email, password) {
  const userLoginDatabase = JSON.parse(localStorage.getItem('userLoginDatabase'));
  const userInfoDatabase = JSON.parse(localStorage.getItem('userDatabase'));
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
  return ownerInfoDatabase.find(x => x.ownerID === owner.username);
}
