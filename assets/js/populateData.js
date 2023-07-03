/*
PHASE 1 LOCAL DATA TEST
currentUser,
isLoggedIn,
reviewDatabase,
userDatabase
listingDatabase
*/

//Data for Listings
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
    ownerID: 'moldex_realty',
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
    ownerID: 'torre_lorenzo',
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
    ownerID: 'toplite_dc',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.642853255977!2d120.99534439999995!3d14.562404800000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c97962cf8121%3A0x6d4760b768b6b8c4!2sR%20Square%20Residences!5e0!3m2!1sen!2sph!4v1687593525832!5m2!1sen!2sph',
    phone: '0927 967 8558',
    website: 'https://www.facebook.com/toplitedevelopmentcorporation/',
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
    ownerID: 'eton_properties',
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
    ownerID: 'smdc',
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
    ownerID: 'cityland_dc',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.668355426953!2d120.99107991483979!3d14.5609481898278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c979bd7f6a79%3A0xdfe82a6f2d464b5f!2sCityland%20Vito%20Cruz%20Towers!5e0!3m2!1sen!2sph!4v1687593901510!5m2!1sen!2sph',
    phone: '(02) 8245 1126',
    website: 'https://www.ehomes.ph/vito-cruz-towers.html',
    ownerImg: '../assets/images/listing_images/owner-VCTowers.jpg'
  }
]

//Data for users
function getRandomCourse() {
  const courses = ['BS Computer Science', 'BS Information Technology', 'BS Business Administration', 'BS Biology', 'BS Psychology'];
  return courses[Math.floor(Math.random() * courses.length)];
}

function getRandomDescription() {
  const descriptions = [
    'I am a De La Salle University student. Animo La Salle!',
    'Proud to be a student at De La Salle University. Passionate about solving complex problems.',
    'Currently about to graduate! All hail to the green and white! Animo La Salle!',
    'Looking for a good place to stay near De La Salle University. Hopefully with roommates that are also students at DLSU.',
    'Wow! I can\'t believe I found this website. I\'m looking for a place to stay near De La Salle University. Animo La Salle!',
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(minYear, maxYear) {
  // Get current date
  let currentDate = new Date();

  // Ensure the max year is not in the future
  maxYear = Math.min(currentDate.getFullYear(), maxYear);

  let year = getRandomNumber(minYear, maxYear);
  let month = getRandomNumber(0, 11);  // JavaScript counts months from 0
  let day, hours, minutes, seconds, randomDate;

  // Adjust the year if it is the current year
  if (year === currentDate.getFullYear()) {
    month = Math.min(month, currentDate.getMonth());

    // Adjust the month if it is the current month
    if (month === currentDate.getMonth()) {
      day = getRandomNumber(1, currentDate.getDate());
    } else {
      day = getRandomNumber(1, (new Date(year, month + 1, 0)).getDate());
    }
  } else {
    day = getRandomNumber(1, (new Date(year, month + 1, 0)).getDate());
  }

  // Adjust the hours, minutes, and seconds if it is the current day
  if ((year === currentDate.getFullYear()) && (month === currentDate.getMonth()) && (day === currentDate.getDate())) {
    hours = getRandomNumber(0, currentDate.getHours());
    minutes = getRandomNumber(0, currentDate.getMinutes());
    seconds = getRandomNumber(0, currentDate.getSeconds());
  } else {
    hours = getRandomNumber(0, 23);
    minutes = getRandomNumber(0, 59);
    seconds = getRandomNumber(0, 59);
  }

  randomDate = new Date(year, month, day, hours, minutes, seconds);
  return randomDate.toISOString();
}


let users = [
  {
    username: 'Amanda_Garcia',
    customName: 'Amanda Garcia',
    course: getRandomCourse(),
    college: 'De La Salle University',
    type: 'student',
    description: getRandomDescription(),
    profilePic: '../assets/images/test_image/customer-img1.jpg',
    joinDate: getRandomDate(2020, 2023),
    noOfReviews: 6,
    followers: getRandomNumber(0, 1000)
  },
  {
    username: 'Miles_Morana',
    customName: 'Miles Morana',
    course: getRandomCourse(),
    college: 'De La Salle University',
    type: 'student',
    description: getRandomDescription(),
    profilePic: '../assets/images/test_image/customer-img2.jpg',
    joinDate: getRandomDate(2020, 2023),
    noOfReviews: 6,
    followers: getRandomNumber(0, 1000)
  },
  {
    username: 'Katrina',
    customName: 'Katrina',
    course: getRandomCourse(),
    college: 'De La Salle University',
    type: 'student',
    description: getRandomDescription(),
    profilePic: '../assets/images/test_image/customer-img3.jpg',
    joinDate: getRandomDate(2020, 2023),
    noOfReviews: 6,
    followers: getRandomNumber(0, 1000)
  },
  {
    username: 'John_Vick',
    customName: 'John Vick',
    course: getRandomCourse(),
    college: 'De La Salle University',
    type: 'student',
    description: getRandomDescription(),
    profilePic: '../assets/images/test_image/customer-img4.jpg',
    joinDate: getRandomDate(2020, 2023),
    noOfReviews: 6,
    followers: getRandomNumber(0, 1000)
  },
  {
    username: 'Penguinz0',
    customName: 'Moist Critikal',
    course: getRandomCourse(),
    college: 'De La Salle University',
    type: 'student',
    description: getRandomDescription(),
    profilePic: '../assets/images/test_image/customer-img5.jpg',
    joinDate: getRandomDate(2020, 2023),
    noOfReviews: 6,
    followers: getRandomNumber(0, 1000)
  }
]

let userInfo = [
  {
    username: 'Amanda_Garcia',
    email: 'amanda_garcia@gmail.com',
    password: '1234',
  },
  {
    username: 'Miles_Morana',
    email: 'miles_morana@gmail.com',
    password: '1234',
  },
  {
    username: 'Katrina',
    email: 'katrina@gmail.com',
    password: '1234',
  },
  {
    username: 'John_Vick',
    email: 'john_vick@gmail.com',
    password: '1234',
  },
  {
    username: 'Penguinz0',
    email: 'penguinz_0@gmail.com',
    password: '1234',
  }
]

let listingOwners = [
  {
    username: 'moldex_realty',
    customName: 'Moldex Realty Inc.',
    type: 'listingOwner',
    profilePic: '../assets/images/listing_images/owner-GrandTowers.jpg',
    description: 'With over 30 years of real estate excellence, ' +
      'Moldex Realty has been providing quality homes and communities that suit the growing needs of Filipino families. ' +
      'From mastered-planned subdivisions that showcase the beauty of natural spaces, perfect for growing families, ' +
      'to contemporary condominiums with complete amenities.',
    joinDate: getRandomDate(2020, 2023),
    listings: ['1-gt-manila'],
    noOfListings: 1,
    followers: getRandomNumber(0, 1000),
    country: 'Philippines',
    website: 'https://www.moldexrealty.ph'
  },
  {
    username: 'torre_lorenzo',
    customName: 'Torre Lorenzo<br>Development Corporation',
    type: 'listingOwner',
    profilePic: '../assets/images/listing_images/owner-TLorenzo.jpg',
    description: 'As the pioneer in premium university residences, Torre Lorenzo continues to build secure, accessible, and dynamic spaces that elevate living experiences.\n' +
      '\n' +
      'Each Torre Lorenzo property is distinctive for its innovation and uncompromising quality, and we continue to build and design for the future with this tradition of excellence.',
    joinDate: getRandomDate(2020, 2023),
    listings: ['2-torre-lorenzo'],
    noOfListings: 1,
    followers: getRandomNumber(0, 1000),
    country: 'Philippines',
    website: 'https://www.torrelorenzo.com/'
  },
  {
    username: 'toplite_dc',
    customName: 'Toplite Development Corporation',
    type: 'listingOwner',
    profilePic: '../assets/images/listing_images/owner-RResidences.jpg',
    description: 'Toplite Development Corporation is a young and fast-growing real estate development company directed by its CEO Mr. Johnny Chua\n' +
      'who founded Toplite Lumber Corporation, the group’s mother company.\n' +
      'Toplite Lumber Corporation started in October 1986 from a home grown family business of processing lumber from local sawmills.\n' +
      'Throughout the years, it has imported lumber from different countries and has done logging and saw-milling in the Philippines (1994)\n' +
      'and has done logging and saw milling local forestry in Aurora and Davao provinces (2002-2011).',
    joinDate: getRandomDate(2020, 2023),
    listings: ['3-r-square'],
    noOfListings: 1,
    followers: getRandomNumber(0, 1000),
    country: 'Philippines',
    website: 'https://www.facebook.com/toplitedevelopmentcorporation/'
  },
  {
    username: 'eton_properties',
    customName: 'Eton Properties<br>Philippines Inc.',
    type: 'listingOwner',
    profilePic: '../assets/images/listing_images/owner-ArcherPlace.jpg',
    description: 'We are Eton Properties, the real estate brand of the Lucio Tan Group, one of the biggest business conglomerates in the Philippines, with full-range projects of office, commercial, residential and hotel properties in key cities in Metro Manila, Laguna and Cebu. With an extensive land bank in strategic locations all over the country, we have diversified our business opportunities to include land lease.',
    joinDate: getRandomDate(2020, 2023),
    listings: ['4-archer-place'],
    noOfListings: 1,
    followers: getRandomNumber(0, 1000),
    country: 'Philippines',
    website: 'http://www.onearchersplace.com/'
  },
  {
    username: 'smdc',
    customName: 'SMDC',
    type: 'listingOwner',
    profilePic: '../assets/images/listing_images/owner-GResidences.jpg',
    description: 'SMDC is the largest and fastest-growing real estate developer in the Philippines. ' +
      'Championing perfectly integrated commercial and residential environments, ' +
      'SMDC provides every Filipino and its investors access to a sustainable and attainable cosmopolitan ' +
      'lifestyle. Through masterfully planned and award-winning complete developments, ' +
      'SMDC has been providing the dream homes of Filipinos in Metro Manila and other key cities in the Philippines.',
    joinDate: getRandomDate(2020, 2023),
    listings: ['5-green-residences'],
    noOfListings: 1,
    followers: getRandomNumber(0, 1000),
    country: 'Philippines',
    website: 'https://smdc.com/'
  },
  {
    username: 'cityland_dc',
    customName: 'Cityland Development Corporation',
    type: 'listingOwner',
    profilePic: '../assets/images/listing_images/owner-VCTowers.jpg',
    description: 'We continue to gain the respect and confidence of our investors for having a track record in the delivery of all projects thus, living up to our presidential award as the Leading Condominium Developer in the country. We shall continue to conceptualize and be a major contributor in the promotion of economic development and progress in creating a stable nation through equitable housing for the middle class... ',
    joinDate: getRandomDate(2020, 2023),
    listings: ['6-vito-cruz-towers'],
    noOfListings: 1,
    followers: getRandomNumber(0, 1000),
    country: 'Philippines',
    website: 'https://www.cityland.info/'
  }
];

let ownerAdminInfo = [
  {
    username: 'moldex_realty',
    email: 'listingadmin01@gmail.com',
    password: '1234',
  },
  {
    username: 'torre_lorenzo',
    email: 'listingadmin02@gmail.com',
    password: '1234',
  },
  {
    username: 'toplite_dc',
    email: 'listingadmin03@gmail.com',
    password: '1234',
  },
  {
    username: 'eton_properties',
    email: 'listingadmin04@gmail.com',
    password: '1234',
  },
  {
    username: 'smdc',
    email: 'listingadmin05@gmail.com',
    password: '1234',
  },
  {
    username: 'cityland_dc',
    email: 'listingadmin06@gmail.com',
    password: '1234',
  }
]


// Function to get random review
function getRandomReview(score) {
  let description;

  switch (score) {
    case 0:
    case 1:
      description = "This place near De La Salle University is extremely disappointing." +
        " I would not recommend this place to anyone." + " The place is dirty and the staff are rude.";
      break;
    case 2:
      description = "I had a negative experience at this place near De La Salle University."
        + " I tried to give this place a chance, but I was disappointed.";
      break;
    case 3:
      description = "This place near De La Salle University provided an average experience."
        + " The place was clean and the staff were friendly." + " However, I was not impressed by the facilities.";
      break;
    case 4:
      description = "I had a positive experience at this place near De La Salle University."
        + " The place was clean and the staff were friendly." + " I would recommend this place to others.";
      break;
    case 5:
      description = "This place near De La Salle University is outstanding! Highly recommended."
        + " The place was clean and the staff were friendly." + " I would definitely recommend this place to others.";
      break;
    default:
      description = "No description available.";
      break;
  }

  return description;
}

//Populate reviews by using a function to auto generate reviews
function generateUserReviews() {
  let reviews = [];
  let reviewID = 1;
  listing.forEach((listingPlace) => {
    users.forEach((user) => {
      let randomScore = getRandomNumber(0, 5);
      reviews.push({
        reviewID: reviewID,
        userID: user.username,
        listingID: listingPlace.id,
        reviewTitle: listingPlace.name + ' Review',
        reviewContent: getRandomReview(randomScore),
        reviewIMG: ["../assets/images/test_image/featured1.jpg",
          "../assets/images/test_image/featured2.jpg",
          "../assets/images/test_image/featured3.jpg"],
        reviewScore: randomScore,
        reviewDate: getRandomDate(2020, new Date(user.joinDate).getFullYear()),
        reviewMarkedHelpful: getRandomNumber(0, 150),
        wasEdited: false,
        isDeleted: false
      });
      reviewID++;
    });
    reviewID = 1;
  });
  return reviews;
}

//Finally, populate the database with the data above if the database is empty

if (localStorage.getItem('isLoggedIn') === null || localStorage.getItem('isLoggedIn') === undefined) {
  localStorage.setItem('isLoggedIn', 'false');
}

if (localStorage.getItem('userDatabase') === null || localStorage.getItem('userDatabase') === undefined ||
  localStorage.getItem('userDatabase') === '[]') {
  localStorage.setItem('userDatabase', JSON.stringify(users));
}

if (localStorage.getItem('listingDatabase') === null || localStorage.getItem('listingDatabase') === undefined ||
  localStorage.getItem('listingDatabase') === '[]') {
  localStorage.setItem('listingDatabase', JSON.stringify(listing));
}

if (localStorage.getItem('reviewDatabase') === null || localStorage.getItem('reviewDatabase') === undefined ||
  localStorage.getItem('reviewDatabase') === '[]') {
  localStorage.setItem('reviewDatabase', JSON.stringify(generateUserReviews()));
}

if (localStorage.getItem('listingOwnerDatabase') === null || localStorage.getItem('listingOwnerDatabase') === undefined ||
  localStorage.getItem('listingOwnerDatabase') === '[]') {
  localStorage.setItem('listingOwnerDatabase', JSON.stringify(listingOwners));
}

if (localStorage.getItem('listingAdminDatabase') === null || localStorage.getItem('listingAdminDatabase') === undefined ||
  localStorage.getItem('listingAdminDatabase') === '[]') {
  localStorage.setItem('listingAdminDatabase', JSON.stringify(ownerAdminInfo));
}

if (localStorage.getItem('userLoginDatabase') === null || localStorage.getItem('userLoginDatabase') === undefined ||
  localStorage.getItem('userLoginDatabase') === '[]') {
  localStorage.setItem('userLoginDatabase', JSON.stringify(userInfo));
}

