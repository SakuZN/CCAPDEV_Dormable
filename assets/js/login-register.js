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

    if (response.status === 401) {
        // This is the status code Passport uses to indicate a login failure
        await showPopup("Incorrect email or password.");
        return;
    } else if (!response.ok) {
        // Handle any other error status codes as you see fit
        let message = await response.json();
        await showPopup(message.message);
        return;
    }

    //If response is ok, redirect to home page
    await showPopup("Login successful! Remember to check your profile!");
    window.location.href = "/index";
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
    let fetchResponse = await loadPopup(
        fetch("/api/loginForm/register", {
            method: "POST",
            body: userFormData,
        })
    );

    if (!fetchResponse.ok) {
        let message = await fetchResponse.json();
        await showPopup(message.message);
    } else {
        let message = await fetchResponse.json();
        await showPopup(message.message);
        window.location.href = "/login";
    }
}

async function logout() {
    let status = await logoutSession();
    if (!status) {
        await showPopup("Error logging out! Please try again later.");
    } else {
        await showPopup(status);
        window.location.href = "/index";
    }
}

async function updateMenu() {
    let menu = document.querySelector(".nav");
    let isLoggedIn = await getCurrentUser();
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
      <li><a href="/index" class="${
          currentPage.includes("index") ? "active" : ""
      }">Home</a></li>
      <li><a href="/profile?id=${userID.username}" class="${
            currentPage.includes("profile") ? "active" : ""
        }">My Profile</a></li>
      <li><a href="/explore-listing" class="${
          currentPage.includes("explore-listing") ? "active" : ""
      }">Explore Listings</a></li>
      <li><a href="/index" id="logoutBtn">Logout</a></li>
    `;
    } else {
        // Display menu for non-logged-in users
        menuHTML += `
      <li><a href="/index" class="${
          currentPage.includes("index") ? "active" : ""
      }">Home</a></li>
      <li><a href="/explore-listing" class="${
          currentPage.includes("explore-listing") ? "active" : ""
      }">Explore Listings</a></li>
      <li><a href="/login" class="${
          currentPage.includes("login") ? "active" : ""
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

(async () => {
    try {
        await updateMenu();
        // Continue with other code after updateMenu() has completed
    } catch (error) {
        console.error(error);
    }
})();

//Conditional statement to add event listeners to login and register forms in login.html
if (window.location.href.includes("login")) {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("signupForm");
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        await login();
    });

    registerForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        await register();
    });
}
