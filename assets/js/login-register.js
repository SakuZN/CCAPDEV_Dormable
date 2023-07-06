let monthNames = [
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

async function login() {
    let email = document.getElementById("loginEmail").value;
    let pass = document.getElementById("loginPswd").value;
    let rememberMe = document.getElementById("remember").checked;

    let userExists;
    let userType;
    switch (checkIfUserExists(email)) {
        case 1:
            userExists = checkUserInfo(email, pass);
            userType = "student";
            break;
        case 2:
            userExists = checkOwnerInfo(email, pass);
            userType = "owner";
            break;
        case 0:
            await showPopup("No such user exists");
            return;
        default:
            console.error("Invalid return value from checkIfUserExists()");
            break;
    }

    if (!userExists) {
        await showPopup("Invalid email or password!");
        return;
    }

    let userLogIn;
    if (userType === "student") {
        userLogIn = getUserInfo(email, pass);
    } else if (userType === "owner") {
        userLogIn = getOwnerInfo(email, pass);
    }

    setCurrentUser(userLogIn, true);

    await showPopup("Logged in successfully! Remember to check your profile!");
    window.location.href = "index.html";
}

async function register() {
    const user = document.getElementById("signupUsername").value;
    const custom = document.getElementById("signupCustomName").value;
    const email = document.getElementById("signupEmail").value;
    const pass = document.getElementById("signupPswd").value;
    const description = document.getElementById("signupDescription").value;
    const profilePic = document.getElementById("fileUpload").files[0];

    //Add current date as date of registration
    const registerDate = new Date().toISOString();

    const newUserData = {
        username: user,
        customName: custom,
        type: "student",
        description: description,
        profilePic: "/assets/images/test_image/blank_pp.jpg",
        joinDate: registerDate,
        noOfReviews: 0,
        followers: 0,
        college: "",
        course: "",
        liked: [],
        following: [],
    };
    const newUserDataInfo = {
        username: user,
        email: email,
        password: pass,
    };

    if (checkExistingUserEmail(email)) {
        await showPopup("Email already exists!");
        return;
    }
    if (checkExistingUsername(user)) {
        await showPopup("Username already exists!");
        return;
    }

    if (profilePic) {
        const reader = new FileReader();

        reader.onload = async function () {
            newUserData.profilePic = reader.result;
            //Register user
            addNewUser(newUserData, newUserDataInfo);

            await showPopup(
                "Registered successfully! Please login to continue."
            );
            window.location.href = "login.html";
        };
        reader.readAsDataURL(profilePic);
    } else {
        //Register user
        addNewUser(newUserData, newUserDataInfo);

        await showPopup("Registered successfully! Please login to continue.");
        window.location.href = "login.html";
    }
}

async function logout() {
    logoutSession();
    await showPopup("Logged out successfully!");
    window.location.href = "index.html";
}

function updateMenu() {
    let menu = document.querySelector(".nav");
    let isLoggedIn = getCurrentUser();
    let userID = "";
    if (isLoggedIn) {
        userID = getCurrentUser();
    }

    //get the current page
    let currentPage = window.location.href;

    // Build the menu HTML dynamically
    let menuHTML = "";

    if (isLoggedIn) {
        // Display menu for logged-in users
        menuHTML += `
      <li><a href="index.html" class="${
          currentPage.includes("index.html") ? "active" : ""
      }">Home</a></li>
      <li><a href="profile.html?id=${userID.username}" class="${
            currentPage.includes("profile.html") ? "active" : ""
        }">My Profile</a></li>
      <li><a href="explore-listing.html" class="${
          currentPage.includes("explore-listing.html") ? "active" : ""
      }">Explore Listings</a></li>
      <li><a href="index.html" id="logoutBtn">Logout</a></li>
    `;
    } else {
        // Display menu for non-logged-in users
        menuHTML += `
      <li><a href="index.html" class="${
          currentPage.includes("index.html") ? "active" : ""
      }">Home</a></li>
      <li><a href="explore-listing.html" class="${
          currentPage.includes("explore-listing.html") ? "active" : ""
      }">Explore Listings</a></li>
      <li><a href="login.html" class="${
          currentPage.includes("login.html") ? "active" : ""
      }">Log In | Sign Up</a></li>
    `;
    }

    // Set the updated menu HTML
    menu.innerHTML = menuHTML;
}

function showPopup(message) {
    return new Promise((resolve) => {
        let dialog = document.querySelector("#dialog");
        dialog.querySelector(".modal-body p").textContent = message;

        $("#dialog").on("hidden.bs.modal", function () {
            resolve();
        });
        $("#dialog").modal("show");
    });
}

updateMenu();

//Conditional statement to add event listeners to login and register forms in login.html
if (window.location.href.includes("login.html")) {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("signupForm");
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        login();
    });

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        register();
    });
}

// Conditional Statement to add logout event listener to logout button when user is logged in
if (getCurrentUser()) {
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        logout();
    });
}
