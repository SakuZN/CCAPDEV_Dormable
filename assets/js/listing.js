let listing = [
  {
    id: '1-gt-manila',
    name: 'The Grand Towers Manila',
    description: 'The Grand Towers Manila is a 47-story twin skyscraper that is both a sustainable family home and a good investment. ' +
      'It rises high on one of Manila’s most strategic locations, ' +
      'along Pablo Ocampo Street corner Vito Cruz, just across Rizal Memorial Stadium',
    location: '790 Pablo Ocampo Sr. St. Corner Taft Avenue, Manila, 1004 Metro Manila',
    price: '₱6,000 - ₱13,000',
    reviewScore: 3.8,
    reviews: 80,
    img: ['../assets/images/listing_images/listing-GrandTowers.jpg'],
    owner: 'Moldex Realty Inc.'
  },
  {
    id: '2-torre-lorenzo',
    name: '2 Torre Lorenzo',
    description: ' located along Taft Avenue, right across De La Salle University and at the gateway to the rest of the metro. ' +
      'It offers the same convenience, accessibility and security that are trademarks of all Torre Lorenzo properties.',
    location: '2426-2444 Taft Ave. Brgy 727, Zone 079, Malate Manila',
    price: '₱18,000 - ₱25,000',
    reviewScore: 4.4,
    reviews: 13,
    img: ['../assets/images/listing_images/listing-TLorenzo.jpg'],
    owner: 'Torre Lorenzo Development Corporation'
  },
  {
    id: '3-r-square',
    name: 'R Square Residences',
    description: 'R Square Residences is a world-class high-rise condominium in Malate, Manila. ' +
      'It is developed by Toplite Development Corporation and is located along Vito Cruz in Malate, Manila',
    location: 'Vito Cruz, Malate, Manila',
    price: '₱5,000,000 - ₱15,000',
    reviewScore: 4.1,
    reviews: 104,
    img: ['../assets/images/listing_images/listing-RResidences.jpg'],
    owner: 'Toplite Development Corporation'
  },
  {
    id: '4-one-archers',
    name: 'ONE Archer\'s Place',
    description: 'One Archers Place is a 31-storey twin tower residential condominium located along Taft Avenue, Manila. ' +
      'It is designed for students and young professionals and offers studio and one-bedroom flats with lifestyle amenities',
    location: 'Taft Avenue, Malate, Manila',
    price: '₱5,000,000 - ₱30,000',
    reviewScore: 3.7,
    reviews: 25,
    img: ['../assets/images/listing_images/listing-ArcherPlace.jpg'],
    owner: 'Eton Properties Philippines'
  },
  {
    id: '5-green-residences',
    name: 'Green Residences',
    description: 'Green Residences is a 50-story mixed-use development located beside De La Salle University in Manila. ' +
      'It is designed to bring the vibe of the academe closer to home and offers a great place for college students ' +
      'to live out the best parts of college life',
    location: 'Taft Avenue, Malate, Manila',
    price: '₱5,100 - ₱5,700',
    reviewScore: 4.0,
    reviews: 213,
    img: ['../assets/images/listing_images/listing-GResidences.jpg'],
    owner: 'SMDC'
  },
  {
    id: '6-vito-cruz-towers',
    name: 'Vito Cruz Towers',
    description: 'Vito Cruz Towers is a condominium development by Cityland Development Corporation in Malate, Manila. ' +
      'It has two towers, each comprising studio to three-bedroom units for sale or rent. ' +
      'Apart from condominiums, this development also has podium parking and various amenities',
    location: '720 Pablo Ocampo Sr. Ave. Malate, Manila',
    price: '₱7,000,000 - ₱25,000',
    reviewScore: 4.2,
    reviews: 191,
    img: ['../assets/images/listing_images/listing-VCTowers.jpg'],
    owner: 'Cityland Development Corporation'
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
                ${star_rating(listing.reviewScore, listing.reviews)}
               </ul>
               <span class="price"><div class="icon"><img src="../assets/images/listing_icon/listing-icon-01.png" alt="">
               </div> ${listing.price}</span>
               <span class="details">Description: <br>
               <em>${listing.description}</em></span>

               <span class="details">Location: <br>
               <em>${listing.location}</em></span>

               <div class="main-white-button">
               <a href="contact.html"><i class="fa fa-eye"></i> Check Now</a>
         </div>
       </div>
      </div>
    `;
    /*
    <ul class="info">
                        <li><img src="../assets/images/listing_icon/listing-icon-02.png" alt=""> 5 Bedrooms</li>
                        <li><img src="../assets/images/listing_icon/listing-icon-03.png" alt=""> 3 Bathrooms</li>
               </ul>
    */

    row.appendChild(col);
    listingLimit++;
  });


}
