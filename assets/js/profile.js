//Variable for swiper
let mySwiper;

//variable for the user profile
let userProfile;

//Review Limit Variable
let reviewLimit = 1;

//Object function for user profile
const getUserData = function (userData, isCurrentUser) {
  this.user = userData;
  this.isOwnProfile = isCurrentUser;
  this.userRHData = populateHistoryAsDiv(getUserReviews(this.user.username), this.user, isCurrentUser);
}

//Object function for review history
const reviewHistoryData = function (reviewHistory, divRH) {
  this.reviewHistory = reviewHistory;
  this.divRH = divRH;
}

//Turns review history into divs and returns an array of review history objects
function populateHistoryAsDiv(reviewHistory, reviewUser, isCurrentUser) {
  let userReviewHistory = [];
  let listingDatabaseString = JSON.parse(localStorage.getItem('listingDatabase'));

  reviewHistory.forEach((review) => {

    let swiperDiv = document.createElement('div');
    swiperDiv.classList.add('swiper-slide');
    swiperDiv.setAttribute('data-review-id', review.reviewID);
    swiperDiv.setAttribute('data-listing-id', review.listingID);
    swiperDiv.setAttribute('data-user-id', review.userID);
    let listingName = listingDatabaseString.find(listing => listing.id === review.listingID).name;

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
            <img src="${reviewUser.profilePic}" class="img-fluid" alt="#">
                    <p>${reviewUser.username}</p>
                    <span style="display: flex; justify-content: center">${reviewUser.noOfReviews} reviews</span>
                    <p style="font-weight: bold">[${listingName}]</p>
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
                ${populateUserReviewImg(review.reviewIMG)}
            </ul>
            <div class="mark-helpful" data-review-id="${review.reviewID}" data-listing-id="${review.listingID}">
                <span class="like-count">${review.reviewMarkedHelpful}</span> people marked this review as helpful
                ${
                isCurrentUser? `
                  <button class="editReviewBtn btn btn-sm btn-primary">Edit</button>
                  <button class="confirmModal deleteReviewBtn btn btn-sm btn-primary red-btn">Delete</button>`
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
    let rhData = new reviewHistoryData(review, swiperDiv);
    userReviewHistory.push(rhData);
  });
  return userReviewHistory;
}

function populateUserReviewImg(images) {
  let reviewImgs = '';
  images.forEach((img) => {
    reviewImgs+= `<li href="${img}" class="review-image">
          <img src="${img}" class="img-fluid" alt="#">
        </li>`;
  });
  return reviewImgs;
}
function populateUserReviewHistory(reviewHistory) {
  let swiperContainer = document.getElementById('reviewHistory');

  for (let i = swiperContainer.children.length; i < reviewLimit; i++) {
    swiperContainer.append(reviewHistory[i].divRH);
  }
  initSwiper();
}

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
      userProfile.userRHData.sort((a,b) => {
        return new Date(b.reviewHistory.reviewDate) - new Date(a.reviewHistory.reviewDate);
      });
      break;
    case 'date-oldest':
      userProfile.userRHData.sort((a,b) => {
        return new Date(a.reviewHistory.reviewDate) - new Date(b.reviewHistory.reviewDate);
      });
      break;
    case 'rating-high':
      userProfile.userRHData.sort((a,b) => {
        return b.reviewHistory.reviewScore - a.reviewHistory.reviewScore;
      });
      break;
    case 'rating-low':
      userProfile.userRHData.sort((a,b) => {
        return a.reviewHistory.reviewScore - b.reviewHistory.reviewScore;
      });
      break;
    default:
      return;
  }
  destroySwiper();
  clearReviewHistory();
  populateUserReviewHistory(userProfile.userRHData);
}

function loadMoreReviews(){

  if (reviewLimit >= userProfile.userRHData.length) {
    reviewLimit = 1;
    destroySwiper();
    clearReviewHistory();
    populateUserReviewHistory(userProfile.userRHData);
    return;
  }

  let swiperIndex = mySwiper.activeIndex;
  destroySwiper();
  if (reviewLimit < userProfile.userRHData.length)
    reviewLimit++;
  populateUserReviewHistory(userProfile.userRHData);
  // Set the active slide to the last appended element
  mySwiper.slideTo(reviewLimit - 1);
  //Reset the sort dropdown if it is not on the default option
  document.getElementById('sortReview').selectedIndex = 0;
}


function clearReviewHistory(){
  let reviewHistory = document.getElementById('reviewHistory');
  reviewHistory.innerHTML = '';
}
function destroySwiper(){
  mySwiper.destroy();
}

function parseDate(date) {
  //constant of full month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let newDate = new Date(date);
  let month = monthNames[newDate.getMonth()];
  let year = newDate.getFullYear();

  return month + ' ' + year;
}

function populateProfile(userID, currentUser) {
  let database = JSON.parse(localStorage.getItem('userDatabase'));
  userProfile = new getUserData(database.find(user => user.username === userID), currentUser);

  //Get the needed elements
  let profilePic = document.getElementById('userPic');
  let userName = document.getElementById('profileName');
  let followCount = document.getElementById('profileFollowerCount');
  let reviewCount = document.getElementById('profileReviewCount');
  let course = document.getElementById('profileCourse');
  let description = document.getElementById('profileDescription');
  let college = document.getElementById('profileCollege');
  let joinDate = document.getElementById('profileDate');
  let editButton = document.getElementById('editBtn');
  let followButton = document.getElementById('followBtn');
  let formCourse = document.getElementById('input-course');
  let formCollege = document.getElementById('input-college');
  let formDescription = document.getElementById('input-description');
  let reviewHistory = document.getElementById('reviewHistory');
  let reviewPagination = document.getElementById('review-pagination');
  let noReviews = document.createElement('div');

  //Get user data
  let userPic = userProfile.user.profilePic;
  let name = userProfile.user.username;
  let followers = userProfile.user.followers;
  let reviews = userProfile.user.noOfReviews;
  let courseName = userProfile.user.course;
  let userDescription = userProfile.user.description;
  let collegeName = userProfile.user.college;
  let dateJoined = parseDate(userProfile.user.joinDate);


  //Set user data
  profilePic.src = userPic;
  userName.innerHTML = name;
  followCount.innerHTML = followers;
  reviewCount.innerHTML = reviews;
  course.innerHTML = courseName;
  description.innerHTML = userDescription;
  college.innerHTML = collegeName;
  joinDate.innerHTML = dateJoined;
  formCourse.value = courseName;
  formCollege.value = collegeName;
  formDescription.value = userDescription;


  //Hides follow button if user is viewing their own profile
  if (currentUser) {
    followButton.style.display = 'none';
    noReviews.innerHTML = 'You have not written any reviews yet!';
  }
  //Hides edit button if user is not viewing their own profile
  else {
    editButton.style.display = 'none';
    noReviews.innerHTML = 'This user has not written any reviews yet!';
  }

  //Finally, populate the review history
  try {
    populateUserReviewHistory(userProfile.userRHData);
  }
  catch (e) {
    console.log(e);
    reviewPagination.style.display = 'none';
    reviewHistory.style.display = 'flex';
    reviewHistory.style.justifyContent = 'center';
    reviewHistory.append(noReviews);
  }
}

async function updateProfile() {
  //Get the needed elements
  let profilePic = document.getElementById('userPic').src;
  let course = document.getElementById('input-course').value;
  let college = document.getElementById('input-college').value;
  let description = document.getElementById('input-description').value;

  //update user data and save to local storage
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let database = JSON.parse(localStorage.getItem('userDatabase'));
  let userData = database.find(user => user.username === currentUser.username);
  userData.profilePic = profilePic;
  userData.course = course;
  userData.college = college;
  userData.description = description;

  localStorage.setItem('userDatabase', JSON.stringify(database));
  //update currentUser
  localStorage.setItem('currentUser', JSON.stringify(userData));

  await showPopup('Profile updated!');
  window.location.href = 'profile.html?id=' + currentUser.username;

}

//Check in profile.html if the id is valid
if (window.location.href.includes('profile.html')) {
  let url = new URL(window.location.href);
  let profileID = url.searchParams.get('id');
  let checkValidUser = JSON.parse(localStorage.getItem('userDatabase')).find(user => user.username === profileID);
  if (checkValidUser === undefined || checkValidUser === null) {
    window.location.href = '404.html';
  }
  else {
    let isCurrentUser = false;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      isCurrentUser = JSON.parse(localStorage.getItem('currentUser')).username === profileID;
    }
    populateProfile(profileID, isCurrentUser);
    if (isCurrentUser){
      const editForm = document.getElementById('editProfile');
      editForm.addEventListener('submit', function (e) {
        e.preventDefault();
        updateProfile();
      });
    }
  }
}

$(document).ready(function() {
  let readURL = function(input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        $('.profile-pic').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }
  $(".file-upload").on('change', function(){
    readURL(this);
  });

  $(".upload-button").on('click', function() {
    $(".file-upload").click();
  });

  $('#editBtn').on('click', function () {
    $('.edit-profile').removeClass('hidden');
    $('html, body').animate({
      scrollTop: $('.edit-profile').offset().top
    }, 800);
  });
  $('.file-upload').on('click', function() {
    $('#fileUpload').click();
  });

  $('#fileUpload').on('change', function() {
    let file = this.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
      $('#userPic').attr('src', e.target.result);
    };

    reader.readAsDataURL(file);
  });

  //Edit button for user review
  $('.editReviewBtn').on('click', function() {
    let editBtn = $(this);
    let userReview = editBtn.closest('.mark-helpful');
    let reviewID = userReview.data('review-id');
    let listingID = userReview.data('listing-id');
    let thisReview = getSpecificUserReview(listingID, reviewID);
    //uncover edit form
    let editForm = $('.edit-review');
    editForm.removeClass('hidden');
    //Match the review data with the form
    editForm.find('#review-title').val(thisReview.reviewTitle);
    editForm.find('#review-content').val(thisReview.reviewContent);
    editForm.find('input[name="rate"]').filter('[value="' + thisReview.reviewScore.toString() + '"]').prop('checked', true);
    //clear the image list
    editForm.find('.user-image-list').empty();
    thisReview.reviewIMG.forEach(img => {
      // Create a new li element with the image
      let list = $('<li>').addClass('user-image').attr('href', img);
      let imgContent = $('<img>').attr('src', img).addClass('img-fluid').attr('alt', '#');
      list.append(imgContent);

      // Append the li element to the image list
      editForm.find('.user-image-list').append(list);
      //Initialize user image
      initUserPopUp();
    });
    //add the reviewID and listingID on submit button
    editForm.find('#editReview').attr('data-review-id', reviewID);
    editForm.find('#editReview').attr('data-listing-id', listingID);
  });

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

  //Submit
  $('#editReviewForm').on('submit', function (e) {
    e.preventDefault();
    // Get listing and review id data directly from the form
    let reviewID = $('#editReview').data('review-id');
    let listingID = $('#editReview').data('listing-id');
    let reviewTitle = $('#review-title').val();
    let reviewContent = $('#review-content').val();
    let reviewScore = $('input[name="rate"]:checked').val();
    let reviewIMG = [];
    $('.user-image-list li').each(function () {
      reviewIMG.push($(this).attr('href'));
    });

    // Update the review
    let reviewToEdit = getSpecificUserReview(listingID, reviewID);
    console.log(reviewToEdit);
    reviewToEdit.reviewTitle = reviewTitle;
    reviewToEdit.reviewContent = reviewContent;
    reviewToEdit.reviewScore = parseInt(reviewScore);
    reviewToEdit.reviewIMG = reviewIMG;
    reviewToEdit.wasEdited = true;
    editListingReview(reviewToEdit);

    // Hide the edit form
    $('#editForm').addClass('hidden');

    // Reload the page
    showPopup('Review edited successfully!').then(function () {
      location.reload();
    });
  });

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
  $('.button').on('click', function() {
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
  });

});
