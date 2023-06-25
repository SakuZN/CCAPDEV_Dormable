
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
