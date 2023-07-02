// For now, returns the local data of the listings
function fetchData() {
  return JSON.parse(localStorage.getItem('listingDatabase'));
}

function initOwlCarousel() {

  $('.owl-listing').owlCarousel({
    items: 1,
    loop: true,
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
  $('.owl-listing').owlCarousel('destroy');
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

// Auto generates the listing in the carousel HTML based on the data
function generateFeaturedListing(listings) {
  let featuredListing = document.getElementById('featured-listings');
  featuredListing.innerHTML = '';

  //set initial limit
  var listingLimit = 0;

  //Initialize divs
  let item;
  let row;
  let col;
  //Loop through the listings
  listings.forEach((listing) => {


    item = document.createElement('div');
    item.classList.add('item');

    row = document.createElement('div');
    row.classList.add('row');

    item.appendChild(row);
    featuredListing.appendChild(item);


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
               <ul class="rate">
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
    listingLimit++;
  });

  //Finally, initialize the owl carousel
  initOwlCarousel();
}

function reInitListings(listings) {
  destroyOwlCarousel();
  generateFeaturedListing(listings);
}

// Auto generates the listing based on the query
function generateQueryListing(listings) {
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

