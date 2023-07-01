/* ==============================================================
   GLOBAL VARIABLES
   ============================================================== */
//Variable for swiper
let mySwiper;

//ArrayList of Users that reviewed
let userReviewers = [];

//Review Limit Variable
let reviewLimit = 3;

/* ==============================================================
   OBJECT FUNCTIONS
   ============================================================== */

//Object function for user profile
const getUserData = function (userData, isCurrentUser) {
  this.user = userData;
  this.isOwnReview = isCurrentUser;
  this.userRHData = populateHistoryAsDiv(getUserReviews(this.user.username), this.user, isCurrentUser);
}

//Object function for review history
const reviewHistoryData = function (reviewHistory, divRH) {
  this.reviewHistory = reviewHistory;
  this.divRH = divRH;
}

/* ==============================================================
   SWIPER FUNCTIONS
   ============================================================== */
function initSwiper(){
  mySwiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 10,
    loop: false,
    loopFillGroupWithBlank: false,
    pagination: {
      el: "#review-pagination",
      clickable: true,
    },
    allowTouchMove: false,
  });
}
function destroySwiper(){
  mySwiper.destroy();
}

function populateListingImg(listing, swiper) {
  swiper.innerHTML = '';

  listing.img.forEach((img) => {
    swiper.innerHTML += `
      <div class="swiper-slide">
        <a href="${img}" class="grid image-link">
          <img src="${img}" class="img-fluid" alt="#">
        </a>
      </div>
    `;
  });
}
function populateReviewImg(images) {
  let reviewImgs = '';
  images.forEach((img) => {
    reviewImgs+= `<li href="${img}" class="review-image">
          <img src="${img}" class="img-fluid" alt="#">
        </li>`;
  });
  return reviewImgs;
}
function populateListingReviews(reviews, swiper) {
  const userDatabaseString = localStorage.getItem('userDatabase');
  const userDatabase = JSON.parse(userDatabaseString);
  //sort review by date
  reviews.sort((a, b) => { return new Date(b.reviewDate) - new Date(a.reviewDate) });
  reviews.forEach((review) => {
    let reviewUser = userDatabase.find(user => user.username === review.userID);
    let scoreClass = '';
    if (review.reviewScore >= 4)
      scoreClass = 'customer-rating';
    else if (review.reviewScore === 3)
      scoreClass = 'customer-rating yellow';
    else
      scoreClass = 'customer-rating red';

    swiper.innerHTML += ` <div class="swiper-slide">
  <div class="customer-review_wrap">
    <div class="customer-img">
        <a href="profile.html?id=${reviewUser.username}" style="cursor: pointer">
            <img src="${reviewUser.profilePic}" class="img-fluid" alt="#">
            <p>${reviewUser.username}</p>
        </a>
       <span>${reviewUser.noOfReviews} reviews</span>
    </div>
    <div class="customer-content-wrap">
      <div class="customer-content">
        <div class="customer-review">
          <h6>${review.reviewTitle}</h6>
          <ul class="star-rating">
            ${star_rating(review.reviewScore,0, 'listing')}
          </ul>
          <p class="customer-text" style="font-weight: bold">Reviewed ${reviewDate(review.reviewDate)}</p>
        </div>
        <div class="${scoreClass}">${review.reviewScore}.0</div>
      </div>
      <p class="customer-text">${review.reviewContent}</p>
      <ul>
        ${populateReviewImg(review.reviewIMG)}
      </ul>
      <div class="mark-helpful" data-review-id="${review.reviewID}" data-listing-id="${review.listingID}">
        <span class="like-count">${review.reviewMarkedHelpful}</span> people marked this review as helpful <button class="button">
          <div class="hand">
            <div class="thumb"></div>
          </div>
          <span>Like<span>d</span>
          </span>
        </button>
      </div>
    </div>
  </div>
  <hr>
</div> `;
  });
}

function populateListingPage(id_page) {
  //Get the listing data
  let listing = fetchData().find((listing) => listing.id === id_page);
  //Get the listing page elements to populate
  let listingName = document.getElementById('listing-name');
  let listingSwiper = document.getElementById('listing-swiper');
  let listingReviews = document.getElementById('review-swiper');
  let listingStars = document.getElementById('listing-stars');
  let listingPrice = document.getElementById('listing-price');
  let numScore = document.getElementById('numscore');
  let numScoreBg = document.querySelector('.reserve-rating');
  let numReviews = document.getElementById('numreview');
  let listingDescription = document.getElementById('listing-description');
  let numReviewBottom = document.getElementById('numreviewBottom');
  let listingMap = document.getElementById('listing-map');
  let listingAddress = document.getElementById('listing-address');
  let listingPhone = document.getElementById('listing-phone');
  let listingWebsite = document.getElementById('listing-website');
  let listingOwner = document.getElementById('listing-owner');
  let ownerName = document.getElementById('owner-name');

  //Replace the content of the listing page elements
  listingName.innerHTML = listing.name;
  populateListingImg(listing, listingSwiper);
  listingStars.innerHTML = star_rating(listing.reviewScore, listing.reviews, 'listing-page');
  listingPrice.innerHTML = listing.price;
  numScore.innerHTML = listing.reviewScore.toFixed(1);
  if (listing.reviewScore === 3)
    numScoreBg.classList.add('yellow');
  else if (listing.reviewScore < 3)
    numScoreBg.classList.add('red');
  numReviews.innerHTML = listing.reviews + ' reviews';
  listingDescription.innerHTML = listing.description + '<hr>';
  numReviewBottom.innerHTML = listing.reviews + ' reviews';

  //Try catch in case the listing has no reviews
  try {
    populateListingReviews(getListingReviews(id_page), listingReviews);
  }
  catch (e) {
    console.log(e);
  }
  listingMap.src = listing.mapUrl;
  listingAddress.innerHTML = listing.location;
  listingPhone.innerHTML = listing.phone;
  listingWebsite.innerHTML = `<p>${listing.website}</p>`;
  listingWebsite.href = listing.website;
  ownerName.innerHTML = listing.owner;
  listingOwner.src = listing.ownerImg;
}
$(document).ready(function() {
  <!-- Pseudo Implementation of Logged In User review -->
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    // Review button redirect to login
    $('#reviewBtn').on('click', function() {
      window.location.href = 'login.html';
    });
  } else {
    $('#reviewBtn').on('click', function() {
      $('.reviewForm').removeClass('hidden');
      $('html, body').animate({
        scrollTop: $('.reviewForm').offset().top
      }, 800);

      let currrentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currrentUser.profilePic !== '') {
        $('#profilePic').attr('src', currrentUser.profilePic);
      }
      $('#userName').text(currrentUser.username);
      $('#userNumOfReview').text(currrentUser.noOfReviews + ' Reviews');
    });

    $('.reviewForm').on('submit', function(event) {
      event.preventDefault();
      //Get the necessary data from the form
      let reviewTitle = $('#reviewTitle').val();
      let reviewContent = $('#reviewContent').val();
      let reviewImgs = $('.user-image-list li').map(function() {
        return $(this).attr('href');
      }).get();
      let starRating = $("input[name='rate']:checked").val();
      starRating = parseInt(starRating);

      let url = new URL(window.location.href);
      let id = url.searchParams.get('id');
      //add as a new review
      let newReview = {
        reviewID: generateReviewID(id),
        userID: JSON.parse(localStorage.getItem('currentUser')).username,
        listingID: id,
        reviewTitle: reviewTitle,
        reviewContent: reviewContent,
        reviewIMG: reviewImgs,
        reviewScore: starRating,
        reviewDate: new Date().toISOString(),
        reviewMarkedHelpful: 0,
        wasEdited: false,
        isDeleted: false
      }
      //add the review to the listing
      addListingReview(newReview);
      updateUserReviewCount(newReview.userID);
      // Hide the review form
      $('#userForm')[0].reset();
      $('.reviewForm').addClass('hidden');
      showPopup('Review Submitted!').then(function() {
        // Refresh the page
        location.reload();
      });
    });
  }
  // User Review Form
  initUserPopUp();
  $('#reviewImage').on('change', function() {
    let files = $(this)[0].files;
    let imageList = $('.user-image-list');
    let maxFiles = 5;

    //if current image list is not empty check if the new files exceed the max files
    if (imageList.children().length > 0) {
      if (files.length + imageList.children().length > maxFiles) {
        showPopup('Max 5 media allowed!');
        return;
      }
    }

    // Iterate over selected files
    for (let i = 0; i < files.length && i < maxFiles; i++) {
      let file = files[i];
      let reader = new FileReader();

      // Read the file as a data URL
      reader.onload = function(e) {
        let imageUrl = e.target.result;

        // Create a new li element with the image
        let li = $('<li>').addClass('user-image').attr('href', imageUrl);
        let img = $('<img>').attr('src', imageUrl).addClass('img-fluid').attr('alt', '#');
        li.append(img);

        // Append the li element to the image list
        imageList.append(li);
        //Initialize user image
        initUserPopUp();
      };

      // Read the file
      reader.readAsDataURL(file);
    }
    $('#reviewImage').val('');

  });

  // Clear the image list
  $('#clearImages').on('click', function() {
    // Clear the file input and image list
    $('#reviewImage').val('');
    $('.user-image-list').empty();
  });

  //Like button
  $('.button').on('click', function() {
    let $button = $(this);
    let $review = $button.closest('.mark-helpful');
    let $likeCount = $review.find('.like-count');
    let reviewID = $review.data('review-id');
    let listingID = $review.data('listing-id');
    let currentCount = parseInt($likeCount.text(), 10);

    if ($button.hasClass('liked')) {
      // Decrement the like count if already liked
      $likeCount.text(currentCount - 1);
      reviewMarkedHelpful(reviewID, listingID, -1)
    } else {
      // Increment the like count if not liked
      $likeCount.text(currentCount + 1);
      reviewMarkedHelpful(reviewID, listingID, 1)
    }

    // Toggle the 'liked' class on button
    $button.toggleClass('liked');

    // Animate the button using GSAP
    if ($button.hasClass('liked')) {
      gsap.fromTo($button[0], {
        '--hand-rotate': 8
      }, {
        ease: 'none',
        keyframes: [{
          '--hand-rotate': -45,
          duration: 0.16,
          ease: 'none'
        }, {
          '--hand-rotate': 15,
          duration: 0.12,
          ease: 'none'
        }, {
          '--hand-rotate': 0,
          duration: 0.2,
          ease: 'none',
          clearProps: true
        }]
      });
    }
  });
});
