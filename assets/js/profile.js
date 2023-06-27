function populateUserReviewImg(images) {
  let reviewImgs = '';
  images.forEach((img) => {
    reviewImgs+= `<li href="${img}" class="review-image">
          <img src="${img}" class="img-fluid" alt="#">
        </li>`;
  });
  return reviewImgs;
}
function populateUserReviewHistory(reviews, swiper) {
  const userDatabaseString = localStorage.getItem('userDatabase');
  const userDatabase = JSON.parse(userDatabaseString);
  const listingDatabaseString = JSON.parse(localStorage.getItem('listingDatabase'));
  //sort review by date
  reviews.sort((a, b) => { return new Date(b.reviewDate) - new Date(a.reviewDate) });
  console.log(reviews);
  reviews.forEach((review) => {
    let reviewUser = userDatabase.find(user => user.username === review.userID);
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

    swiper.innerHTML += ` <div class="swiper-slide">
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
        <button class="editReviewBtn btn btn-sm btn-primary">Edit</button>
        <button class="confirmModal deleteReviewBtn btn btn-sm btn-primary red-btn">Delete</button>
      </div>
    </div>
  </div>
  <hr>
</div> `;
  });
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
  let userData = database.find(user => user.username === userID);

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

  //Get user data
  let userPic = userData.profilePic;
  let name = userData.username;
  let followers = userData.followers;
  let reviews = userData.noOfReviews;
  let courseName = userData.course;
  let userDescription = userData.description;
  let collegeName = userData.college;
  let dateJoined = parseDate(userData.joinDate);


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
  try {
    populateUserReviewHistory(getUserReviews(name), reviewHistory);
  }
  catch (e) {
    console.log(e);
  }

  //Finally, some conditional logic when viewing your own profile
  if (currentUser) {
    followButton.style.display = 'none';
  }
  else {
    editButton.style.display = 'none';
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
  window.location.href = 'test-profile.html?id=' + currentUser.username;

}

//Check in profile.html if the id is valid
if (window.location.href.includes('test-profile.html')) {
  let url = new URL(window.location.href);
  let userID = url.searchParams.get('id');
  let checkValidUser = JSON.parse(localStorage.getItem('userDatabase')).find(user => user.username === userID);
  if (checkValidUser === undefined || checkValidUser === null) {
    window.location.href = '404.html';
  }
  else {
    let isCurrentUser = false;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      isCurrentUser = JSON.parse(localStorage.getItem('currentUser')).username === userID;
    }
    populateProfile(userID, isCurrentUser);
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
});
