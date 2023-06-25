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

      var currrentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currrentUser.profilePic !== '') {
        $('#profilePic').attr('src', currrentUser.profilePic);
      }
      $('#userName').text(currrentUser.username);
      $('#userNumOfReview').text(currrentUser.noOfReviews + ' Reviews');
    });

    $('.reviewForm').on('submit', function(event) {
      event.preventDefault();
      showPopup('Review Submitted!');
      // Hide the review form
      $('#userForm')[0].reset();
      $('.reviewForm').addClass('hidden');
    });
  }
  // User Review Form
  initUserPopUp();
  $('#reviewImage').on('change', function() {
    var files = $(this)[0].files;
    var imageList = $('.user-image-list');
    var maxFiles = 5;

    //if current image list is not empty check if the new files exceed the max files
    if (imageList.children().length > 0) {
      if (files.length + imageList.children().length > maxFiles) {
        showPopup('Max 5 media allowed!');
        return;
      }
    }

    // Iterate over selected files
    for (var i = 0; i < files.length && i < maxFiles; i++) {
      var file = files[i];
      var reader = new FileReader();

      // Read the file as a data URL
      reader.onload = function(e) {
        var imageUrl = e.target.result;

        // Create a new li element with the image
        var li = $('<li>').addClass('user-image').attr('href', imageUrl);
        var img = $('<img>').attr('src', imageUrl).addClass('img-fluid').attr('alt', '#');
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
    var $button = $(this);
    var $review = $button.closest('.mark-helpful');
    var $likeCount = $review.find('.like-count');
    var currentCount = parseInt($likeCount.text(), 10);

    if ($button.hasClass('liked')) {
      // Decrement the like count if already liked
      $likeCount.text(currentCount - 1);
    } else {
      // Increment the like count if not liked
      $likeCount.text(currentCount + 1);
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
