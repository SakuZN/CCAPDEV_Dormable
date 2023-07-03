/* ==============================================================
   GLOBAL VARIABLES AND OBJECT FUNCTIONS
   ============================================================== */

let listingList = [];

let listingLimit = 3;

let owlListing = $('.owl-listing');

const featuredListingObject = function (listing, carouselListing) {
  this.listing = listing;
  this.carouselListing = carouselListing;

  //Function to modify the listing
  this.modifyListing = function (updateListing) {
    Object.assign(this.listing, updateListing);
  }
}

const queryListingObject = function (listing, queryListing) {
  this.listing = listing;
  this.queryListing = queryListing;

  //Function to modify the listing
  this.modifyListing = function (updateListing) {
    Object.assign(this.listing, updateListing);
  }
}

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
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      },
      1600: {
        items: 1
      }
    }
  });
}

function destroyOwlCarousel() {
  owlListing.owlCarousel('destroy');
}

/* ==============================================================
   FEATURED LISTING INITIALIZATION FUNCTION
   ============================================================== */

function initFeaturedListing() {
  generateFeaturedListing();
  populateFeaturedListing();
  initOwlCarousel();
}

function initOwnerListing(ownerID) {
  generateListingOwnerListing(ownerID);
  populateFeaturedListing();
  initOwlCarousel();
}

/* ==============================================================
   LISTING GENERATION FUNCTION
   ============================================================== */

//Function to generate featured listings

function generateFeaturedListing() {
  //clear the listing list
  listingList = [];

  let featuredListing = getListingDatabase();

  //Sort Listing by review score and number of reviews
  featuredListing.sort((a, b) => b.reviewScore - a.reviewScore);

  //Turn listing into div elements
  //Initialize divs
  let item;
  let row;
  let col;
  //Loop through the listings
  featuredListing.forEach((listing) => {

    item = document.createElement('div');
    item.classList.add('item');

    row = document.createElement('div');
    row.classList.add('row');

    item.appendChild(row);

    col = document.createElement('div');
    col.classList.add('col-lg-12');

    // clear the content of the col first
    col.innerHTML = '';

    col.innerHTML = `
      <div class="listing-item">
       <div class="left-image">
        <a href="listing.html?id=${listing.id}"><img src="${listing.img[0]}" alt=""></a>
         </div>
            <div class="right-content align-self-center">
             <h4>${listing.name}</h4>
              <h6>by: <a href="profile.html?id=${listing.ownerID}">${listing.owner}</a></h6>
               <ul class="rate" style="margin-top: 0;">
                ${star_rating(listing.reviewScore, listing.reviews, 'featured-listings')}
               </ul>
               <span class="price"><div class="icon"><img src="../assets/images/listing_icon/listing-icon-01.png" alt="">
               </div> ${listing.price}</span>
               <span class="details">Description: <br><br>
               <em>${listing.description}</em></span>

               <span class="details">Location: <br><br>
               <em>${listing.location}</em></span>

               <div class="main-white-button">
               <a href="listing.html?id=${listing.id}"><i class="fa fa-eye"></i> Check Now</a>
         </div>
       </div>
      </div>
    `;
    row.appendChild(col);
    let newListingDiv = new featuredListingObject(listing, item);
    listingList.push(newListingDiv);
  });
}

function generateListingOwnerListing(ownerID) {
  listingList = [];

  let ownerListings = getOwnerSpecificListings(ownerID);

  //Turn listing into div elements
  //Initialize divs
  let item;
  let row;
  let col;
  //Loop through the listings
  ownerListings.forEach((listing) => {

    item = document.createElement('div');
    item.classList.add('item');

    row = document.createElement('div');
    row.classList.add('row');

    item.appendChild(row);

    col = document.createElement('div');
    col.classList.add('col-lg-12');

    // clear the content of the col first
    col.innerHTML = '';

    col.innerHTML = `
      <div class="listing-item">
       <div class="left-image">
        <a href="listing.html?id=${listing.id}"><img src="${listing.img[0]}" alt=""></a>
         </div>
            <div class="right-content align-self-center">
             <h4>${listing.name}</h4>
              <h6>by: ${listing.owner}</h6>
               <ul class="rate" style="margin-top: 0;">
                ${star_rating(listing.reviewScore, listing.reviews, 'featured-listings')}
               </ul>
               <span class="price"><div class="icon"><img src="../assets/images/listing_icon/listing-icon-01.png" alt="">
               </div> ${listing.price}</span>
               <span class="details">Description: <br><br>
               <em>${listing.description}</em></span>

               <span class="details">Location: <br><br>
               <em>${listing.location}</em></span>

               <div class="main-white-button">
               <a href="listing.html?id=${listing.id}"><i class="fa fa-eye"></i> Check Now</a>
         </div>
       </div>
      </div>
    `;
    row.appendChild(col);
    let newListingDiv = new featuredListingObject(listing, item);
    listingList.push(newListingDiv);
  });


}

function generateQueryListing() {
  listingList = [];

  let queryListing = getListingDatabase();
}


/* ==============================================================
   LISTING MISC FUNCTION
   ============================================================== */
function loadMoreFeaturedListing() {

  listingLimit++;
  if (listingLimit > listingList.length || listingLimit > 5) {
    showPopup('No more listings to show. Search for more in the search bar');
    listingLimit--;
    return;
  }

  //Get last active owl index
  let currentOwlIndex = owlListing.find('.active').index();
  //Reinitialize the owl carousel
  destroyOwlCarousel();
  populateFeaturedListing();
  initOwlCarousel();

  //Go to the last active owl index
  owlListing.trigger('to.owl.carousel', [currentOwlIndex, 250]);
}

function sortListing(listings, sortType) {
  switch (sortType) {
    case 'rating-low':
      console.log('rating-low');
      listings.sort((a, b) => a.reviewScore - b.reviewScore);
      break;
    case 'rating-high':
      listings.sort((a, b) => b.reviewScore - a.reviewScore);
      break;
  }
  console.log(listings);
  return listings;
}

function clearFeaturedListing() {
  let featuredListing = document.getElementById('featured-listings');
  featuredListing.innerHTML = '';
}

/* ==============================================================
   LISTING GENERATION FUNCTION
   ============================================================== */
function populateFeaturedListing() {
  let featuredListing = document.getElementById('featured-listings');

  //Loop through the listing list
  if (listingLimit > listingList.length) {
    listingLimit = listingList.length;
  }

  for (let i = featuredListing.children.length; i < listingLimit; i++) {
    featuredListing.appendChild(listingList[i].carouselListing);
  }
}

// Auto generates the listing based on the query
function populateQueryListing(listings) {
  let queryListing = document.getElementById('query-listings');
  let queryLoadMore = queryListing.lastElementChild;

  //sort by review score
  listings.sort((a, b) => b.reviewScore - a.reviewScore);

  //Initialize divs
  let indivListing;
  //Loop through the listings
  listings.forEach((listing) => {

    indivListing = document.createElement('div');
    indivListing.classList.add('col-lg-4', 'col-md-6', 'item');
    indivListing.innerHTML = `
      <div class="property-item">
                        <div class="pi-pic set-bg" data-setbg="${listing.img[0]}" style="background-image: url(${listing.img[0]}" >
                            <div class="label">${listing.reviewScore.toFixed(1)}</div>
                        </div>
                        <div class="pi-text">
                            <a href="#" class="heart-icon"><span class="icon-heart"></span></a>
                            <div class="pt-price">${listing.price}<span>/month</span></div>
                            <h5><a href="listing.html?id=${listing.id}">${listing.name}</a></h5>
                            <p><span class="icon-location-pin"></span> "${listing.location}"</p>
                            <ul>
                                <li><i class="icon-frame"></i> 2, 283</li>
                                <li><i class="fa fa-bath"></i> 03</li>
                                <li><i class="fa fa-bed"></i> 05</li>
                                <li><i class="fa fa-automobile"></i> 01</li>
                            </ul>
                            <div class="pi-agent">
                                <div class="pa-item">
                                    <div class="pa-info">
                                        <img src="${listing.ownerImg}" alt="">
                                        <h6>${listing.owner}</h6>
                                    </div>
                                    <div class="pa-text">
                                        ${listing.phone}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    `;
    queryListing.appendChild(indivListing);
  });
  queryListing.appendChild(queryLoadMore);
}

function initUserPopUp() {
  $('.user-image').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });
}

