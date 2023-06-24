let listing = [
  {
    id: '1-gt-manila',
    name: 'The Grand Towers Manila',
    description: 'The Grand Towers Manila is a 47-story twin skyscraper that is both a sustainable family home and a good investment. ' +
      'It rises high on one of Manila’s most strategic locations, ' +
      'along Pablo Ocampo Street corner Vito Cruz, just across Rizal Memorial Stadium',
    location: "790 Pablo Ocampo Sr. St.<br>Corner Taft Avenue<br>Manila<br>1004 Metro Manila",
    price: '₱6,000 - ₱13,000',
    reviewScore: 3.8,
    reviews: 80,
    img: ['../assets/images/listing_images/listing-GrandTowers.jpg',
      '../assets/images/listing_images/listing-GrandTowers2.jpg',
      '../assets/images/listing_images/listing-GrandTowers3.jpg'],
    owner: 'Moldex Realty Inc.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6880.748230183621!2d120.99269744210767!3d14.55977174205414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c97be774b035%3A0xf28237f16fd9c403!2sThe%20Grand%20Towers%20Manila!5e0!3m2!1sen!2sph!4v1687579119148!5m2!1sen!2sph',
    phone: '0917 717 8880',
    website: 'https://www.moldexrealty.ph',
    ownerImg: '../assets/images/listing_images/owner-GrandTowers.jpg'
  },
  {
    id: '2-torre-lorenzo',
    name: '2 Torre Lorenzo',
    description: ' located along Taft Avenue, right across De La Salle University and at the gateway to the rest of the metro. ' +
      'It offers the same convenience, accessibility and security that are trademarks of all Torre Lorenzo properties.',
    location: '2426-2444 Taft Ave.<br>Brgy 727<br>Zone 079<br>Malate Manila',
    price: '₱18,000 - ₱25,000',
    reviewScore: 4.4,
    reviews: 13,
    img: ['../assets/images/listing_images/listing-TLorenzo.jpg',
      '../assets/images/listing_images/listing-TLorenzo2.jpg',
      '../assets/images/listing_images/listing-TLorenzo3.jpg'],
    owner: 'Torre Lorenzo Development Corporation',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.5848562613396!2d120.99177521483973!3d14.565716889824715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c978cf151c8d%3A0x8bfc15f5a457f675!2s2-Torre%20Lorenzo%2C%20Taft%20Ave%2C%20Malate%2C%20Manila%2C%201004%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1687593470423!5m2!1sen!2sph',
    phone: '0916 684 7394',
    website: 'https://www.torrelorenzo.com/residential-developments/2torre-lorenzo',
    ownerImg: '../assets/images/listing_images/owner-TLorenzo.jpg'
  },
  {
    id: '3-r-square',
    name: 'R Square Residences',
    description: 'R Square Residences is a world-class high-rise condominium in Malate, Manila. ' +
      'It is developed by Toplite Development Corporation and is located along Vito Cruz in Malate, Manila',
    location: 'Taft Ave<br>Malate<br>Manila<br>1004 Metro Manila',
    price: '₱5,000,000 - ₱15,000',
    reviewScore: 4.1,
    reviews: 104,
    img: ['../assets/images/listing_images/listing-RResidences.jpg',
      '../assets/images/listing_images/listing-RResidences2.jpg',
      '../assets/images/listing_images/listing-RResidences3.jpg'],
    owner: 'Toplite Development Corporation',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.642853255977!2d120.99534439999995!3d14.562404800000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c97962cf8121%3A0x6d4760b768b6b8c4!2sR%20Square%20Residences!5e0!3m2!1sen!2sph!4v1687593525832!5m2!1sen!2sph',
    phone: '0927 967 8558',
    website: 'https://www.facebook.com/RSquareResidencesCondoMall/',
    ownerImg: '../assets/images/listing_images/owner-RResidences.jpg'
  },
  {
    id: '4-one-archers',
    name: 'One Archer\'s Place',
    description: 'One Archers Place is a 31-storey twin tower residential condominium located along Taft Avenue, Manila. ' +
      'It is designed for students and young professionals and offers studio and one-bedroom flats with lifestyle amenities',
    location: '2311 Taft Ave<br>Malate<br>Manila<br>1004 Metro Manila',
    price: '₱5,000,000 - ₱30,000',
    reviewScore: 3.7,
    reviews: 25,
    img: ['../assets/images/listing_images/listing-ArcherPlace.jpg',
      '../assets/images/listing_images/listing-ArcherPlace2.jpg',
      '../assets/images/listing_images/listing-ArcherPlace3.jpg'],
    owner: 'Eton Properties Philippines',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.5681766866683!2d120.99052341483981!3d14.566669289824095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c97f4f0cf917%3A0x67ecb17bc2ebf8ca!2sOne%20Archers&#39;%20Place!5e0!3m2!1sen!2sph!4v1687593707917!5m2!1sen!2sph',
    phone: '0917-886-1868',
    website: 'http://www.onearchersplace.com/',
    ownerImg: '../assets/images/listing_images/owner-ArcherPlace.jpg'
  },
  {
    id: '5-green-residences',
    name: 'Green Residences',
    description: 'Green Residences is a 50-story mixed-use development located beside De La Salle University in Manila. ' +
      'It is designed to bring the vibe of the academe closer to home and offers a great place for college students ' +
      'to live out the best parts of college life',
    location: '2441<br>1004 Taft Ave<br>Malate<br>Manila<br>1004 Metro Manila',
    price: '₱5,100 - ₱5,700',
    reviewScore: 4.0,
    reviews: 213,
    img: ['../assets/images/listing_images/listing-GResidences.jpg',
      '../assets/images/listing_images/listing-GResidences2.jpg',
      '../assets/images/listing_images/listing-GResidences3.jpg'],
    owner: 'SMDC',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.552105384012!2d120.99271330000002!3d14.567586899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9f293670793%3A0x4d8e08900ca6b815!2sGreen%20Residences!5e0!3m2!1sen!2sph!4v1687593765911!5m2!1sen!2sph',
    phone: '(02) 8252 4067',
    website: 'https://smdc.com/properties/green-residences/',
    ownerImg: '../assets/images/listing_images/owner-GResidences.jpg'
  },
  {
    id: '6-vito-cruz-towers',
    name: 'Vito Cruz Towers',
    description: 'Vito Cruz Towers is a condominium development by Cityland Development Corporation in Malate, Manila. ' +
      'It has two towers, each comprising studio to three-bedroom units for sale or rent. ' +
      'Apart from condominiums, this development also has podium parking and various amenities',
    location: '720 Pablo Ocampo Sr. Ave.<br>Malate<br>Manila',
    price: '₱7,000,000 - ₱25,000',
    reviewScore: 4.2,
    reviews: 191,
    img: ['../assets/images/listing_images/listing-VCTowers.jpg',
      '../assets/images/listing_images/listing-VCTowers2.jpg',
      '../assets/images/listing_images/listing-VCTowers3.jpg'],
    owner: 'Cityland Development Corporation',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.668355426953!2d120.99107991483979!3d14.5609481898278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c979bd7f6a79%3A0xdfe82a6f2d464b5f!2sCityland%20Vito%20Cruz%20Towers!5e0!3m2!1sen!2sph!4v1687593901510!5m2!1sen!2sph',
    phone: '(02) 8245 1126',
    website: 'https://www.ehomes.ph/vito-cruz-towers.html',
    ownerImg: '../assets/images/listing_images/owner-VCTowers.jpg'
  }
]

// For now, returns the local data of the listings
function fetchData() {
  return listing;
}

// Auto generates the listing in the carousel HTML based on the data
function generateFeaturedListing(listings) {
  let featuredListing = document.getElementById('featured-listings');

  //sort by review score
  listings.sort((a, b) => b.reviewScore - a.reviewScore);
  //set initial limit
  var listingLimit = 0;

  //Initialize divs
  let item;
  let row;
  let col;
  //Loop through the listings
  listings.forEach((listing) => {

    if (listingLimit % 2 === 0) {
      item = document.createElement('div');
      item.classList.add('item');

      row = document.createElement('div');
      row.classList.add('row');

      item.appendChild(row);
      featuredListing.appendChild(item);
    }


    col = document.createElement('div');
    col.classList.add('col-lg-12');

    // clear the content of the col first
    col.innerHTML = '';

    col.innerHTML = `
      <div class="listing-item">
       <div class="left-image">
        <a href="#"><img src="${listing.img[0]}" alt=""></a>
         </div>
            <div class="right-content align-self-center">
             <a href="#"><h4>${listing.name}</h4></a>
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
}

function populateSwiper(listing, swiper) {
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

function populateListingPage(id_page) {
  //Get the listing data
  let listing = fetchData().find((listing) => listing.id === id_page);
  //Get the listing page elements to populate
  let listingName = document.getElementById('listing-name');
  let listingSwiper = document.getElementById('listing-swiper');
  let listingStars = document.getElementById('listing-stars');
  let listingPrice = document.getElementById('listing-price');
  let numScore = document.getElementById('numscore');
  let numReviews = document.getElementById('numreview');
  let listingDescription = document.getElementById('listing-description');
  let numReviewBottom = document.getElementById('numreviewBottom');
  let listingMap = document.getElementById('listing-map');
  let listingAddress = document.getElementById('listing-address');
  let listingPhone = document.getElementById('listing-phone');
  let listingWebsite = document.getElementById('listing-website');
  let listingOwner = document.getElementById('listing-owner');
  let ownerName = document.getElementById('owner-name');

  //Replace the content of the listing page elements
  listingName.innerHTML = listing.name;
  populateSwiper(listing, listingSwiper);
  listingStars.innerHTML = star_rating(listing.reviewScore, listing.reviews, 'listing-page');
  listingPrice.innerHTML = listing.price;
  numScore.innerHTML = listing.reviewScore;
  numReviews.innerHTML = listing.reviews + ' reviews';
  listingDescription.innerHTML = listing.description + '<hr>';
  numReviewBottom.innerHTML = listing.reviews + ' reviews';
  listingMap.src = listing.mapUrl;
  listingAddress.innerHTML = listing.location;
  listingPhone.innerHTML = listing.phone;
  listingWebsite.innerHTML = `<p>${listing.website}</p>`;
  listingWebsite.href = listing.website;
  ownerName.innerHTML = listing.owner;
  listingOwner.src = listing.ownerImg;

}

if (window.location.href.includes('listing.html')) {
  // get the id from the url
  let url = new URL(window.location.href);
  let id = url.searchParams.get('id');
  let checkValidId = fetchData().find((listing) => listing.id === id);
  if (id === null || checkValidId === undefined) {
    window.location.href = '404.html';
  }
  else {
    populateListingPage(id);
  }
  document.querySelector('.reviewForm').addClass('hidden');
}

