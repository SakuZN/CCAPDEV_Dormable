/* ==============================================================
   GLOBAL VARIABLES
   ============================================================== */
//Variable for swiper
let mySwiper;

//ArrayList of Users that reviewed
let reviewHistory = [];

//Review Limit Variable
let reviewLimit = 3;

//userDatabase
let userDatabase = JSON.parse(localStorage.getItem('userDatabase'));

//listingDatabase
let listingDatabase = JSON.parse(localStorage.getItem('listingDatabase'));

//Current User
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

/* ==============================================================
   OBJECT FUNCTIONS
   ============================================================== */


//Object function for review history
const reviewHistoryData = function (reviewHistory, divRH, isCurrentUser) {
  this.RHData = reviewHistory;
  this.divRH = divRH;
  this.isCurrentUser = isCurrentUser;
}

/* ==============================================================
   SWIPER FUNCTIONS
   ============================================================== */
function initSwiper(){
  mySwiper = new Swiper("#Reviews", {
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
/* ==============================================================
   INITIALIZATION LOGIC EVENT LISTENERS AND FUNCTIONS
   ============================================================== */
// get the id from the url
let url = new URL(window.location.href);
let id = url.searchParams.get('id');
let checkValidId = fetchData().find((listing) => listing.id === id);
if (id === null || checkValidId === undefined) {
  window.location.href = '404.html';
}
else {
  updateListings();
  populateListingPage(id);
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
  let noReviews = document.createElement('div');
  let reviewPagination = document.getElementById('review-pagination');
  let writeReviewBtn = document.getElementById('reviewBtn');
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
    reviewHistory = populateHistoryAsDiv(getListingReviews(id_page));
    populateListingReviews(reviewHistory);
  }
  catch (e) {
    console.log(e);
    noReviews.innerHTML = '<h4>No reviews yet</h4>';
    reviewPagination.style.display = 'none';
    listingReviews.style.display = 'flex';
    listingReviews.style.justifyContent = 'center';
    listingReviews.append(noReviews);
  }

  if (userHasReviewed()) {
    writeReviewBtn.innerHTML = 'Edit Review';
  }

  listingMap.src = listing.mapUrl;
  listingAddress.innerHTML = listing.location;
  listingPhone.innerHTML = listing.phone;
  listingWebsite.innerHTML = `<p>${listing.website}</p>`;
  listingWebsite.href = listing.website;
  ownerName.innerHTML = listing.owner;
  listingOwner.src = listing.ownerImg;
}

/* ==============================================================
   POPULATION FUNCTIONS
   ============================================================== */

//Turns review history into divs and returns an array of review history objects
function populateHistoryAsDiv(reviewHistory) {
  let userReviewHistory = [];
  reviewHistory.forEach((review) => {

    let swiperDiv = document.createElement('div');
    swiperDiv.classList.add('swiper-slide');
    swiperDiv.setAttribute('data-review-id', review.reviewID);
    swiperDiv.setAttribute('data-listing-id', review.listingID);
    swiperDiv.setAttribute('data-user-id', review.userID);
    let isCurrentUser;
    if (currentUser === null || currentUser === undefined)
      isCurrentUser = false;
    else
      isCurrentUser = (review.userID === currentUser.username);

    let reviewUser = userDatabase.find(user => user.username === review.userID);
    let scoreClass = '';
    let checkEdit = '';

    if (review.wasEdited)
      checkEdit = '(Review Edited)';
    if (review.reviewScore >= 4)
      scoreClass = 'customer-rating';
    else if (review.reviewScore === 3)
      scoreClass = 'customer-rating yellow';
    else
      scoreClass = 'customer-rating red';

    swiperDiv.innerHTML = `
        <div class="customer-review_wrap">
            <div class="customer-img">
                <a href="profile.html?id=${review.userID}" style="cursor: pointer">
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
                <p class="customer-text" style="font-weight: bold">Reviewed ${reviewDate(review.reviewDate)}<i style="font-style: italic"> ${checkEdit}</i></p>
                </div>
                <div class="${scoreClass}">${review.reviewScore}.0</div>
            </div>
            <p class="customer-text">${review.reviewContent}</p>
            <ul>
                ${populateReviewImg(review.reviewIMG)}
            </ul>
            <div class="mark-helpful" data-review-id="${review.reviewID}" data-listing-id="${review.listingID}">
                <span class="like-count">${review.reviewMarkedHelpful}</span> people marked this review as helpful
                ${
      isCurrentUser? `
                  <button class="confirmModal btn btn-outline-danger btn-sm">Delete</button>`
        :`
                  <button class="button">
                     <div class="hand">
                        <div class="thumb"></div>
                     </div>
                     <span>Like<span>d</span></span>
                  </button>`
    }
            </div>
            </div>
        </div>
        <hr>`;
    let rhData = new reviewHistoryData(review, swiperDiv, isCurrentUser);
    userReviewHistory.push(rhData);
  });
  return userReviewHistory;
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
function populateListingReviews(reviews) {
  let swiperContainer = document.getElementById('review-swiper');

  for (let i = swiperContainer.children.length; i < reviewLimit; i++) {
    swiperContainer.append(reviews[i].divRH);
  }
  initSwiper();
  initReviewPopUp();
}

/* ==============================================================
   REVIEW HISTORY FEATURES
   ============================================================== */

function sortReviewHistory(sortType){
  /*
  Sort types:
    1. Date (Newest to Oldest)
    2. Date (Oldest to Newest)
    3. Rating (Highest to Lowest)
    4. Rating (Lowest to Highest)
  */

  switch(sortType){
    case 'date-newest':
      reviewHistory.sort((a,b) => {
        return new Date(b.RHData.reviewDate) - new Date(a.RHData.reviewDate);
      });
      break;
    case 'date-oldest':
      reviewHistory.sort((a,b) => {
        return new Date(a.RHData.reviewDate) - new Date(b.RHData.reviewDate);
      });
      break;
    case 'rating-high':
      reviewHistory.sort((a,b) => {
        return b.RHData.reviewScore - a.RHData.reviewScore;
      });
      break;
    case 'rating-low':
      reviewHistory.sort((a,b) => {
        return a.RHData.reviewScore - b.RHData.reviewScore;
      });
      break;
    default:
      return;
  }
  destroySwiper();
  clearReviewHistory();
  populateListingReviews(reviewHistory);
}

function loadMoreReviews(){

  if (reviewLimit >= reviewHistory.length) {
    /*
    reviewLimit = 1;
    destroySwiper();
    clearReviewHistory();
    populateUserReviewHistory(userProfile.userRHData);
     */
    showPopup('No more reviews to load');
    return;
  }

  let swiperIndex = mySwiper.activeIndex;
  destroySwiper();
  if (reviewLimit < reviewHistory.length)
    reviewLimit++;
  populateListingReviews(reviewHistory);
  // Set the active slide to the last appended element
  mySwiper.slideTo(swiperIndex);
  //Reset the sort dropdown if it is not on the default option
  document.getElementById('sortReview').selectedIndex = 0;
  initUserPopUp();
}

/* ==============================================================
   MISC FUNCTIONS
   ============================================================== */

function clearReviewHistory(){
  let reviewHistory = document.getElementById('review-swiper');
  reviewHistory.innerHTML = '';
}

function initReviewPopUp(){
  if ($('.review-image').length) {
    $('.review-image').magnificPopup({
      type: 'image',
      gallery: {
        enabled: false
      }
    });
  }
}

function userHasReviewed(){
  let userReview = false;
  if (currentUser === null || currentUser === undefined)
    return userReview;
  reviewHistory.forEach((rh) => {
    if (rh.RHData.userID === currentUser.username)
      userReview = true;
  });
  return userReview;
}

/* ==============================================================
   DOM EVENT LISTENERS
   ============================================================== */

$(document).ready(function() {
  <!-- Pseudo Implementation of Logged In User review -->
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    // Review button redirect to login
    $('#reviewBtn').on('click', function() {
      window.location.href = 'login.html';
    });
  } else {
    $('#reviewBtn').on('click', function() {
      if (userHasReviewed()) {
        showPopup('You have already reviewed this listing');
        return;
      }
      $('.reviewForm').removeClass('hidden');
      $('html, body').animate({
        scrollTop: $('.reviewForm').offset().top
      }, 800);

      if (currentUser.profilePic !== '') {
        $('#profilePic').attr('src', currentUser.profilePic);
      }
      $('#userName').text(currentUser.username);
      $('#userNumOfReview').text(currentUser.noOfReviews + ' Reviews');
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
        userID: currentUser.username,
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
  // User Review Edit Form
  initUserPopUp();
  $('#reviewImage').on('change', function() {
    let files = $(this)[0].files;
    let imageList = $('.user-image-list');
    let maxFiles = 5;
    let hasVideo = false;
    let maxImageSize = 2 * 1024 * 1024; // 5MB
    let maxVideoSize = 5 * 1024 * 1024; // 5MB

    //if current image list is not empty check if the new files exceed the max files
    if (imageList.children().length > 0) {
      if (files.length + imageList.children().length > maxFiles) {
        showPopup('Max 5 media allowed!');
        return;
      }
      else {
        imageList.children().each(function() {
          if ($(this).data('type') === 'video')
            hasVideo = true;
        });
      }

    }

    // Iterate over selected files
    for (let i = 0; i < files.length && i < maxFiles; i++) {
      let file = files[i];
      let fileSize = file.size;
      //Do some conditional pre-check

      //Check if the file is video and if there is already a video
      if (file.type.includes('video/') && hasVideo) {
        showPopup('Max 1 video allowed!');
        return;
      }
      //Then, check for file size
      if (fileSize > maxImageSize && !file.type.includes('video/')) {
        showPopup('Max 2MB per image!');
        return;
      }
      if (fileSize > maxVideoSize && file.type.includes('video/')) {
        showPopup('Max 5MB per video!');
        return;
      }

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

  //Delete review
  $('.confirmModal').click(function(e) {
    e.preventDefault();
    $.confirmModal('Delete this review?', {
      confirmButton: "Yes",
      cancelButton: "No",
      messageHeader: "Review Deletion",
      modalVerticalCenter: true,
      fadeAnimation: true,
    },function(el) {
      let deleteBtn = $(el);
      let userReview = deleteBtn.closest('.mark-helpful');
      let reviewID = userReview.data('review-id');
      let listingID = userReview.data('listing-id');
      deleteListingReview(reviewID, listingID);
      showPopup('Review deleted successfully!').then(function () {
        location.reload();
      });
    }, function() {
      // This function will be called when the user clicks the "No" button
      console.log("Cancel clicked");
    });
  });

  //Like button
  $(document).on('click', '.button', function() {
    console.log('clicked');
    let $button = $(this);
    let $review = $button.closest('.mark-helpful');
    //get the parent of the button
    let $reviewContainer = $review.closest('.swiper-slide')
    let $likeCount = $review.find('.like-count');
    let reviewID = $reviewContainer.data('review-id');
    let listingID = $reviewContainer.data('listing-id');
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

  //Sort by List
  $('#sortReview').on('change', function() {
    let sortType = $(this).val();
    sortReviewHistory(sortType);
    initUserPopUp();
  });

});
