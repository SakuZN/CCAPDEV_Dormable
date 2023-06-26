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

  //Get user data
  let userPic = userData.profilePic;
  let name = userData.username;
  let followers = userData.followers;
  let reviews = userData.noOfReviews;
  let courseName = userData.course;
  let userDescription = userData.description;
  let collegeName = userData.college;
  let dateJoined = userData.joinDate;


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
  var readURL = function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

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
    var file = this.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#userPic').attr('src', e.target.result);
    };

    reader.readAsDataURL(file);
  });
});
