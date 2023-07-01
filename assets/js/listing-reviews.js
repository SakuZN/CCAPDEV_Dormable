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
function updateUserReviewCount(userID) {
  let userDatabase = JSON.parse(localStorage.getItem('userDatabase'));
  let userIndex = userDatabase.findIndex(x => x.username === userID);
  userDatabase[userIndex].noOfReviews++;
  localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
  localStorage.setItem('currentUser', JSON.stringify(userDatabase[userIndex]));
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

function getSpecificUser(userID) {
    const users = JSON.parse(localStorage.getItem('userDatabase'));
    return users.find(user => user.username === userID);
}
function getListingReviews(listingID) {
  const reviews = JSON.parse(localStorage.getItem('reviewDatabase'));
  return reviews.filter(review => review.listingID === listingID && review.isDeleted === false);
}

function getListingDatabase() {
  return JSON.parse(localStorage.getItem('listingDatabase'));
}

function getSpecificListing(listingID) {
  const listings = JSON.parse(localStorage.getItem('listingDatabase'));
  return listings.find(listing => listing.id === listingID);
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
  }
  else if (minutes < 60) {
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
