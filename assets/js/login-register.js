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

    let response = await fetch("/api/loginForm/login", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: pass,
            rememberMe: rememberMe,
        }),
        headers: { "Content-Type": "application/json" },
    });

    //If response is not ok, show error message from response
    if (!response.ok) {
        let message = await response.json();
        await showPopup(message.message);
        return;
    }

    //If response is ok, redirect to home page
    await showPopup("Login successful! Remember to check your profile!");
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

    let userFormData = new FormData();
    userFormData.append("profilePic", profilePic);
    userFormData.append("userData", JSON.stringify(newUserData));
    userFormData.append("userInfo", JSON.stringify(newUserDataInfo));

    //POST request
    let fetchResponse = await fetch("/api/loginForm/register", {
        method: "POST",
        body: userFormData,
    });

    if (!fetchResponse.ok) {
        let message = await fetchResponse.json();
        await showPopup(message.message);
    } else {
        let message = await fetchResponse.json();
        await showPopup(message.message);
        window.location.href = "login.html";
    }
}

async function logout() {
    let status = await logoutSession();
    if (!status) {
        await showPopup("Error logging out! Please try again later.");
    } else {
        await showPopup(status);
        window.location.href = "index.html";
    }
}

async function updateMenu() {
    let menu = document.querySelector(".nav");
    let isLoggedIn = await getCurrentUser();
    console.log(isLoggedIn);
    let userID = "";
    if (isLoggedIn) {
        userID = isLoggedIn;
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

    // Add event listener to logout button
    if (isLoggedIn) {
        // Conditional Statement to add logout event listener to logout button when user is logged in
        const logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            logout();
        });
    }
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
