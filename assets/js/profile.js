/* ==============================================================
   GLOBAL VARIABLES
   ============================================================== */
//Variable for swiper
let mySwiper;

//variable for the user profile
let userProfile;

//Review Limit Variable
let reviewLimit = 3;

/* ==============================================================
   OBJECT FUNCTIONS
   ============================================================== */

//Object function for user profile
class UserData {
    constructor(userData, isCurrentUser) {
        this.user = userData;
        this.isOwnProfile = isCurrentUser;
    }

    async initialize() {
        this.userRHData = await populateHistoryAsDiv(
            await getUserReviews(this.user.username),
            this.user,
            this.isOwnProfile
        );
    }
}

//Object function for review history
const reviewHistoryData = function (
    reviewHistory,
    divRH,
    divcRU,
    divcRUResponse
) {
    this.reviewHistory = reviewHistory;
    this.divRH = divRH;
    this.divcRU = divcRU;
    this.divcRUResponse = divcRUResponse;
};

/* ==============================================================
   SWIPER FUNCTIONS
   ============================================================== */
function initSwiper() {
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

function destroySwiper() {
    mySwiper.destroy();
}

/* ==============================================================
   INITIALIZATION LOGIC EVENT LISTENERS AND FUNCTIONS
   ============================================================== */
//Check in profile.html if the id is valid
(async () => {
    //Check in profile.html if the id is valid
    if (window.location.href.includes("/profile")) {
        let url = new URL(window.location.href);
        let profileID = url.searchParams.get("id");

        let checkValidUser = await checkExistingUsername(profileID);
        let checkValidOwner = await checkIfOwnerExist(profileID);

        if (!checkValidUser && !checkValidOwner) {
            window.location.href = "/404";
        } else {
            //Initialize the profile page
            let isCurrentUser = false;
            if (checkValidUser) {
                isCurrentUser = await checkIfSameUserID(profileID);
                await populateStudentProfile(profileID, isCurrentUser).then(
                    () => {
                        $("#js-preloader").addClass("loaded");
                    }
                );
            } else if (checkValidOwner) {
                isCurrentUser = await checkIfSameOwnerID(profileID);
                await populateOwnerProfile(profileID, isCurrentUser).then(
                    () => {
                        $("#js-preloader").addClass("loaded");
                    }
                );
            }
        }
    }
})();

async function populateOwnerProfile(ownerID, currentUser) {
    let ownerProfile = await getSpecificListingOwner(ownerID);
    //Get the needed elements
    let profilePic = document.getElementById("userPic");
    let userName = document.getElementById("profileUserName");
    let customName = document.getElementById("profileCustomName");
    let followCount = document.getElementById("profileFollowerCount");
    let reviewCount = document.getElementById("profileReviewCount");
    let course = document.getElementById("profileCourse");
    let description = document.getElementById("profileDescription");
    let college = document.getElementById("profileCollege");
    let joinDate = document.getElementById("profileDate");
    let editButton = document.getElementById("editBtn");
    let followButton = document.getElementById("followBtn");
    let formCustomName = document.getElementById("input-customName");
    let formCourse = document.getElementById("input-course");
    let formCollege = document.getElementById("input-college");
    let formDescription = document.getElementById("input-description");
    let reviewHistory = document.getElementById("reviewHistory");
    let reviewPagination = document.getElementById("review-pagination");
    let listingSection = document.getElementById("ownerListings");
    let noOfListings = document.getElementById("followersDescription");
    let profileTitle = document.getElementById("profileTitle");
    //Get user data
    let userPic = ownerProfile.profilePic;
    let name = ownerProfile.username;
    let userCustomName = ownerProfile.customName;
    if (
        userCustomName === "" ||
        userCustomName === null ||
        userCustomName === undefined
    )
        userCustomName = name;
    let followers = ownerProfile.followers;
    let listingCount = ownerProfile.noOfListings;
    let courseName = ownerProfile.country;
    let userDescription = ownerProfile.description;
    let collegeName = ownerProfile.website;
    let dateJoined = parseDate(ownerProfile.joinDate);

    //Set user data
    if (userPic) {
        profilePic.src = userPic;
    }
    userName.innerHTML = "@" + name;
    customName.innerHTML = userCustomName;
    followCount.innerHTML = followers;
    reviewCount.innerHTML = listingCount;
    noOfListings.innerHTML = "Listings";
    course.innerHTML = courseName;
    description.innerHTML = userDescription;
    college.innerHTML = collegeName;
    joinDate.innerHTML = dateJoined;
    formCustomName.value = userCustomName;
    formCourse.value = courseName;
    formCollege.value = `<a href="${collegeName}">${collegeName}</a>`;
    formDescription.value = userDescription;
    listingSection.classList.remove("hidden");
    profileTitle.innerHTML = "Owner Profile";

    //Checks if user is already following the user
    try {
        if (await isFollowingUser(ownerID)) {
            followButton.innerHTML = "Following";
            followButton.classList.add("followed");
        }
    } catch (err) {
        //When it fails, it means current user is an owner
        followButton.style.display = "none";
        editButton.style.display = "none";
    }

    //Hides follow button if user is viewing their own profile
    if (currentUser) {
        followButton.style.display = "none";
    }
    //Hides edit button if user is not viewing their own profile
    else {
        editButton.style.display = "none";
    }

    //Finally, populate the listing section
    await initOwnerListing(ownerID);
}

async function populateStudentProfile(userID, currentUser) {
    userProfile = new UserData(await getSpecificUser(userID), currentUser);
    await userProfile.initialize();
    //Get the needed elements
    let profilePic = document.getElementById("userPic");
    let userName = document.getElementById("profileUserName");
    let customName = document.getElementById("profileCustomName");
    let followCount = document.getElementById("profileFollowerCount");
    let reviewCount = document.getElementById("profileReviewCount");
    let course = document.getElementById("profileCourse");
    let description = document.getElementById("profileDescription");
    let college = document.getElementById("profileCollege");
    let joinDate = document.getElementById("profileDate");
    let editButton = document.getElementById("editBtn");
    let followButton = document.getElementById("followBtn");
    let formCustomName = document.getElementById("input-customName");
    let formCourse = document.getElementById("input-course");
    let formCollege = document.getElementById("input-college");
    let formDescription = document.getElementById("input-description");
    let reviewHistory = document.getElementById("reviewHistory");
    let reviewPagination = document.getElementById("review-pagination");
    let noReviews = document.createElement("div");
    let RHSection = document.getElementById("RHSection");

    //Get user data
    let userPic = userProfile.user.profilePic;
    let name = userProfile.user.username;
    let userCustomName = userProfile.user.customName;
    if (
        userCustomName === "" ||
        userCustomName === null ||
        userCustomName === undefined
    )
        userCustomName = name;
    let followers = userProfile.user.followers;
    let reviews = userProfile.user.noOfReviews;
    let courseName = userProfile.user.course;
    let userDescription = userProfile.user.description;
    let collegeName = userProfile.user.college;
    let dateJoined = parseDate(userProfile.user.joinDate);

    //Set user data
    if (userPic) {
        profilePic.src = userPic;
    }
    userName.innerHTML = "@" + name;
    customName.innerHTML = userCustomName;
    followCount.innerHTML = followers;
    reviewCount.innerHTML = reviews;
    course.innerHTML = courseName;
    description.innerHTML = userDescription;
    college.innerHTML = collegeName;
    joinDate.innerHTML = dateJoined;
    formCustomName.value = userCustomName;
    formCourse.value = courseName;
    formCollege.value = collegeName;
    formDescription.value = userDescription;
    RHSection.classList.remove("hidden");

    //Checks if user is already following the user
    if (await isFollowingUser(userID)) {
        followButton.innerHTML = "Following";
        followButton.classList.add("followed");
    }

    //Hides follow button if user is viewing their own profile
    if (currentUser) {
        followButton.style.display = "none";
        noReviews.innerHTML = "You have not written any reviews yet!";
    }
    //Hides edit button if user is not viewing their own profile
    else {
        editButton.style.display = "none";
        noReviews.innerHTML = "This user has not written any reviews yet!";
    }

    //Finally, populate the review history
    try {
        populateUserReviewHistory(userProfile.userRHData);
        if (userProfile.userRHData.length < 1) {
            reviewPagination.style.display = "none";
            reviewHistory.style.display = "flex";
            reviewHistory.style.justifyContent = "center";
            reviewHistory.append(noReviews);
        }
    } catch (e) {
        reviewPagination.style.display = "none";
        reviewHistory.style.display = "flex";
        reviewHistory.style.justifyContent = "center";
        reviewHistory.append(noReviews);
    }
}

/* ==============================================================
   POPULATION FUNCTIONS
   ============================================================== */

//Turns review history into divs and returns an array of review history objects
async function populateHistoryAsDiv(reviewHistory, reviewUser, isCurrentUser) {
    let userReviewHistory = [];

    for (const review of reviewHistory) {
        let swiperDiv = document.createElement("div");
        swiperDiv.classList.add("swiper-slide");
        swiperDiv.setAttribute("data-review-id", review.reviewID);
        swiperDiv.setAttribute("data-listing-id", review.listingID);
        swiperDiv.setAttribute("data-user-id", review.userID);
        let listing = await getSpecificListing(review.listingID);
        let listingName = listing.name;
        let userCustomName = reviewUser.customName;

        let scoreClass = "";
        let checkEdit = "";
        if (review.wasEdited) checkEdit = "(Review Edited)";
        if (review.reviewScore >= 4) scoreClass = "customer-rating";
        else if (review.reviewScore === 3)
            scoreClass = "customer-rating yellow";
        else scoreClass = "customer-rating red";

        let buttonHTML;
        let likedOrNot = (await checkIfLikedReview(
            review.reviewID,
            review.listingID,
            review.userID
        ))
            ? "liked"
            : "";

        if (isCurrentUser) {
            buttonHTML =
                '<button class="editReviewBtn btn btn-outline-primary btn-sm">Edit</button>' +
                '<button class="confirmModal btn btn-outline-danger btn-sm">Delete</button>';
        } else {
            buttonHTML = `<button class="button ${likedOrNot}">
                     <div class="hand">
                        <div class="thumb"></div>
                     </div>
                     <span>Like<span>d</span></span>
                  </button>`;
        }

        swiperDiv.innerHTML = `
        <div class="customer-review_wrap">
            <div class="customer-img">
            <img src="${
                reviewUser.profilePic
            }" class="img-fluid profile-review" alt="#">
                    <p>${userCustomName}</p>
                    <p style="font-size: 13px; color: gray">@${
                        reviewUser.username
                    }</p>
                    <span style="display: flex; justify-content: center; margin-top: 5px">${
                        reviewUser.noOfReviews
                    } reviews</span>
            </div>
            <div class="customer-content-wrap">
            <div class="customer-content">
                <div class="customer-review">
                <div class="${scoreClass}">${review.reviewScore}.0</div>
                <h6>${review.reviewTitle}<a href="/listing?id=${
            review.listingID
        }" target="_blank" style="border: none"><p style="font-weight: bolder;">[${listingName}]</p>
                </a>
                </h6>
                <ul class="star-rating">
                    ${star_rating(review.reviewScore, 0, "listing")}
                </ul>
                <p class="customer-text" style="font-weight: bold">Reviewed ${reviewDate(
                    review.reviewDate
                )}<i style="font-style: italic"> ${checkEdit}</i></p>
                </div>
            </div>
            <p class="customer-text comment-border">${review.reviewContent}</p>
            <ul>
                ${populateUserReviewImg(review.reviewIMG)}
            </ul>
            <div class="mark-helpful" data-review-id="${
                review.reviewID
            }" data-listing-id="${review.listingID}">
                <span class="like-count">${
                    review.reviewMarkedHelpful
                }</span> people marked this review as helpful
                ${buttonHTML}
                <button class="commentBtn btn btn-sm btn-outline-info" data-target="#commentModal" data-toggle="modal" type="button">
                    View Comment
                </button>
            </div>
            </div>
        </div>
        <hr>`;
        //Div container for comment history
        let cRUReviewHistory = document.createElement("div");
        cRUReviewHistory.classList.add("booking-checkbox_wrap");
        cRUReviewHistory.classList.add("mt-4");

        cRUReviewHistory.innerHTML = `
          <div class="customer-review_wrap">
            <div class="customer-img">
              <img alt="#" class="img-fluid" id="cRU" src="${
                  reviewUser.profilePic
              }">
              <p id="cRUCustomName">${userCustomName}</p>
              <p id="cRUName" style="font-size: 13px; color: gray">@${
                  reviewUser.username
              }</p>
              <span style="display: flex; justify-content: center; margin-top: 5px" id="cRUReviews">${
                  reviewUser.noOfReviews
              } reviews</span>
            </div>
            <div class="customer-content-wrap">
              <div class="customer-content">
                <div class="customer-review">
                <div class="${scoreClass}">${review.reviewScore}.0</div>
                  <h6 id="cRUTitle">${review.reviewTitle}</h6>
                  <ul id="cRUStarRating" class="star-rating">
                    ${star_rating(review.reviewScore, 0, "listing")}
                  </ul>
                  <p id="cRUDate">Reviewed ${reviewDate(review.reviewDate)}</p>
                </div>
              </div>
              <p class="customer-text comment-border" id="cRUContent">${
                  review.reviewContent
              }</p>
              <ul id="cRUImages">
                ${populateUserReviewImg(review.reviewIMG)}
              </ul>
              <span class="like-count">${
                  review.reviewMarkedHelpful
              } people marked this review as helpful</span>
            </div>
          </div>
          <hr>
    `;

        //Div container for review comment response, if it exist
        let cRUReviewResponse = document.createElement("div");
        cRUReviewResponse.classList.add("booking-checkbox_wrap");
        cRUReviewResponse.classList.add("mt-4");
        cRUReviewResponse.style.textAlign = "center";
        cRUReviewResponse.innerHTML =
            "Owner has not responded to this review yet.";

        if (
            await checkIfCommented(
                review.reviewID,
                review.listingID,
                review.userID
            )
        ) {
            cRUReviewResponse.innerHTML = "";
            cRUReviewResponse.style.textAlign = "";
            let commentResponse = await getReviewResponse(
                review.reviewID,
                review.listingID,
                review.userID
            );
            let owner = await getSpecificListingOwner(commentResponse.ownerID);
            cRUReviewResponse.innerHTML = `
        <div class="customer-review_wrap">
            <div class="customer-img">
              <img alt="#" class="img-fluid" src="${owner.profilePic}">
              <p>${owner.customName}</p>
              <p style="font-size: 13px; color: gray">@${owner.username}</p>
            </div>
            <div class="customer-content-wrap">
              <div class="customer-content">
                <div class="customer-review">
                  <p style="font-weight: 300; margin: 0">Commented ${reviewDate(
                      commentResponse.commentDate
                  )}</p>
                </div>
              </div>
              <p class="customer-text comment-border">${
                  commentResponse.response
              }</p>
            </div>
          </div>
          <hr>
      `;
        }

        let rhData = new reviewHistoryData(
            review,
            swiperDiv,
            cRUReviewHistory,
            cRUReviewResponse,
            isCurrentUser
        );
        userReviewHistory.push(rhData);
    }
    return userReviewHistory;
}

function populateUserReviewImg(images) {
    let reviewImgs = "";
    images.forEach((img) => {
        reviewImgs += `<li href="${img}" class="review-image">
          <img src="${img}" class="img-fluid-review" alt="#">
        </li>`;
    });
    return reviewImgs;
}

function populateUserReviewHistory(reviewHistory) {
    let swiperContainer = document.getElementById("reviewHistory");

    if (reviewLimit > reviewHistory.length)
        reviewHistory.forEach((review) => {
            swiperContainer.append(review.divRH);
        });
    else
        for (let i = swiperContainer.children.length; i < reviewLimit; i++) {
            swiperContainer.append(reviewHistory[i].divRH);
        }
    initSwiper();
    initReviewPopUp();
}

/* ==============================================================
   REVIEW HISTORY FEATURES
   ============================================================== */

function sortReviewHistory(sortType) {
    /*
    Sort types:
      1. Date (Newest to Oldest)
      2. Date (Oldest to Newest)
      3. Rating (Highest to Lowest)
      4. Rating (Lowest to Highest)
    */
    if (userProfile.userRHData.length <= 1) return;

    switch (sortType) {
        case "date-newest":
            userProfile.userRHData.sort((a, b) => {
                return (
                    new Date(b.reviewHistory.reviewDate) -
                    new Date(a.reviewHistory.reviewDate)
                );
            });
            break;
        case "date-oldest":
            userProfile.userRHData.sort((a, b) => {
                return (
                    new Date(a.reviewHistory.reviewDate) -
                    new Date(b.reviewHistory.reviewDate)
                );
            });
            break;
        case "rating-high":
            userProfile.userRHData.sort((a, b) => {
                return (
                    b.reviewHistory.reviewScore - a.reviewHistory.reviewScore
                );
            });
            break;
        case "rating-low":
            userProfile.userRHData.sort((a, b) => {
                return (
                    a.reviewHistory.reviewScore - b.reviewHistory.reviewScore
                );
            });
            break;
        default:
            return;
    }
    destroySwiper();
    clearReviewHistory();
    populateUserReviewHistory(userProfile.userRHData);
}

function loadMoreReviews() {
    if (reviewLimit >= userProfile.userRHData.length) {
        /*
        reviewLimit = 1;
        destroySwiper();
        clearReviewHistory();
        populateUserReviewHistory(userProfile.userRHData);
         */
        showPopup("No more reviews to load");
        return;
    }

    let swiperIndex = mySwiper.activeIndex;
    destroySwiper();
    if (reviewLimit < userProfile.userRHData.length) reviewLimit++;
    populateUserReviewHistory(userProfile.userRHData);
    // Set the active slide to the last appended element
    mySwiper.slideTo(swiperIndex);
    //Reset the sort dropdown if it is not on the default option
    document.getElementById("sortReview").selectedIndex = 0;
    initReviewPopUp();
}

function findUserReview(reviewID, listingID) {
    let review = null;
    userProfile.userRHData.forEach((rhData) => {
        if (
            rhData.reviewHistory.reviewID === reviewID &&
            rhData.reviewHistory.listingID === listingID
        )
            review = rhData;
    });
    initReviewPopUp();
    return review;
}

/* ==============================================================
   MISC FUNCTIONS
   ============================================================== */
function initReviewPopUp() {
    if ($(".review-image").length) {
        $(".review-image").magnificPopup({
            type: "image",
            gallery: {
                enabled: false,
            },
        });
    }
}

function initUserPopUp() {
    $(".user-image").magnificPopup({
        type: "image",
        gallery: {
            enabled: true,
        },
    });
}

function clearReviewHistory() {
    let reviewHistory = document.getElementById("reviewHistory");
    reviewHistory.innerHTML = "";
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
        "December",
    ];
    let newDate = new Date(date);
    let month = monthNames[newDate.getMonth()];
    let year = newDate.getFullYear();

    return month + " " + year;
}

async function updateProfile() {
    //Get the needed elements
    let inputProfilePic = document.getElementById("fileUpload");
    let profilePic =
        inputProfilePic.files && inputProfilePic.files[0]
            ? inputProfilePic.files[0]
            : null;
    let customName = document.getElementById("input-customName").value;
    let course = document.getElementById("input-course").value;
    let college = document.getElementById("input-college").value;
    let description = document.getElementById("input-description").value;

    //update user data and save to local storage
    let currentUser = await getCurrentUser();
    currentUser.customName = customName;
    currentUser.course = course;
    currentUser.college = college;
    currentUser.description = description;

    await updateUser(currentUser, profilePic);
    location.reload();
}

/* ==============================================================
   DOM EVENT LISTENERS
   ============================================================== */

$(document).ready(function () {
    let filePicArray = [];
    let clearedImages = false;

    /* ==============================================================
   HANDLES PROFILE RELATED EVENTS
   ============================================================== */
    let readURL = function (input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                $("#userPic").attr("src", e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    };
    $(".file-upload").on("click", function () {
        $("#fileUpload").click();
    });
    $("#fileUpload").on("change", function () {
        readURL(this);
    });

    $("#editBtn").on("click", function () {
        if (!$(".edit-profile").hasClass("hidden")) {
            $(".edit-profile").addClass("hidden");
            return;
        }
        $(".edit-profile").removeClass("hidden");
        $("html, body").animate(
            {
                scrollTop: $(".edit-profile").offset().top,
            },
            800
        );
    });
    $("#editProfile").on("submit", async function (event) {
        //prevent default form submission
        event.preventDefault();
        await updateProfile();
    });

    /* ==============================================================
   EDIT REVIEW RELATED EVENTS
   ============================================================== */

    $(document).on("click", ".editReviewBtn", async function () {
        let editBtn = $(this);
        let userReview = editBtn.closest(".mark-helpful");
        let reviewID = userReview.data("review-id");
        let listingID = userReview.data("listing-id");
        let thisReview = await getSpecificUserReview(listingID, reviewID);
        //uncover edit form
        let editForm = $(".edit-review");
        editForm.removeClass("hidden");
        $("html, body").animate(
            {
                scrollTop: editForm.offset().top,
            },
            800
        );
        //Match the review data with the form
        editForm.find("#review-title").val(thisReview.reviewTitle);
        editForm.find("#review-content").val(thisReview.reviewContent);
        editForm
            .find('input[name="rate"]')
            .filter('[value="' + thisReview.reviewScore.toString() + '"]')
            .prop("checked", true);
        //clear the image list
        editForm.find(".user-image-list").empty();
        thisReview.reviewIMG.forEach((img) => {
            // Create a new li element with the image
            let list = $("<li>").addClass("user-image").attr("href", img);
            let imgContent = $("<img>")
                .attr("src", img)
                .addClass("img-fluid-review")
                .attr("alt", "#");
            list.append(imgContent);

            // Append the li element to the image list
            editForm.find(".user-image-list").append(list);
            //Initialize user image
            initUserPopUp();
        });
        //add the reviewID and listingID on submit button
        editForm.find("#editReview").attr("data-review-id", reviewID);
        editForm.find("#editReview").attr("data-listing-id", listingID);
    });

    // User Review Edit Form
    $("#reviewImage").on("change", function () {
        let files = $(this)[0].files;
        let imageList = $(".user-image-list");
        let maxFiles = 5;
        let hasVideo = false;
        let maxImageSize = 2 * 1024 * 1024; // 5MB
        let maxVideoSize = 5 * 1024 * 1024; // 5MB

        //if current image list is not empty check if the new files exceed the max files
        if (imageList.children().length > 0) {
            if (files.length + imageList.children().length > maxFiles) {
                showPopup("Max 5 media allowed!");
                return;
            } else {
                imageList.children().each(function () {
                    if ($(this).data("type") === "video") hasVideo = true;
                });
            }
        }

        // Iterate over selected files
        for (let i = 0; i < files.length && i < maxFiles; i++) {
            let file = files[i];
            let fileSize = file.size;
            //Do some conditional pre-check

            //Check if the file is video and if there is already a video
            if (file.type.includes("video/") && hasVideo) {
                showPopup("Max 1 video allowed!");
                return;
            }
            //Then, check for file size
            if (fileSize > maxImageSize && !file.type.includes("video/")) {
                showPopup("Max 2MB per image!");
                return;
            }
            if (fileSize > maxVideoSize && file.type.includes("video/")) {
                showPopup("Max 5MB per video!");
                return;
            }

            filePicArray.push(file);
            let reader = new FileReader();

            // Read the file as a data URL
            reader.onload = function (e) {
                let imageUrl = e.target.result;

                // Create a new li element with the image
                let li = $("<li>")
                    .addClass("user-image")
                    .attr("href", imageUrl);
                let img = $("<img>")
                    .attr("src", imageUrl)
                    .addClass("img-fluid-review")
                    .attr("alt", "#");
                li.append(img);

                // Append the li element to the image list
                imageList.append(li);
                //Initialize user image
                initUserPopUp();
            };

            // Read the file
            reader.readAsDataURL(file);
        }
        $("#reviewImage").val("");
    });

    // Clear the image list
    $("#clearImages").on("click", function () {
        // Clear the file input and image list
        $("#reviewImage").val("");
        $(".user-image-list").empty();
        filePicArray = [];
    });

    //Submit
    $("#editReviewForm").on("submit", async function (e) {
        e.preventDefault();
        // Get listing and review id data directly from the form
        let reviewID = $("#editReview").data("review-id");
        let listingID = $("#editReview").data("listing-id");
        let reviewTitle = $("#review-title").val();
        let reviewContent = $("#review-content").val();
        let reviewScore = $('input[name="rate"]:checked').val();

        // Update the review
        let reviewToEdit = await getSpecificUserReview(listingID, reviewID);
        reviewToEdit.reviewTitle = reviewTitle;
        reviewToEdit.reviewContent = reviewContent;
        reviewToEdit.reviewScore = parseInt(reviewScore);
        reviewToEdit.wasEdited = true;
        let success = await editListingReview(
            reviewToEdit,
            filePicArray,
            clearedImages
        );

        if (!success) {
            await showPopup("Error editing review");
            return;
        }

        // Hide the edit form
        $("#editReview").addClass("hidden");

        // Reload the page
        showPopup("Review edited successfully!").then(function () {
            location.reload();
        });
    });

    //Delete Review
    $(".confirmModal").click(function (e) {
        e.preventDefault();
        $.confirmModal(
            "Delete this review?",
            {
                confirmButton: "Yes",
                cancelButton: "No",
                messageHeader: "Review Deletion",
                modalVerticalCenter: true,
                fadeAnimation: true,
            },
            async function (el) {
                let deleteBtn = $(el);
                let userReview = deleteBtn.closest(".mark-helpful");
                let reviewID = userReview.data("review-id");
                let listingID = userReview.data("listing-id");
                let success = await deleteListingReview(reviewID, listingID);
                if (!success) {
                    await showPopup("Error deleting review");
                    return;
                }
                await updateListingReviewScore(listingID);
                await showPopup("Review deleted successfully!");
                location.reload();
            },
            function () {
                // This function will be called when the user clicks the "No" button
                console.log("Cancel clicked");
            }
        );
    });

    /* ==============================================================
     HELPER FUNCTIONS FOLLOWING AND LIKING
     ============================================================== */

    //Like button
    async function handleLikeBtnClick() {
        if (!(await getCurrentUser())) {
            showPopup("Please login to like a review");
            return;
        }
        let $button = $(this);
        let $review = $button.closest(".mark-helpful");
        //get the parent of the button
        let $reviewContainer = $review.closest(".swiper-slide");
        let $likeCount = $review.find(".like-count");
        let reviewID = $reviewContainer.data("review-id");
        let listingID = $reviewContainer.data("listing-id");
        let userID = $reviewContainer.data("user-id");
        let currentCount = parseInt($likeCount.text(), 10);

        if ($button.hasClass("liked")) {
            // Decrement the like count if already liked
            $likeCount.text(currentCount - 1);
        } else {
            // Increment the like count if not liked
            $likeCount.text(currentCount + 1);
        }
        // Toggle the 'liked' class on button
        $button.toggleClass("liked");

        // Animate the button using GSAP
        if ($button.hasClass("liked")) {
            gsap.fromTo(
                $button[0],
                {
                    "--hand-rotate": 8,
                },
                {
                    ease: "none",
                    keyframes: [
                        {
                            "--hand-rotate": -45,
                            duration: 0.16,
                            ease: "none",
                        },
                        {
                            "--hand-rotate": 15,
                            duration: 0.12,
                            ease: "none",
                        },
                        {
                            "--hand-rotate": 0,
                            duration: 0.2,
                            ease: "none",
                            clearProps: true,
                        },
                    ],
                }
            );
        }

        await updateLikedReviews(userID, reviewID, listingID);

        // Disable the button
        $(this).prop("disabled", true);

        setTimeout(() => {
            // Enable the button after 5 seconds
            $(this).prop("disabled", false);
        }, 2500);
    }

    /* ==============================================================
     HELPER FUNCTIONS FOR VIEW COMMENT MODAL POPUP
     ============================================================== */
    async function populateReviewCommentForm() {
        let commentBtn = $(this);
        let reviewContainer = commentBtn.closest(".swiper-slide");
        let reviewID = reviewContainer.data("review-id");
        let listingID = reviewContainer.data("listing-id");
        let userID = reviewContainer.data("user-id");
        let review = findUserReview(reviewID, listingID);
        let listing = await getSpecificListing(listingID);
        let cRUReviewHistory = $("#cRUReviewHistory");
        let cRUCommentResponse = $("#cRUComment");
        let cRUCommentForm = $("#cRUCommentForm");
        let cRUCommentFormBtn = $("#commentFormSubmit");
        cRUReviewHistory.empty();
        cRUCommentResponse.empty();
        cRUCommentForm.empty();
        cRUReviewHistory.append(review.divcRU);
        cRUCommentResponse.append(review.divcRUResponse);

        let currentUser = await getCurrentUser();

        if (
            currentUser.username === listing.ownerID &&
            !(await checkIfCommented(reviewID, listingID, userID))
        ) {
            cRUCommentForm.removeClass("hidden");
            cRUCommentFormBtn.removeClass("hidden");
            cRUCommentResponse.addClass("hidden");
            cRUCommentForm.append(populateCommentForm(currentUser));
            cRUCommentForm.data("review-id", reviewID);
            cRUCommentForm.data("listing-id", listingID);
            cRUCommentForm.data("user-id", userID);
            cRUCommentForm.data("owner-id", currentUser.username);
        }
    }

    async function handleSubmitCommentForm(event) {
        event.preventDefault();
        let formSubmitBtn = $(this);
        let commentModal = formSubmitBtn.closest("#commentModal");
        let commentForm = commentModal.find("#cRUCommentForm");
        //Get the data
        let listingID = commentForm.data("listing-id");
        let reviewID = commentForm.data("review-id");
        let userID = commentForm.data("user-id");
        let owner = commentForm.data("owner-id");
        let commentContent = commentForm.find("#commentContent").val();
        let commentDate = new Date().toISOString();

        //Create the comment
        let newComment = {
            reviewID: reviewID,
            listingID: listingID,
            userID: userID,
            ownerID: owner,
            response: commentContent,
            commentDate: commentDate,
        };
        //Add the comment to the database
        await addNewOwnerResponse(newComment);

        $("#commentModal").modal("hide");
        showPopup("Comment added successfully!").then(function () {
            location.reload();
        });
    }

    function populateCommentForm(owner) {
        //create new comment form
        let commentFormDiv = $("<div></div>")
            .addClass("booking-checkbox_wrap")
            .addClass("mt-4");
        let innerDiv = `
      <div class="customer-review_wrap">
            <div class="customer-img">
              <img alt="#" class="img-fluid" src="${owner.profilePic}">
              <p>${owner.customName}</p>
              <p style="font-size: 13px; color: gray">@${owner.username}</p>
            </div>
            <div class="customer-content-wrap">
              <form id="commentForm">
                <div class="form-group green-border-focus" style="font-weight: bolder">
                  <label for="commentContent">Comment</label>
                  <textarea class="form-control rounded-0" id="commentContent" rows="10"
                            style="font-weight: 300; color: #0b0b0b"></textarea>
                </div>
              </form>
            </div>
       </div>
       <hr>
    `;
        commentFormDiv.html(innerDiv);
        return commentFormDiv;
    }

    function hideCommentForm() {
        let cRUCommentForm = $("#cRUCommentForm");
        let cRUCommentFormBtn = $("#commentFormSubmit");
        let cRUCommentResponse = $("#cRUComment");
        cRUCommentForm.addClass("hidden");
        cRUCommentFormBtn.addClass("hidden");
        cRUCommentResponse.removeClass("hidden");
    }

    async function handleFollowing(event) {
        event.preventDefault();
        let followBtn = $(this);
        let currentUser = await getCurrentUser();
        if (!currentUser) {
            await showPopup("Please login to follow a user");
            return;
        }
        let url = new URL(window.location.href);
        let profileID = url.searchParams.get("id");
        let followerCountText = $("#profileFollowerCount");
        let followerCount = parseInt(followerCountText.text(), 10);

        if (followBtn.hasClass("followed")) {
            //Remove class
            followBtn.removeClass("followed");
            followBtn.text("Follow");
            followerCountText.text(followerCount - 1);
            await followUser(profileID);
        } else {
            //Add class
            followBtn.addClass("followed");
            followBtn.text("Following");
            followerCountText.text(followerCount + 1);
            await followUser(profileID);
        }
        followBtn.toggleClass("flipped");

        // Disable the button
        $(this).prop("disabled", true);

        setTimeout(() => {
            // Enable the button after 5 seconds
            $(this).prop("disabled", false);
        }, 2500);
    }

    //Handles comment related events
    $(document).on("click", ".commentBtn", populateReviewCommentForm);
    $("#commentModal").on("hidden.bs.modal", hideCommentForm);
    $("#commentFormSubmit").on("click", handleSubmitCommentForm);
    $("#followBtn").on("click", handleFollowing);

    //Sort by List
    $("#sortReview").on("change", function () {
        let sortType = $(this).val();
        sortReviewHistory(sortType);
    });
    // Bind the like to the handler via proper event delegation.
    $(document).on("click", ".button", handleLikeBtnClick);
});
