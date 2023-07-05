// THIS FILE CONTAINS THE DATABASE TO BE CONVERTED TO MONGODB

/*
Collection: listingDatabase

Schema:

{
  "_id" : ObjectId, // This field is auto-generated unless explicitly stated.
  "listingID" : String,
  "name" : String,
  "description" : String,
  "location" : String,
  "price" : String,
  "minPrice" : Number,
  "maxPrice" : Number,
  "reviewScore" : Number,
  "reviews" : Number,
  "img" : [String],
  "owner" : String,
  "ownerID" : String,
  "mapUrl" : String,
  "phone" : String,
  "website" : String,
  "ownerImg" : String
}
*/

/*
IF MONGOOSE

const listingSchema = new mongoose.Schema({
  listingID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  reviewScore: { type: Number, required: true },
  reviews: { type: Number, required: true },
  img: [{ type: String, required: true }], // array of images. String is mandatory for each image.
  owner: { type: String, required: true },
  ownerID: { type: String, required: true },
  mapUrl: { type: String, required: true },
  phone: { type: String, required: false },
  website: { type: String, required: false },
  ownerImg: { type: String, required: true },
});
*/

let listing = [
    {
        listingID: "1-gt-manila",
        name: "The Grand Towers Manila",
        description:
            "The Grand Towers Manila is a 47-story twin skyscraper that is both a sustainable family home and a good investment. " +
            "It rises high on one of Manila’s most strategic locations, " +
            "along Pablo Ocampo Street corner Vito Cruz, just across Rizal Memorial Stadium",
        location:
            "790 Pablo Ocampo Sr. St.<br>Corner Taft Avenue<br>Manila<br>1004 Metro Manila",
        price: "₱6,000 - ₱13,000",
        minPrice: 6000,
        maxPrice: 13000,
        reviewScore: 3.8,
        reviews: 80,
        img: [
            "../assets/images/listing_images/listing-GrandTowers.jpg",
            "../assets/images/listing_images/listing-GrandTowers2.jpg",
            "../assets/images/listing_images/listing-GrandTowers3.jpg",
        ],
        owner: "Moldex Realty Inc.",
        ownerID: "moldex_realty",
        mapUrl: "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJNbB053vJlzMRA8TZb_E3gvI&key=AIzaSyCXzNoDOd1Wmnopb8Kpi65iV3NDt3qNMwc",
        phone: "0917 717 8880",
        website: "https://www.moldexrealty.ph",
        ownerImg: "../assets/images/listing_images/owner-GrandTowers.jpg",
    },
    {
        listingID: "2-torre-lorenzo",
        name: "2 Torre Lorenzo",
        description:
            " located along Taft Avenue, right across De La Salle University and at the gateway to the rest of the metro. " +
            "It offers the same convenience, accessibility and security that are trademarks of all Torre Lorenzo properties.",
        location:
            "2426-2444 Taft Ave.<br>Brgy 727<br>Zone 079<br>Malate Manila",
        price: "₱18,000 - ₱25,000",
        minPrice: 18000,
        maxPrice: 25000,
        reviewScore: 4.4,
        reviews: 13,
        img: [
            "../assets/images/listing_images/listing-TLorenzo.jpg",
            "../assets/images/listing_images/listing-TLorenzo2.jpg",
            "../assets/images/listing_images/listing-TLorenzo3.jpg",
        ],
        owner: "Torre Lorenzo Development Corporation",
        ownerID: "torre_lorenzo",
        mapUrl: "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJzdSl2njJlzMRO1DkQJJEHcw&key=AIzaSyCXzNoDOd1Wmnopb8Kpi65iV3NDt3qNMwc",
        phone: "0916 684 7394",
        website:
            "https://www.torrelorenzo.com/residential-developments/2torre-lorenzo",
        ownerImg: "../assets/images/listing_images/owner-TLorenzo.jpg",
    },
    {
        listingID: "3-r-square",
        name: "R Square Residences",
        description:
            "R Square Residences is a world-class high-rise condominium in Malate, Manila. " +
            "It is developed by Toplite Development Corporation and is located along Vito Cruz in Malate, Manila",
        location: "Taft Ave<br>Malate<br>Manila<br>1004 Metro Manila",
        price: "₱5,000,000 - ₱15,000",
        minPrice: 5000,
        maxPrice: 15000,
        reviewScore: 4.1,
        reviews: 104,
        img: [
            "../assets/images/listing_images/listing-RResidences.jpg",
            "../assets/images/listing_images/listing-RResidences2.jpg",
            "../assets/images/listing_images/listing-RResidences3.jpg",
        ],
        owner: "Toplite Development Corporation",
        ownerID: "toplite_dc",
        mapUrl: "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJIYHPYnnJlzMRxLi2aLdgR20&key=AIzaSyCXzNoDOd1Wmnopb8Kpi65iV3NDt3qNMwc",
        phone: "0927 967 8558",
        website: "https://www.facebook.com/toplitedevelopmentcorporation/",
        ownerImg: "../assets/images/listing_images/owner-RResidences.jpg",
    },
    {
        listingID: "4-one-archers",
        name: "One Archer's Place",
        description:
            "One Archers Place is a 31-storey twin tower residential condominium located along Taft Avenue, Manila. " +
            "It is designed for students and young professionals and offers studio and one-bedroom flats with lifestyle amenities",
        location: "2311 Taft Ave<br>Malate<br>Manila<br>1004 Metro Manila",
        price: "₱5,000,000 - ₱30,000",
        minPrice: 5000,
        maxPrice: 30000,
        reviewScore: 3.7,
        reviews: 25,
        img: [
            "../assets/images/listing_images/listing-ArcherPlace.jpg",
            "../assets/images/listing_images/listing-ArcherPlace2.jpg",
            "../assets/images/listing_images/listing-ArcherPlace3.jpg",
        ],
        owner: "Eton Properties Philippines",
        ownerID: "eton_properties",
        mapUrl: "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJF_kMT3_JlzMRyvjrwnux7Gc&key=AIzaSyCXzNoDOd1Wmnopb8Kpi65iV3NDt3qNMwc",
        phone: "0917-886-1868",
        website: "http://www.onearchersplace.com/",
        ownerImg: "../assets/images/listing_images/owner-ArcherPlace.jpg",
    },
    {
        listingID: "5-green-residences",
        name: "Green Residences",
        description:
            "Green Residences is a 50-story mixed-use development located beside De La Salle University in Manila. " +
            "It is designed to bring the vibe of the academe closer to home and offers a great place for college students " +
            "to live out the best parts of college life",
        location:
            "2441<br>1004 Taft Ave<br>Malate<br>Manila<br>1004 Metro Manila",
        price: "₱5,100 - ₱5,700",
        minPrice: 5100,
        maxPrice: 5700,
        reviewScore: 4.0,
        reviews: 213,
        img: [
            "../assets/images/listing_images/listing-GResidences.jpg",
            "../assets/images/listing_images/listing-GResidences2.jpg",
            "../assets/images/listing_images/listing-GResidences3.jpg",
        ],
        owner: "SMDC",
        ownerID: "smdc",
        mapUrl: "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJkwdnk_LJlzMRFbimDJAIjk0&key=AIzaSyCXzNoDOd1Wmnopb8Kpi65iV3NDt3qNMwc",
        phone: "(02) 8252 4067",
        website: "https://smdc.com/properties/green-residences/",
        ownerImg: "../assets/images/listing_images/owner-GResidences.jpg",
    },
    {
        listingID: "6-vito-cruz-towers",
        name: "Vito Cruz Towers",
        description:
            "Vito Cruz Towers is a condominium development by Cityland Development Corporation in Malate, Manila. " +
            "It has two towers, each comprising studio to three-bedroom units for sale or rent. " +
            "Apart from condominiums, this development also has podium parking and various amenities",
        location: "720 Pablo Ocampo Sr. Ave.<br>Malate<br>Manila",
        price: "₱7,000,000 - ₱25,000",
        minPrice: 7000,
        maxPrice: 25000,
        reviewScore: 4.2,
        reviews: 191,
        img: [
            "../assets/images/listing_images/listing-VCTowers.jpg",
            "../assets/images/listing_images/listing-VCTowers2.jpg",
            "../assets/images/listing_images/listing-VCTowers3.jpg",
        ],
        owner: "Cityland Development Corporation",
        ownerID: "cityland_dc",
        mapUrl: "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJeWp_vXnJlzMRX0tGLW8q6N8&key=AIzaSyCXzNoDOd1Wmnopb8Kpi65iV3NDt3qNMwc",
        phone: "(02) 8245 1126",
        website: "https://www.ehomes.ph/vito-cruz-towers.html",
        ownerImg: "../assets/images/listing_images/owner-VCTowers.jpg",
    },
];

/*
Collection: userDatabase

Schema:

{
  "_id" : ObjectId, // This field is auto-generated unless explicitly stated.
  "username" : String,
  "customName" : String,
  "course" : String,
  "college" : String,
  "type" : String,
  "description" : String,
  "profilePic" : String,
  "joinDate" : Date,
  "noOfReviews" : Number,
  "followers" : Number,
  "liked" : [
      {
          "reviewID": Number,
          "listingID": String,
          "userID": String
      },
      // more records as per user
  ],
  "following" : [String],
}

IF MONGOOSE

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  customName: { type: String, required: true },
  course: { type: String, required: false },
  college: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: false },
  profilePic: { type: String, default: "../blank_profile.png" },
  joinDate: { type: Date, default: Date.now },
  noOfReviews: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  liked: [
    {
      reviewID: { type: Number, required: true },
      listingID: { type: Number, required: true },
      userID: { type: String, required: true },
    },
    // ... more liked reviews ...
  ],
  following: [String],
});
*/

let users = [
    {
        username: "Amanda_Garcia",
        customName: "Amanda Garcia",
        course: getRandomCourse(),
        college: "De La Salle University",
        type: "student",
        description: getRandomDescription(),
        profilePic: "../assets/images/test_image/customer-img1.jpg",
        joinDate: getRandomDate(2020, 2023),
        noOfReviews: 6,
        followers: getRandomNumber(0, 1000),
        liked: [{ reviewID: 2, listingID: 1, userID: "Miles_Morana" }],
        following: ["Miles_Morana"],
    },
    {
        username: "Miles_Morana",
        customName: "Miles Morana",
        course: getRandomCourse(),
        college: "De La Salle University",
        type: "student",
        description: getRandomDescription(),
        profilePic: "../assets/images/test_image/customer-img2.jpg",
        joinDate: getRandomDate(2020, 2023),
        noOfReviews: 6,
        followers: getRandomNumber(0, 1000),
        liked: [],
        following: [],
    },
    {
        username: "Katrina",
        customName: "Katrina",
        course: getRandomCourse(),
        college: "De La Salle University",
        type: "student",
        description: getRandomDescription(),
        profilePic: "../assets/images/test_image/customer-img3.jpg",
        joinDate: getRandomDate(2020, 2023),
        noOfReviews: 6,
        followers: getRandomNumber(0, 1000),
        liked: [],
        following: [],
    },
    {
        username: "John_Vick",
        customName: "John Vick",
        course: getRandomCourse(),
        college: "De La Salle University",
        type: "student",
        description: getRandomDescription(),
        profilePic: "../assets/images/test_image/customer-img4.jpg",
        joinDate: getRandomDate(2020, 2023),
        noOfReviews: 6,
        followers: getRandomNumber(0, 1000),
        liked: [],
        following: [],
    },
    {
        username: "Penguinz0",
        customName: "Moist Critikal",
        course: getRandomCourse(),
        college: "De La Salle University",
        type: "student",
        description: getRandomDescription(),
        profilePic: "../assets/images/test_image/customer-img5.jpg",
        joinDate: getRandomDate(2020, 2023),
        noOfReviews: 6,
        followers: getRandomNumber(0, 1000),
        liked: [],
        following: [],
    },
];

/*
Collection: userLoginInfo

Schema:

{
  "_id" : ObjectId, // This field is auto-generated unless explicitly stated.
  "username" : String,
  "email" : String,
  "password" : String
}

*/

//MONGOOSE SCHEMA
/*
const userLoginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Before saving the user info, ensure the password is hashed
userLoginSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
*/

let userInfo = [
    {
        username: "Amanda_Garcia",
        email: "amanda_garcia@gmail.com",
        password: "1234",
    },
    {
        username: "Miles_Morana",
        email: "miles_morana@gmail.com",
        password: "1234",
    },
    {
        username: "Katrina",
        email: "katrina@gmail.com",
        password: "1234",
    },
    {
        username: "John_Vick",
        email: "john_vick@gmail.com",
        password: "1234",
    },
    {
        username: "Penguinz0",
        email: "penguinz_0@gmail.com",
        password: "1234",
    },
];

/*
Collection: listingOwners

Schema:

{
  "_id" : ObjectId, // This field is auto-generated unless explicitly stated.
  "username" : String,
  "customName" : String,
  "type" : String,
  "profilePic" : String,
  "description": String,
  "joinDate": Date,
  "listings": [String],
  "noOfListings" : Number,
  "followers" : Number,
  "country" : String,
  "website": String
}
*/

//MONGOOSE SCHEMA
/*
const listingOwnerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  customName: { type: String, required: true },
  type: { type: String, required: true },
  profilePic: { type: String, default: "../assets/images/default_profile_pic.jpg" },
  description: { type: String, required: true },
  joinDate: { type: Date, default: Date.now },
  listings: { type: [String], required: true },
  noOfListings: { type: Number, required: true },
  followers: { type: Number, default: 0 },
  country: { type: String, required: true },
  website: { type: String, required: true },
});
*/

let listingOwners = [
    {
        username: "moldex_realty",
        customName: "Moldex Realty Inc.",
        type: "listingOwner",
        profilePic: "../assets/images/listing_images/owner-GrandTowers.jpg",
        description:
            "With over 30 years of real estate excellence, " +
            "Moldex Realty has been providing quality homes and communities that suit the growing needs of Filipino families. " +
            "From mastered-planned subdivisions that showcase the beauty of natural spaces, perfect for growing families, " +
            "to contemporary condominiums with complete amenities.",
        joinDate: getRandomDate(2020, 2023),
        listings: ["1-gt-manila"],
        noOfListings: 1,
        followers: getRandomNumber(0, 1000),
        country: "Philippines",
        website: "https://www.moldexrealty.ph",
    },
    {
        username: "torre_lorenzo",
        customName: "Torre Lorenzo<br>Development Corporation",
        type: "listingOwner",
        profilePic: "../assets/images/listing_images/owner-TLorenzo.jpg",
        description:
            "As the pioneer in premium university residences, Torre Lorenzo continues to build secure, accessible, and dynamic spaces that elevate living experiences.\n" +
            "\n" +
            "Each Torre Lorenzo property is distinctive for its innovation and uncompromising quality, and we continue to build and design for the future with this tradition of excellence.",
        joinDate: getRandomDate(2020, 2023),
        listings: ["2-torre-lorenzo"],
        noOfListings: 1,
        followers: getRandomNumber(0, 1000),
        country: "Philippines",
        website: "https://www.torrelorenzo.com/",
    },
    {
        username: "toplite_dc",
        customName: "Toplite Development Corporation",
        type: "listingOwner",
        profilePic: "../assets/images/listing_images/owner-RResidences.jpg",
        description:
            "Toplite Development Corporation is a young and fast-growing real estate development company directed by its CEO Mr. Johnny Chua\n" +
            "who founded Toplite Lumber Corporation, the group’s mother company.\n" +
            "Toplite Lumber Corporation started in October 1986 from a home grown family business of processing lumber from local sawmills.\n" +
            "Throughout the years, it has imported lumber from different countries and has done logging and saw-milling in the Philippines (1994)\n" +
            "and has done logging and saw milling local forestry in Aurora and Davao provinces (2002-2011).",
        joinDate: getRandomDate(2020, 2023),
        listings: ["3-r-square"],
        noOfListings: 1,
        followers: getRandomNumber(0, 1000),
        country: "Philippines",
        website: "https://www.facebook.com/toplitedevelopmentcorporation/",
    },
    {
        username: "eton_properties",
        customName: "Eton Properties<br>Philippines Inc.",
        type: "listingOwner",
        profilePic: "../assets/images/listing_images/owner-ArcherPlace.jpg",
        description:
            "We are Eton Properties, the real estate brand of the Lucio Tan Group, one of the biggest business conglomerates in the Philippines, with full-range projects of office, commercial, residential and hotel properties in key cities in Metro Manila, Laguna and Cebu. With an extensive land bank in strategic locations all over the country, we have diversified our business opportunities to include land lease.",
        joinDate: getRandomDate(2020, 2023),
        listings: ["4-archer-place"],
        noOfListings: 1,
        followers: getRandomNumber(0, 1000),
        country: "Philippines",
        website: "http://www.onearchersplace.com/",
    },
    {
        username: "smdc",
        customName: "SMDC",
        type: "listingOwner",
        profilePic: "../assets/images/listing_images/owner-GResidences.jpg",
        description:
            "SMDC is the largest and fastest-growing real estate developer in the Philippines. " +
            "Championing perfectly integrated commercial and residential environments, " +
            "SMDC provides every Filipino and its investors access to a sustainable and attainable cosmopolitan " +
            "lifestyle. Through masterfully planned and award-winning complete developments, " +
            "SMDC has been providing the dream homes of Filipinos in Metro Manila and other key cities in the Philippines.",
        joinDate: getRandomDate(2020, 2023),
        listings: ["5-green-residences"],
        noOfListings: 1,
        followers: getRandomNumber(0, 1000),
        country: "Philippines",
        website: "https://smdc.com/",
    },
    {
        username: "cityland_dc",
        customName: "Cityland Development Corporation",
        type: "listingOwner",
        profilePic: "../assets/images/listing_images/owner-VCTowers.jpg",
        description:
            "We continue to gain the respect and confidence of our investors for having a track record in the delivery of all projects thus, living up to our presidential award as the Leading Condominium Developer in the country. We shall continue to conceptualize and be a major contributor in the promotion of economic development and progress in creating a stable nation through equitable housing for the middle class... ",
        joinDate: getRandomDate(2020, 2023),
        listings: ["6-vito-cruz-towers"],
        noOfListings: 1,
        followers: getRandomNumber(0, 1000),
        country: "Philippines",
        website: "https://www.cityland.info/",
    },
];
/*
Collection: ownerAdminInfo

Schema:

{
  "_id" : ObjectId, // This field is auto-generated unless explicitly stated.
  "username" : String,
  "email" : String,
  "password" : String
}
*/

//MONGOOSE SCHEMA
/*
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const ownerAdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash the password before saving it
ownerAdminSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const OwnerAdminModel = mongoose.model('OwnerAdmin', ownerAdminSchema);
*/

let ownerAdminInfo = [
    {
        username: "moldex_realty",
        email: "listingadmin01@gmail.com",
        password: "1234",
    },
    {
        username: "torre_lorenzo",
        email: "listingadmin02@gmail.com",
        password: "1234",
    },
    {
        username: "toplite_dc",
        email: "listingadmin03@gmail.com",
        password: "1234",
    },
    {
        username: "eton_properties",
        email: "listingadmin04@gmail.com",
        password: "1234",
    },
    {
        username: "smdc",
        email: "listingadmin05@gmail.com",
        password: "1234",
    },
    {
        username: "cityland_dc",
        email: "listingadmin06@gmail.com",
        password: "1234",
    },
];

/*
Collection: ownerResponse

Schema:

{
  "_id" : ObjectId, // This field is auto-generated unless explicitly stated.
  "reviewID" : Number,
  "listingID" : String,
  "userID" : String,
  "ownerID" : String,
  "response" : String,
  "commentDate" : Date
}
*/

//MONGOOSE SCHEMA
/*
const ownerResponseSchema = new mongoose.Schema({
  reviewID: { type: Number, required: true },
  listingID: { type: String, required: true },
  userID: { type: String, required: true },
  ownerID: { type: String, required: true },
  response: { type: String, required: true },
  commentDate: { type: Date, required: true }
});

const OwnerResponse = mongoose.model('OwnerResponse', ownerResponseSchema);
*/
let ownerResponse = [
    {
        reviewID: 1,
        listingID: "2-torre-lorenzo",
        userID: "Amanda_Garcia",
        ownerID: "torre_lorenzo",
        response:
            "Thank you for your review. We will take note of your feedback and will try to improve our services.",
        commentDate: getRandomDate(2023, 2023),
    },
];

/* ==============================================================
   FUNCTIONS TO RANDOMLY GENERATE DATA
   ============================================================== */
function getRandomCourse() {
    const courses = [
        "BS Computer Science",
        "BS Information Technology",
        "BS Business Administration",
        "BS Biology",
        "BS Psychology",
    ];
    return courses[Math.floor(Math.random() * courses.length)];
}

function getRandomDescription() {
    const descriptions = [
        "I am a De La Salle University student. Animo La Salle!",
        "Proud to be a student at De La Salle University. Passionate about solving complex problems.",
        "Currently about to graduate! All hail to the green and white! Animo La Salle!",
        "Looking for a good place to stay near De La Salle University. Hopefully with roommates that are also students at DLSU.",
        "Wow! I can't believe I found this website. I'm looking for a place to stay near De La Salle University. Animo La Salle!",
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
    let month = getRandomNumber(0, 11); // JavaScript counts months from 0
    let day, hours, minutes, seconds, randomDate;

    // Adjust the year if it is the current year
    if (year === currentDate.getFullYear()) {
        month = Math.min(month, currentDate.getMonth());

        // Adjust the month if it is the current month
        if (month === currentDate.getMonth()) {
            day = getRandomNumber(1, currentDate.getDate());
        } else {
            day = getRandomNumber(1, new Date(year, month + 1, 0).getDate());
        }
    } else {
        day = getRandomNumber(1, new Date(year, month + 1, 0).getDate());
    }

    // Adjust the hours, minutes, and seconds if it is the current day
    if (
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth() &&
        day === currentDate.getDate()
    ) {
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

// Function to get random review
function getRandomReview(score) {
    let description;

    switch (score) {
        case 0:
        case 1:
            description =
                "This place near De La Salle University is extremely disappointing." +
                " I would not recommend this place to anyone." +
                " The place is dirty and the staff are rude.";
            break;
        case 2:
            description =
                "I had a negative experience at this place near De La Salle University." +
                " I tried to give this place a chance, but I was disappointed.";
            break;
        case 3:
            description =
                "This place near De La Salle University provided an average experience." +
                " The place was clean and the staff were friendly." +
                " However, I was not impressed by the facilities.";
            break;
        case 4:
            description =
                "I had a positive experience at this place near De La Salle University." +
                " The place was clean and the staff were friendly." +
                " I would recommend this place to others.";
            break;
        case 5:
            description =
                "This place near De La Salle University is outstanding! Highly recommended." +
                " The place was clean and the staff were friendly." +
                " I would definitely recommend this place to others.";
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
                listingID: listingPlace.listingID,
                reviewTitle: listingPlace.name + " Review",
                reviewContent: getRandomReview(randomScore),
                reviewIMG: [
                    "../assets/images/test_image/featured1.jpg",
                    "../assets/images/test_image/featured2.jpg",
                    "../assets/images/test_image/featured3.jpg",
                ],
                reviewScore: randomScore,
                reviewDate: getRandomDate(
                    2020,
                    new Date(user.joinDate).getFullYear()
                ),
                reviewMarkedHelpful: getRandomNumber(0, 150),
                wasEdited: false,
                isDeleted: false,
            });
            reviewID++;
        });
        reviewID = 1;
    });
    return reviews;
}

/* ==============================================================
   POPULATES LOCAL STORAGE WITH DEFAULT DATA
   ============================================================== */

if (
    localStorage.getItem("isLoggedIn") === null ||
    localStorage.getItem("isLoggedIn") === undefined
) {
    localStorage.setItem("isLoggedIn", "false");
}

if (
    localStorage.getItem("userDatabase") === null ||
    localStorage.getItem("userDatabase") === undefined ||
    localStorage.getItem("userDatabase") === "[]"
) {
    localStorage.setItem("userDatabase", JSON.stringify(users));
}

if (
    localStorage.getItem("listingDatabase") === null ||
    localStorage.getItem("listingDatabase") === undefined ||
    localStorage.getItem("listingDatabase") === "[]"
) {
    localStorage.setItem("listingDatabase", JSON.stringify(listing));
}

if (
    localStorage.getItem("reviewDatabase") === null ||
    localStorage.getItem("reviewDatabase") === undefined ||
    localStorage.getItem("reviewDatabase") === "[]"
) {
    localStorage.setItem(
        "reviewDatabase",
        JSON.stringify(generateUserReviews())
    );
}

if (
    localStorage.getItem("listingOwnerDatabase") === null ||
    localStorage.getItem("listingOwnerDatabase") === undefined ||
    localStorage.getItem("listingOwnerDatabase") === "[]"
) {
    localStorage.setItem("listingOwnerDatabase", JSON.stringify(listingOwners));
}

if (
    localStorage.getItem("listingAdminDatabase") === null ||
    localStorage.getItem("listingAdminDatabase") === undefined ||
    localStorage.getItem("listingAdminDatabase") === "[]"
) {
    localStorage.setItem(
        "listingAdminDatabase",
        JSON.stringify(ownerAdminInfo)
    );
}

if (
    localStorage.getItem("userLoginDatabase") === null ||
    localStorage.getItem("userLoginDatabase") === undefined ||
    localStorage.getItem("userLoginDatabase") === "[]"
) {
    localStorage.setItem("userLoginDatabase", JSON.stringify(userInfo));
}

if (
    localStorage.getItem("ownerResponseDatabase") === null ||
    localStorage.getItem("ownerResponseDatabase") === undefined ||
    localStorage.getItem("ownerResponseDatabase") === "[]"
) {
    localStorage.setItem(
        "ownerResponseDatabase",
        JSON.stringify(ownerResponse)
    );
}

function debugButton() {
    //CLEAR ALL DATABASES
    showPopup("Local and Session Storage Cleared!").then(() => {
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
    });
}
