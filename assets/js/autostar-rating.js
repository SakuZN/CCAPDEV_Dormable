
function star_rating(score, reviews, listingID) {
  let starHtml = '';
  let fullStar;
  let halfStar;
  let emptyStar;
  let reviewCount;
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
  let fullStars = Math.floor(score);

  // Calculate whether to show a half star
  let hasHalfStar = score - fullStars >= 0.5;

  // Generate the full stars
  for (let i = 0; i < fullStars; i++) {
    starHtml += fullStar;
  }

  // Generate the half star, if applicable
  if (hasHalfStar) {
    starHtml += halfStar;
  }

  // Generate the empty stars
  let remaining = 5 - fullStars - (hasHalfStar ? 1 : 0);
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
