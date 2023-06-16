// Const value for listings for hardcoding of data
var listings = [
  {
    name: 'The Grand Towers Manila',
    reviewScore: 4.5,
    reviews: 18
  },
  {
    name: '2 Torre Lorenzo',
    reviewScore: 3.5,
    reviews: 24
  },
  {
    name: 'R Square Residences',
    reviewScore: 4.0,
    reviews: 36
  },
  {
    name: 'ONE Archer\'s Place',
    reviewScore: 5.0,
    reviews: 24
  },
  {
    name: 'Green Residences',
    reviewScore: 4.1,
    reviews: 32
  },
  {
    name: 'Vito Cruz Towers',
    reviewScore: 3.9,
    reviews: 40
  }
];

function star_rating(score, reviews) {
  var starHtml = '';
  var fullStar = '<li><i class="fa fa-star"></i><li>';
  var halfStar = '<li><i class="fa fa-star-half-o"></i><li>';
  var emptyStar = '<li><i class="fa fa-star-o"></i><li>';
  var reviewCount = '<li>' + 'Reviews (' + reviews + ')</li>';

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



  // Finally, add the review count
  starHtml += reviewCount;

  // Return the generated HTML
  return starHtml;
}

// Automatically trigger the generateReviewStars function for all listing items when the page finishes loading

window.addEventListener('load', function() {
  var listingItems = document.getElementsByClassName('listing-item');

  for (var i = 0; i < listingItems.length; i++) {
    var ratingElement = listingItems[i].querySelector('.rate');
    var nameElement = listingItems[i].querySelector('h4');

    // Get the listing name to match with the review score
    var listingName = nameElement.textContent;

    // Find the corresponding listing in the array
    var listing = listings.find(function(item) {
      return item.name === listingName;
    });

    // If a matching listing is found, generate the review stars HTML
    if (listing) {
      ratingElement.innerHTML = star_rating(listing.reviewScore, listing.reviews);
    }
  }
});
