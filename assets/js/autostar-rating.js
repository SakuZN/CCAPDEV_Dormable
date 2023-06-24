
function star_rating(score, reviews, listingID) {
  var starHtml = '';
  var fullStar;
  var halfStar;
  var emptyStar;
  var reviewCount;
  if (listingID === 'featured-listings') {
  fullStar = '<li class="fa fa-star" style="color: orange"></i><li>';
  halfStar = '<li><i class="fa fa-star-half-o" style="color: orange"></i><li>';
  emptyStar = '<li><i class="fa fa-star-o"></i><li>';
  reviewCount = '<li>' + 'Reviews (' + reviews + ')</li>';
  } else {
    fullStar = '<li class="fa fa-star"></li>';
    halfStar = '<li class="fa fa-star-half-o"></li>';
    emptyStar = '<li class="fa fa-star-o"></li>';
  }

  // Calculate the number of full stars
  var fullStars = Math.floor(score);

  // Calculate whether to show a half star
  var hasHalfStar = score - fullStars >= 0.5;

  // Generate the full stars
  for (var i = 0; i < fullStars; i++) {
    starHtml += fullStar;
  }

  // Generate the half star, if applicable
  if (hasHalfStar) {
    starHtml += halfStar;
  }

  // Generate the empty stars
  var remaining = 5 - fullStars - (hasHalfStar ? 1 : 0);
  while (remaining > 0) {
    starHtml += emptyStar;
    remaining--;
  }



  // Finally, add the review count if applicable
  if (listingID === 'featured-listings') {
    starHtml += reviewCount;
  }
  // Return the generated HTML
  return starHtml;
}

// Automatically trigger the generateReviewStars function for all listing items when the page finishes loading

/*
window.addEventListener('load', function() {
  var listingItems = document.getElementsByClassName('listing-item');
  let listing = fetchData();

  // Get the listings from the JSON file
  var listings = fetchData();
  for (var i = 0; i < listingItems.length; i++) {
    var ratingElement = listingItems[i].querySelector('.rate');
    var nameElement = listingItems[i].querySelector('h4');

    // Get the listing name to match with the review score
    var listingName = nameElement.textContent;

    // Find the corresponding listing in the array
    listing = listings.find(function(item) {
      return item.name === listingName;
    });

    // If a matching listing is found, generate the review stars HTML
    if (listing) {
      ratingElement.innerHTML = star_rating(listing.reviewScore, listing.reviews);
    }
  }
});

 */
