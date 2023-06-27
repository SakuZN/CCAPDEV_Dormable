function addListingReview(review) {
  let reviewDatabase = JSON.parse(localStorage.getItem('reviewDatabase'));
  reviewDatabase.push(review);
  localStorage.setItem('reviewDatabase', JSON.stringify(reviewDatabase));
}

function deleteListingReview(reviewID) {
  let reviewDatabase = JSON.parse(localStorage.getItem('reviewDatabase'));
  reviewDatabase = reviewDatabase.filter(review => review.reviewID !== reviewID);
  localStorage.setItem('reviewDatabase', JSON.stringify(reviewDatabase));
}

function editListingReview(review) {
  let reviewDatabase = JSON.parse(localStorage.getItem('reviewDatabase'));
  let reviewIndex = reviewDatabase.findIndex(x => x.reviewID === review.reviewID);
  reviewDatabase[reviewIndex] = review;
  localStorage.setItem('reviewDatabase', JSON.stringify(reviewDatabase));
}

function getUserReviews(userID) {
  const reviews = JSON.parse(localStorage.getItem('reviewDatabase'));
  return reviews.filter(review => review.userID === userID);
}
function getListingReviews(listingID) {
  const reviews = JSON.parse(localStorage.getItem('reviewDatabase'));
  return reviews.filter(review => review.listingID === listingID);
}

function reviewMarkedHelpful(reviewID, listingID, value) {
  let reviewDatabase = JSON.parse(localStorage.getItem('reviewDatabase'));
  let reviewFilter = reviewDatabase.filter(review => review.listingID === listingID);
  let reviewIndex = reviewFilter.findIndex(x => x.reviewID === reviewID);
  let review = reviewFilter[reviewIndex];
  review.reviewMarkedHelpful += value;
  reviewDatabase[reviewIndex] = review;
  localStorage.setItem('reviewDatabase', JSON.stringify(reviewDatabase));
}

function updateListingScoreAndReview() {
  let listingDatabase = JSON.parse(localStorage.getItem('listingDatabase'));
  let reviewDatabase = JSON.parse(localStorage.getItem('reviewDatabase'));

  listingDatabase.forEach(listing => {
    let reviews = reviewDatabase.filter(review => review.listingID === listing.id);
    let totalScore = 0;
    reviews.forEach(review => totalScore += review.reviewScore);
    listing.reviewScore = totalScore / reviews.length;
    listing.reviews = reviews.length;
  });
  localStorage.setItem('listingDatabase', JSON.stringify(listingDatabase));
}
