/* ==============================================================
   GLOBAL VARIABLES
   ============================================================== */
//Variable for swiper
let mySwiper;
let imageSwiper;

//ArrayList of Users that reviewed
let reviewHistory = [];

//Review Limit Variable
let reviewLimit = 3;
/* ==============================================================
   OBJECT FUNCTIONS
   ============================================================== */

//Object function for review history
const reviewHistoryData = function (
    reviewHistory,
    divRH,
    divcRU,
    divcRUResponse,
    isCurrentUser
) {
    this.RHData = reviewHistory;
    this.divRH = divRH;
    this.divcRU = divcRU;
    this.divcRUResponse = divcRUResponse;
    this.isCurrentUser = isCurrentUser;

    this.modifyData = function (updateData) {
        Object.assign(this, updateData);
    };
};

/* ==============================================================
   SWIPER FUNCTIONS
   ============================================================== */
function initSwiper() {
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
        updateOnWindowResize: true,
    });
}

function initImageSwiper() {
    imageSwiper = new Swiper("#listing-image", {
        slidesPerView: 3,
        slidesPerGroup: 3,
        loop: false,
        loopFillGroupWithBlank: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

function destroySwiper() {
    mySwiper.destroy();
}

/* ==============================================================
   INITIALIZATION LOGIC EVENT LISTENERS AND FUNCTIONS
   ============================================================== */
// get the id from the url
let url = new URL(window.location.href);
let id = url.searchParams.get("id");
let checkValidId = checkIfValidListingID(id);
if (id === null || checkValidId === undefined) {
    window.location.href = "404.html";
}
const updateAndPopulate = async () => {
    return await updateListingReviewScore()
        .then(async () => {
            await populateListingPage(id);
        })
        .catch((err) => {
            console.log(err);
        });
};

async function populateListingPage(id_page) {
    //Get the listing data
    let listing = await getSpecificListing(id_page);
    let owner = getSpecificListingOwner(listing.ownerID);

    //Get the listing page elements to populate
    let listingName = document.getElementById("listing-name");
    let listingSwiper = document.getElementById("listing-swiper");
    let listingReviews = document.getElementById("review-swiper");
    let listingStars = document.getElementById("listing-stars");
    let listingPrice = document.getElementById("listing-price");
    let numScore = document.getElementById("numscore");
    let numScoreBg = document.querySelector(".reserve-rating");
    let numReviews = document.getElementById("numreview");
    let listingDescription = document.getElementById("listing-description");
    let numReviewBottom = document.getElementById("numreviewBottom");
    let listingMap = document.getElementById("listing-map");
    let listingAddress = document.getElementById("listing-address");
    let listingPhone = document.getElementById("listing-phone");
    let listingWebsite = document.getElementById("listing-website");
    let listingOwner = document.getElementById("listing-owner");
    let ownerCustomName = document.getElementById("owner-customName");
    let ownerUserName = document.getElementById("owner-userName");
    let ownerProfile = document.getElementById("owner-profile");
    let noReviews = document.createElement("div");
    let reviewPagination = document.getElementById("review-pagination");
    let writeReviewBtn = document.getElementById("reviewBtn");
    let commentForm = document.getElementById("cRUCommentForm");
    let commentFormSubmit = document.getElementById("commentFormSubmit");

    //Replace the content of the listing page elements
    listingName.innerHTML = listing.name;
    console.log(listing.img);
    populateListingImg(listing, listingSwiper);
    initImageSwiper();
    initListingPopUp();
    listingStars.innerHTML = star_rating(
        listing.reviewScore,
        listing.reviews,
        "listing-page"
    );
    listingPrice.innerHTML = listing.price;
    numScore.innerHTML = listing.reviewScore.toFixed(1);
    if (listing.reviewScore === 3) numScoreBg.classList.add("yellow");
    else if (listing.reviewScore < 3) numScoreBg.classList.add("red");
    numReviews.innerHTML = listing.reviews + " reviews";
    listingDescription.innerHTML = listing.description + "<hr>";
    numReviewBottom.innerHTML = listing.reviews + " reviews";

    //Try catch in case the listing has no reviews
    try {
        reviewHistory = await populateHistoryAsDiv(getListingReviews(id_page));
        populateListingReviews(reviewHistory);
    } catch (e) {
        console.log(e);
        noReviews.innerHTML = "<h4>No reviews yet</h4>";
        reviewPagination.style.display = "none";
        listingReviews.style.display = "flex";
        listingReviews.style.justifyContent = "center";
        listingReviews.append(noReviews);
    }

    document.getElementById("sortReview").selectedIndex = 0;

    if (userHasReviewed()) {
        writeReviewBtn.innerHTML = "Edit Review";
    }

    listingMap.src = listing.mapUrl;
    listingAddress.innerHTML = listing.location;
    listingPhone.innerHTML = listing.phone;
    listingWebsite.innerHTML = `<p>${listing.website}</p>`;
    listingWebsite.href = listing.website;
    ownerCustomName.innerHTML = owner.customName;
    ownerUserName.innerHTML = "@" + owner.username;
    listingOwner.src = listing.ownerImg;
    ownerProfile.href = `profile.html?id=${owner.username}`;
}

/* ==============================================================
   POPULATION FUNCTIONS
   ============================================================== */

//Turns review history into divs and returns an array of review history objects
async function populateHistoryAsDiv(reviewHistory) {
    let userReviewHistory = [];
    for (const review of reviewHistory) {
        let swiperDiv = document.createElement("div");
        swiperDiv.classList.add("swiper-slide", "loaded-element");
        swiperDiv.setAttribute("data-review-id", review.reviewID);
        swiperDiv.setAttribute("data-listing-id", review.listingID);
        swiperDiv.setAttribute("data-user-id", review.userID);

        let isCurrentUser = await checkIfSameUserID(review.userID);

        let reviewUser = await getSpecificUser(review.userID);
        let userCustomName = reviewUser.customName;
        let scoreClass = "";
        let checkEdit = "";

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
                '<button class="confirmModal btn btn-outline-danger btn-sm">Delete</button>';
        } else {
            buttonHTML = `<button class="button ${likedOrNot}">
                     <div class="hand">
                        <div class="thumb"></div>
                     </div>
                     <span>Like<span>d</span></span>
                  </button>`;
        }
        if (review.wasEdited) checkEdit = "(Review Edited)";
        if (review.reviewScore >= 4) scoreClass = "customer-rating";
        else if (review.reviewScore === 3)
            scoreClass = "customer-rating yellow";
        else scoreClass = "customer-rating red";

        swiperDiv.innerHTML = `
        <div class="customer-review_wrap">
            <div class="customer-img">
                <a href="profile.html?id=${
                    review.userID
                }" style="cursor: pointer">
                    <img src="${
                        reviewUser.profilePic
                    }" class="img-fluid" alt="#">
                    <p>${userCustomName}</p>
                    <p style="font-size: 13px; color: gray">@${
                        reviewUser.username
                    }</p>
                </a>
                <span style="display: flex; justify-content: center; margin-top: 5px">${
                    reviewUser.noOfReviews
                } reviews</span>
            </div>
            <div class="customer-content-wrap">
            <div class="customer-content">
                <div class="customer-review">
                <h6>${review.reviewTitle}</h6>
                <ul class="star-rating">
                    ${star_rating(review.reviewScore, 0, "listing")}
                </ul>
                <p class="customer-text" style="font-weight: bold">Reviewed ${reviewDate(
                    review.reviewDate
                )}<i style="font-style: italic"> ${checkEdit}</i></p>
                </div>
                <div class="${scoreClass}">${review.reviewScore}.0</div>
            </div>
            <p class="customer-text">${review.reviewContent}</p>
            <ul>
                ${populateReviewImg(review.reviewIMG)}
            </ul>
            <div class="mark-helpful">
                <span class="like-count">${
                    review.reviewMarkedHelpful
                }</span><span> people marked this review as helpful</span>
                ${buttonHTML}
                <button class="commentBtn btn btn-outline-info" data-target="#commentModal" data-toggle="modal" type="button">
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
                  <h6 id="cRUTitle">${review.reviewTitle}</h6>
                  <ul id="cRUStarRating" class="star-rating">
                    ${star_rating(review.reviewScore, 0, "listing")}
                  </ul>
                  <p id="cRUDate">Reviewed ${reviewDate(review.reviewDate)}</p>
                </div>
                <div class="${scoreClass}">${review.reviewScore}.0</div>
              </div>
              <p class="customer-text comment-border" id="cRUContent">${
                  review.reviewContent
              }</p>
              <ul id="cRUImages">
                ${populateReviewImg(review.reviewIMG)}
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
            checkIfCommented(review.reviewID, review.listingID, review.userID)
        ) {
            cRUReviewResponse.innerHTML = "";
            cRUReviewResponse.style.textAlign = "";
            let commentResponse = getReviewResponse(
                review.reviewID,
                review.listingID,
                review.userID
            );
            let owner = getSpecificListingOwner(commentResponse.ownerID);
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

function populateListingImg(listing, swiper) {
    swiper.innerHTML = "";

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
    let reviewImgs = "";
    images.forEach((img) => {
        reviewImgs += `<li href="${img}" class="review-image">
          <img src="${img}" class="img-fluid-review" alt="#">
        </li>`;
    });
    return reviewImgs;
}

function populateListingReviews(reviews) {
    let swiperContainer = document.getElementById("review-swiper");

    if (reviewLimit > reviews.length) reviewLimit = reviews.length;

    for (let i = swiperContainer.children.length; i < reviewLimit; i++) {
        swiperContainer.append(reviews[i].divRH);
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
    switch (sortType) {
        case "date-newest":
            reviewHistory.sort((a, b) => {
                return (
                    new Date(b.RHData.reviewDate) -
                    new Date(a.RHData.reviewDate)
                );
            });
            break;
        case "date-oldest":
            reviewHistory.sort((a, b) => {
                return (
                    new Date(a.RHData.reviewDate) -
                    new Date(b.RHData.reviewDate)
                );
            });
            break;
        case "rating-high":
            reviewHistory.sort((a, b) => {
                return b.RHData.reviewScore - a.RHData.reviewScore;
            });
            break;
        case "rating-low":
            reviewHistory.sort((a, b) => {
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

function searchReviewHistory(keyword) {
    reviewHistory.sort(function (a, b) {
        let aMatch = a.RHData.reviewContent
            .toLowerCase()
            .includes(keyword.toLowerCase());
        let bMatch = b.RHData.reviewContent
            .toLowerCase()
            .includes(keyword.toLowerCase());
        if (aMatch && !bMatch) {
            return -1;
        }
        if (!aMatch && bMatch) {
            return 1;
        }
        return 0;
    });
    destroySwiper();
    clearReviewHistory();
    populateListingReviews(reviewHistory);
}

function loadMoreReviews() {
    if (reviewLimit >= reviewHistory.length) {
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
    if (reviewLimit < reviewHistory.length) reviewLimit++;
    populateListingReviews(reviewHistory);
    // Set the active slide to the last appended element
    mySwiper.slideTo(swiperIndex);
    //Reset the sort dropdown if it is not on the default option
    document.getElementById("sortReview").selectedIndex = 0;
    initUserPopUp();
}

/* ==============================================================
   MISC FUNCTIONS
   ============================================================== */

function clearReviewHistory() {
    let reviewHistory = document.getElementById("review-swiper");
    reviewHistory.innerHTML = "";
}

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

function initListingPopUp() {
    if ($(".image-link").length) {
        $(".image-link").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
            },
        });
    }
    if ($(".image-link2").length) {
        $(".image-link2").magnificPopup({
            type: "image",
            gallery: {
                enabled: false,
            },
        });
    }
}

async function userHasReviewed() {
    let userReview = false;
    let currentUser = await getCurrentUser();
    if (!currentUser) return userReview;
    reviewHistory.forEach((rh) => {
        if (rh.RHData.userID === currentUser.username) userReview = true;
    });
    return userReview;
}

async function showUserReview() {
    let currentUserID = "";
    let currentUser = await getCurrentUser();
    if (currentUser) {
        currentUserID = currentUser.username;
    } else return;

    reviewHistory.sort((a, b) => {
        if (a.RHData.userID === currentUserID) return -1;
        else if (b.RHData.userID === currentUserID) return 1;
        else return 0;
    });

    destroySwiper();
    clearReviewHistory();
    populateListingReviews(reviewHistory);
    // Set the active slide to the last appended element
    document.getElementById("sortReview").selectedIndex = 0;
    initUserPopUp();
}

//Gets a specific review from the reviewHistory array
function findUserReview(reviewID) {
    let review = null;
    reviewHistory.forEach((rh) => {
        if (rh.RHData.reviewID === reviewID) review = rh;
    });
    return review;
}

/* ==============================================================
   DOM EVENT LISTENERS
   ============================================================== */

$(document).ready(function () {
    /* ==============================================================
     HELPER FUNCTIONS
     ============================================================== */
    async function handleReviewBtnClick() {
        let currentUser = await getCurrentUser();
        if (!currentUser) {
            await showPopup("Please login to leave a review");
        } else if (await userHasReviewed()) {
            $(".edit-review").removeClass("hidden");

            $("html, body").animate(
                {
                    scrollTop: $(".edit-review").offset().top,
                },
                1200
            );

            //Sorts the swiper to show the user's review first
            await showUserReview();
            // Gets the data from the reviewHistory array then populates the edit form
            populateEditReviewForm();
        } else {
            $(".reviewForm").removeClass("hidden");

            $("html, body").animate(
                {
                    scrollTop: $(".reviewForm").offset().top,
                },
                1200
            );

            if (currentUser.profilePic !== "")
                $("#profilePic").attr("src", currentUser.profilePic);

            $("#userName").text(currentUser.username);
            $("#userNumOfReview").text(currentUser.noOfReviews + " Reviews");
        }
    }

    function populateEditReviewForm() {
        let thisReview = reviewHistory[0].RHData;
        let editForm = $("#editReviewForm");
        editForm.find("#edit-title").val(thisReview.reviewTitle);
        editForm.find("#edit-content").val(thisReview.reviewContent);
        editForm
            .find('input[name="rateEdit"]')
            .filter('[value="' + thisReview.reviewScore.toString() + '"]')
            .prop("checked", true);

        editForm.find(".edit-image-list").empty();

        thisReview.reviewIMG.forEach((img) => {
            // Create a new li element with the image
            let list = $("<li>").addClass("user-image").attr("href", img);
            let imgContent = $("<img>")
                .attr("src", img)
                .addClass("img-fluid-review")
                .attr("alt", "#");
            list.append(imgContent);

            // Append the li element to the image list
            editForm.find(".edit-image-list").append(list);
            //Initialize user image
            initUserPopUp();
        });

        //add the reviewID and listingID on submit button
        editForm
            .find("#editReview")
            .attr("data-review-id", thisReview.reviewID);
        editForm
            .find("#editReview")
            .attr("data-listing-id", thisReview.listingID);
        editForm.find("#editReview").attr("data-user-id", thisReview.userID);
    }

    /* ==============================================================
     HELPER FUNCTIONS FOR REVIEW FORM
     ============================================================== */
    async function handleReviewFormSubmit(event) {
        let currentUser = await getCurrentUser();
        event.preventDefault();
        //Get the necessary data from the form
        let reviewTitle = $("#reviewTitle").val();
        let reviewContent = $("#reviewContent").val();
        let reviewImgs = $(".user-image-list li")
            .map(function () {
                return $(this).attr("href");
            })
            .get();
        let starRating = $("input[name='rate']:checked").val();
        starRating = parseInt(starRating);

        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
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
            isDeleted: false,
        };
        //add the review to the listing
        addListingReview(newReview);
        updateUserReviewCount(newReview.userID);
        // Hide the review form
        $("#userForm")[0].reset();
        $(".reviewForm").addClass("hidden");
        showPopup("Review Submitted!").then(function () {
            // Refresh the page
            location.reload();
        });
    }

    function handleReviewImageChange() {
        let files = $(this)[0].files;
        let imageList = $(".user-image-list");
        let maxFiles = 5;
        let hasVideo = false;
        let maxImageSize = 2 * 1024 * 1024; // 1MB
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
    }

    function handleReviewClearImagesClick() {
        // Clear the file input and image list
        $("#reviewImage").val("");
        $(".user-image-list").empty();
    }

    /* ==============================================================
     HELPER FUNCTIONS FOR EDIT REVIEW FORM
     ============================================================== */
    function submitEditReviewForm(event) {
        event.preventDefault();
        let editForm = $("#editReviewForm");
        let reviewID = editForm.find("#editReview").data("review-id");
        let listingID = editForm.find("#editReview").data("listing-id");
        let userID = editForm.find("#editReview").data("user-id");
        let reviewTitle = editForm.find("#edit-title").val();
        let reviewContent = editForm.find("#edit-content").val();
        let reviewImgs = editForm
            .find(".edit-image-list li")
            .map(function () {
                return $(this).attr("href");
            })
            .get();
        let starRating = $("input[name='rateEdit']:checked").val();

        //Update the review
        let reviewToEdit = getSpecificUserReview(listingID, reviewID);
        reviewToEdit.reviewTitle = reviewTitle;
        reviewToEdit.reviewContent = reviewContent;
        reviewToEdit.reviewScore = parseInt(starRating);
        reviewToEdit.reviewIMG = reviewImgs;
        reviewToEdit.wasEdited = true;
        editListingReview(reviewToEdit);

        // Hide the edit form
        $(".edit-review").addClass("hidden");

        // Reload the page
        showPopup("Review edited successfully!").then(function () {
            location.reload();
        });
    }

    function handleEditReviewImageChange() {
        let files = $(this)[0].files;
        let imageList = $(".edit-image-list");
        let maxFiles = 5;
        let hasVideo = false;
        let maxImageSize = 2 * 1024 * 1024; // 5MB
        let maxVideoSize = 5 * 1024 * 1024; // 5MB

        //if current image list is not empty check if the new files exceed the max files
        if (imageList.children().length >= 0) {
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
        $("#reviewEditImage").val("");
    }

    function handleEditClearImagesClick() {
        // Clear the file input and image list
        $("#editReviewImage").val("");
        $(".edit-image-list").empty();
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
        let review = findUserReview(reviewID);
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
            !checkIfCommented(reviewID, listingID, userID)
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

    function handleSubmitCommentForm(event) {
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
        addNewOwnerResponse(newComment);

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

    /* ==============================================================
    MISC HELPER FUNCTIONS
    ============================================================== */

    function handleDeleteReviewModal(e) {
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
            function (el) {
                let deleteBtn = $(el);
                let userReview = deleteBtn.closest(".mark-helpful");
                let reviewContainer = userReview.closest(".swiper-slide");
                let reviewID = reviewContainer.data("review-id");
                let listingID = reviewContainer.data("listing-id");
                deleteListingReview(reviewID, listingID);
                showPopup("Review deleted successfully!").then(function () {
                    location.reload();
                });
            },
            function () {
                // This function will be called when the user clicks the "No" button
                console.log("Cancel clicked");
            }
        );
    }

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
            reviewMarkedHelpful(reviewID, listingID, -1);
        } else {
            // Increment the like count if not liked
            $likeCount.text(currentCount + 1);
            reviewMarkedHelpful(reviewID, listingID, 1);
        }
        await updateLikedReviews(userID, reviewID, listingID);

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
        // Disable the button
        $(this).prop("disabled", true);

        setTimeout(() => {
            // Enable the button after 5 seconds
            $(this).prop("disabled", false);
        }, 2500);
    }

    function handleSortReviewChange() {
        let sortType = $(this).val();
        sortReviewHistory(sortType);
        initUserPopUp();
    }

    function handleSearchReviewChange() {
        let keyword = $("#searchInput").val();
        searchReviewHistory(keyword);
        initUserPopUp();
        $("#searchInput").val("");
    }

    /* ==============================================================
     EVENT HANDLERS
     ============================================================== */
    //Handles either review or edit form submission
    $("#reviewBtn").on("click", handleReviewBtnClick);

    //Handles Review related events
    $(".reviewForm").on("submit", handleReviewFormSubmit);
    $("#reviewImage").on("change", handleReviewImageChange);
    $("#clearImages").on("click", handleReviewClearImagesClick);

    //Handles Edit related events
    $("#editReviewForm").on("submit", submitEditReviewForm);
    $("#editReviewImage").on("change", handleEditReviewImageChange);
    $("#clearEditImages").on("click", handleEditClearImagesClick);

    //Handles comment related events
    $(document).on("click", ".commentBtn", populateReviewCommentForm);
    $("#commentModal").on("hidden.bs.modal", hideCommentForm);
    $("#commentFormSubmit").on("click", handleSubmitCommentForm);

    $(document).on("click", ".confirmModal", handleDeleteReviewModal);
    $(document).on("click", ".button", handleLikeBtnClick);

    $("#sortReview").on("change", handleSortReviewChange);
    $("#searchInputBtn").on("click", handleSearchReviewChange);

    //Loading page animation
    // start loading animation here
    $.when(updateAndPopulate()).done(function () {
        // when updateAndPopulate() is done, stop the animation
        initSwiper();
        initReviewPopUp();
        $("#js-preloader").addClass("loaded");
    });
});
