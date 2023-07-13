/* ==============================================================
   GLOBAL VARIABLES AND OBJECT FUNCTIONS
   ============================================================== */

let listingList = [];

let listingLimit = 3;

let owlListing = $(".owl-listing");

//Used to store the listing object, also used by specific listing page
const featuredListingObject = function (listing, carouselListing) {
    this.listing = listing;
    this.carouselListing = carouselListing;

    //Function to modify the listing
    this.modifyListing = function (updateListing) {
        Object.assign(this.listing, updateListing);
    };
};

//Used to store queried listing object, also used by exploring all listings page
const queryListingObject = function (listing, queryListing) {
    this.listing = listing;
    this.queryListing = queryListing;

    //Function to modify the listing
    this.modifyListing = function (updateListing) {
        Object.assign(this.listing, updateListing);
    };
};

const searchFilterObject = function (searchQuery) {
    this.location = searchQuery.location;
    this.searchType = searchQuery.searchType;
    this.rating = searchQuery.rating;
    this.minPrice = searchQuery.minPrice;
    this.maxPrice = searchQuery.maxPrice;
};

/* ==============================================================
   OWL CAROUSEL FUNCTIONS
   ============================================================== */

function initOwlCarousel() {
    owlListing.owlCarousel({
        items: 1,
        loop: false,
        dots: true,
        nav: false,
        autoplay: false,
        margin: 30,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
            1600: {
                items: 1,
            },
        },
    });
}

function destroyOwlCarousel() {
    owlListing.owlCarousel("destroy");
}

/* ==============================================================
   LISTING INITIALIZATION FUNCTION
   ============================================================== */

async function initFeaturedListing() {
    try {
        $("#js-preloader").removeClass("loaded"); // start loading animation here if needed
        await generateFeaturedListing();
        populateFeaturedListing();
        initOwlCarousel();
        $("#js-preloader").addClass("loaded"); // stop loading animation
    } catch (error) {
        console.log(error);
        // handle error appropriately, alert user, revert UI changes, etc.
    }
}

async function initOwnerListing(ownerID) {
    try {
        $("#js-preloader").removeClass("loaded"); // start loading animation here if needed
        await generateListingOwnerListing(ownerID);
        populateFeaturedListing();
        initOwlCarousel();
        $("#js-preloader").addClass("loaded"); // stop loading animation
    } catch (error) {
        console.log(error);
        // handle error appropriately, alert user, revert UI changes, etc.
    }
}

async function initQueryListing() {
    try {
        $("#js-preloader").removeClass("loaded"); // start loading animation here if needed
        await generateQueryListing();
        populateQueryListing();
        $("#js-preloader").addClass("loaded"); // stop loading animation
    } catch (error) {
        console.log(error);
        // handle error appropriately, alert user, revert UI changes, etc.
    }
}

async function initAllListing() {
    try {
        $("#js-preloader").removeClass("loaded"); // start loading animation here if needed
        await generateExploreListing();
        populateQueryListing();

        $("#js-preloader").addClass("loaded"); // stop loading animation
    } catch (error) {
        console.log(error);
        // handle error appropriately, alert user, revert UI changes, etc.
    }
}

/* ==============================================================
   LISTING GENERATION FUNCTION
   ============================================================== */

//Function to generate featured listings
async function generateFeaturedListing() {
    //clear the listing list
    listingList = [];

    let featuredListing = [];
    try {
        featuredListing = await getListingDatabase();
    } catch (err) {
        console.log(err);
    }

    //Sort Listing by review score and number of reviews
    featuredListing.sort((a, b) => b.reviewScore - a.reviewScore);

    //Turn listing into div elements
    //Initialize divs
    let item;
    let row;
    let col;
    //Loop through the listings
    featuredListing.forEach((listing) => {
        item = document.createElement("div");
        item.classList.add("item", "loaded-element");

        row = document.createElement("div");
        row.classList.add("row");

        item.appendChild(row);

        col = document.createElement("div");
        col.classList.add("col-lg-12");

        // clear the content of the col first
        col.innerHTML = "";

        col.innerHTML = `
      <div class="listing-item">
       <div class="left-image">
        <a href="/listing?id=${listing.listingID}"><img src="${
            listing.img[0]
        }" alt=""></a>
         </div>
            <div class="right-content align-self-center">
             <h4>${listing.name}</h4>
              <h6>by: <a href="/profile?id=${listing.ownerID}">${
            listing.owner
        }</a></h6>
               <ul class="rate" style="margin-top: 0;">
                ${star_rating(
                    listing.reviewScore,
                    listing.reviews,
                    "featured-listings"
                )}
               </ul>
               <span class="price"><div class="icon"><img src="/assets/images/listing_icon/listing-icon-01.png" alt="">
               </div> ${listing.price}</span>
               <span class="details">Description: <br><br>
               <em>${listing.description}</em></span>

               <span class="details">Location: <br><br>
               <em>${listing.location}</em></span>

               <div class="main-white-button">
               <a href="/listing?id=${
                   listing.listingID
               }"><i class="fa fa-eye"></i> Check Now</a>
         </div>
       </div>
      </div>
    `;
        row.appendChild(col);
        let newListingDiv = new featuredListingObject(listing, item);
        listingList.push(newListingDiv);
    });
}

//Used to show listing on an owner's profile page
async function generateListingOwnerListing(ownerID) {
    listingList = [];

    let ownerListings = await getOwnerSpecificListings(ownerID);

    //Turn listing into div elements
    //Initialize divs
    let item;
    let row;
    let col;
    //Loop through the listings
    ownerListings.forEach((listing) => {
        item = document.createElement("div");
        item.classList.add("item", "loaded-element");

        row = document.createElement("div");
        row.classList.add("row");

        item.appendChild(row);

        col = document.createElement("div");
        col.classList.add("col-lg-12");

        // clear the content of the col first
        col.innerHTML = "";

        col.innerHTML = `
      <div class="listing-item">
       <div class="left-image">
        <a href="/listing?id=${listing.listingID}"><img src="${
            listing.img[0]
        }" alt=""></a>
         </div>
            <div class="right-content align-self-center">
             <h4>${listing.name}</h4>
              <h6>by: ${listing.owner}</h6>
               <ul class="rate" style="margin-top: 0;">
                ${star_rating(
                    listing.reviewScore,
                    listing.reviews,
                    "featured-listings"
                )}
               </ul>
               <span class="price"><div class="icon"><img src="/assets/images/listing_icon/listing-icon-01.png" alt="">
               </div> ${listing.price}</span>
               <span class="details">Description: <br><br>
               <em>${listing.description}</em></span>

               <span class="details">Location: <br><br>
               <em>${listing.location}</em></span>

               <div class="main-white-button">
               <a href="/listing?id=${
                   listing.listingID
               }"><i class="fa fa-eye"></i> Check Now</a>
         </div>
       </div>
      </div>
    `;
        row.appendChild(col);
        let newListingDiv = new featuredListingObject(listing, item);
        listingList.push(newListingDiv);
    });
}

async function generateQueryListing() {
    listingList = [];

    let queryListing = await filterListings();

    queryListing.forEach((listing) => {
        let indivListing = document.createElement("div");
        indivListing.classList.add(
            "col-lg-4",
            "col-md-6",
            "item",
            "loaded-element"
        );
        indivListing.innerHTML = `
      <div class="property-item">
        <div class="pi-pic set-bg" data-setbg="${
            listing.img[0]
        }" style="background-image: url(${listing.img[0]})">
    <a href="/listing?id=${
        listing.listingID
    }"><div class="label">${listing.reviewScore.toFixed(1)}</div></a>
</div>
<div class="pi-text">
    <a href="#" class="heart-icon"><span class="icon-heart"></span></a>
    <div class="pt-price">${listing.price}<span>/month</span></div>
    <h5>${listing.name}</h5>
          <p><span class="icon-location-pin"></span> "${listing.location}"</p>
          <p><span class="icon-phone"></span>"${listing.phone}"</p>
          <hr>
          <!--
          <ul>
            <li><i class="icon-frame"></i> 2, 283</li>
            <li><i class="fa fa-bath"></i> 03</li>
            <li><i class="fa fa-bed"></i> 05</li>
            <li><i class="fa fa-automobile"></i> 01</li>
          </ul>
          -->
          <div class="pi-agent">
            <div class="pa-item">
              <div class="pa-info">
                <img src="${listing.ownerImg}" alt="">
                <h6><a href="/profile?id=${listing.ownerID}">${
            listing.owner
        }</a></h6>
              </div>
            </div>
          </div>
        </div>
      </div>`;

        let queryDiv = new queryListingObject(listing, indivListing);
        listingList.push(queryDiv);
    });
}

async function generateExploreListing() {
    listingList = [];

    let allListings = await getListingDatabase();

    allListings.forEach((listing) => {
        let indivListing = document.createElement("div");
        indivListing.classList.add(
            "col-lg-4",
            "col-md-6",
            "item",
            "loaded-element"
        );
        indivListing.innerHTML = `
      <div class="property-item">
        <a href="/listing?id=${listing.listingID}">
        <div class="pi-pic set-bg" data-setbg="${
            listing.img[0]
        }" style="background-image: url(${listing.img[0]})" >
          <div class="label">${listing.reviewScore.toFixed(1)}</div>
        </div>
        </a>
        <div class="pi-text">
          <a href="#" class="heart-icon"><span class="icon-heart"></span></a>
          <div class="pt-price">${listing.price}<span>/month</span></div>
          <h3>${listing.name}</h3>
          <p><span class="icon-location-pin"></span> "${listing.location}"</p>
          <p><span class="icon-phone"></span>"${listing.phone}"</p>
          <hr>
          <!--
          <ul>
            <li><i class="icon-frame"></i> 2, 283</li>
            <li><i class="fa fa-bath"></i> 03</li>
            <li><i class="fa fa-bed"></i> 05</li>
            <li><i class="fa fa-automobile"></i> 01</li>
          </ul>
          -->
          <div class="pi-agent">
            <div class="pa-item">
              <div class="pa-info">
                <img src="${listing.ownerImg}" alt="">
                <h6><a href="/profile?id=${listing.ownerID}">${
            listing.owner
        }</a></h6>
              </div>
            </div>
          </div>
        </div>
      </div>`;

        let allDiv = new queryListingObject(listing, indivListing);
        listingList.push(allDiv);
    });
}

/* ==============================================================
   LISTING MISC FUNCTION
   ============================================================== */
function loadMoreFeaturedListing() {
    listingLimit++;
    if (listingLimit > listingList.length || listingLimit > 5) {
        showPopup(
            "No more listings to show. Search for more in the search bar"
        );
        listingLimit--;
        return;
    }

    //Get last active owl index
    let currentOwlIndex = owlListing.find(".active").index();
    //Reinitialize the owl carousel
    destroyOwlCarousel();
    populateFeaturedListing();
    initOwlCarousel();

    //Go to the last active owl index
    owlListing.trigger("to.owl.carousel", [currentOwlIndex, 250]);
}

function loadMoreQueryListings() {
    listingLimit++;
    if (listingLimit > listingList.length || listingLimit > 5) {
        showPopup("No more listings to show.");
        listingLimit--;
        return;
    }
    populateQueryListing();
}

function loadMoreListings() {
    listingLimit++;
    if (listingLimit > listingList.length || listingLimit > 5) {
        showPopup("No more listings to show.");
        listingLimit--;
        return;
    }
    populateQueryListing();
    document.getElementById("sortListings").selectedIndex = 0;
}

async function filterListings() {
    let listings = await getListingDatabase();
    let filters = new searchFilterObject(
        JSON.parse(sessionStorage.getItem("searchFilter"))
    );
    console.log(sessionStorage.getItem("searchFilter"));
    //Filter the listing based on the filters
    let filteredListings = listings.filter(
        (listing) =>
            (filters.location
                ? listing.location
                      .toLowerCase()
                      .includes(filters.location.toLowerCase())
                : true) &&
            (filters.searchType
                ? listing.name
                      .toLowerCase()
                      .includes(filters.searchType.toLowerCase())
                : true) &&
            (filters.rating ? listing.reviewScore >= filters.rating : true) &&
            (filters.minPrice ? listing.minPrice >= filters.minPrice : true) &&
            (filters.maxPrice ? listing.maxPrice <= filters.maxPrice : true)
    );
    console.log(filteredListings);
    return filteredListings;
}

function sortListing(sortType) {
    console.log(listingList);
    switch (sortType) {
        case "rating-low":
            listingList.sort(
                (a, b) => a.listing.reviewScore - b.listing.reviewScore
            );
            break;
        case "rating-high":
            listingList.sort(
                (a, b) => b.listing.reviewScore - a.listing.reviewScore
            );
            break;
        case "price-low":
            listingList.sort((a, b) => a.listing.minPrice - b.listing.minPrice);
            break;
        case "price-high":
            listingList.sort((a, b) => b.listing.minPrice - a.listing.minPrice);
            break;
        default:
            break;
    }
    console.log(listingList);

    clearQueryListing();
    populateQueryListing();
}

function clearFeaturedListing() {
    let featuredListing = document.getElementById("featured-listings");
    featuredListing.innerHTML = "";
}

function clearQueryListing() {
    let queryListing = document.getElementById("query-listings");
    queryListing.innerHTML = "";
}

/* ==============================================================
   LISTING GENERATION FUNCTION
   ============================================================== */
function populateFeaturedListing() {
    let featuredListing = document.getElementById("featured-listings");

    //Loop through the listing list
    if (listingLimit > listingList.length) {
        listingLimit = listingList.length;
    }

    for (let i = featuredListing.children.length; i < listingLimit; i++) {
        if (i >= listingList.length) {
            break;
        }
        featuredListing.appendChild(listingList[i].carouselListing);
    }
}

// Auto generates the listing based on the query
function populateQueryListing() {
    let queryListing = document.getElementById("query-listings");

    for (let i = queryListing.children.length; i < listingLimit; i++) {
        if (i >= listingList.length) {
            break;
        }
        queryListing.appendChild(listingList[i].queryListing);
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
