let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'];

async function login() {
  let email = document.getElementById('loginEmail').value;
  let pass = document.getElementById('loginPswd').value;

  let isInStorage = false;

  let userDatabase = localStorage.getItem('userDatabase');
  try {
    userDatabase = JSON.parse(userDatabase);
    isInStorage = userDatabase.some((data) => {
      if (data.email === email && data.password === pass) {
        localStorage.setItem('currentUser', JSON.stringify(data));
        return true;
      }
    });
  } catch (e) {
    await showPopup('No such user exists');
    return;
  }

  if (isInStorage) {
    localStorage.setItem('isLoggedIn', 'true');
    await showPopup('Logged in successfully! Remember to check your profile!');
    window.location.href = 'index.html';
  } else {
    await showPopup('Invalid email or password!');
  }
}

async function register() {
  const user = document.getElementById('signupUsername').value;
  const custom = document.getElementById('signupCustomName').value;
  const email = document.getElementById('signupEmail').value;
  const pass = document.getElementById('signupPswd').value;
  const userType = document.querySelector('input[name="userType"]:checked').value;
  const profilePic = document.getElementById('fileUpload').files[0];

  //Add current date as date of registration
  const registerDate = new Date().toISOString();

  const newUserData = {
    username: user,
    customName: custom,
    email: email,
    password: pass,
    type: userType,
    description: '',
    profilePic: '../assets/images/test_image/blank_pp.jpg',
    joinDate: registerDate,
    noOfReviews: 0,
    followers: 0,
    college: '',
    course: ''
  };

  let currentData = localStorage.getItem('userDatabase')

  if (currentData !== null) {
    currentData = JSON.parse(currentData);

    //Check if username or email already exists
    let isExisting = false;

    for (const data of currentData) {
      if (data.username === user) {
        await showPopup('Username already exists!');
        isExisting = true;
        break;
      } else if (data.email === email) {
        await showPopup('Email already exists!');
        isExisting = true;
        break;
      }
    }
    // If username or email already exists, do not add to database
    if (isExisting) {
      return;
    }

    currentData.push(newUserData);
  } else {
    currentData = [newUserData];
  }

  // Handle file upload
  if (profilePic) {
    const reader = new FileReader();

    reader.onload = async function () {
      newUserData.profilePic = reader.result;
      localStorage.setItem('userDatabase', JSON.stringify(currentData)); // Update local storage with newUserData

      await showPopup('Registered successfully! Please login to continue.');

      window.location.href = 'login.html';
    };

    reader.readAsDataURL(profilePic);
  } else {
    localStorage.setItem('userDatabase', JSON.stringify(currentData)); // Update local storage without profilePic

    await showPopup('Registered successfully! Please login to continue.');

    window.location.href = 'login.html';
  }
}

async function logout() {
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.removeItem('currentUser');
  await showPopup('Logged out successfully!');
  window.location.href = 'index.html';
}

function updateMenu() {
  let menu = document.querySelector('.nav')
  let isLoggedIn = localStorage.getItem('isLoggedIn');
  let userID = '';
  if (localStorage.getItem('isLoggedIn') !== 'false') {
    userID = JSON.parse(localStorage.getItem('currentUser'));
  }

  //get the current page
  let currentPage = window.location.href;

  // Build the menu HTML dynamically
  let menuHTML = '';

  if (isLoggedIn === 'true') {
    // Display menu for logged-in users
    menuHTML += `
      <li><a href="index.html" class="${currentPage.includes('index.html') ? 'active' : ''}">Home</a></li>
      <li><a href="profile.html?id=${userID.username}" class="${currentPage.includes('profile.html') ? 'active' : ''}">My Profile</a></li>
      <li><a href="search-result.html" class="${currentPage.includes('search-result.html') ? 'active' : ''}">Explore Listings</a></li>
      <li><a href="index.html" id="logoutBtn">Logout</a></li>
    `;
  } else {
    // Display menu for non-logged-in users
    menuHTML += `
      <li><a href="index.html" class="${currentPage.includes('index.html') ? 'active' : ''}">Home</a></li>
      <li><a href="search-result.html" class="${currentPage.includes('search-result.html') ? 'active' : ''}">Explore Listings</a></li>
      <li><a href="login.html" class="${currentPage.includes('login.html') ? 'active' : ''}">Log In | Sign Up</a></li>
    `;
  }

  // Set the updated menu HTML
  menu.innerHTML = menuHTML;
}

function showPopup(message) {
  return new Promise((resolve) => {
    let dialog = document.querySelector('#dialog');
    dialog.querySelector('.modal-body p').textContent = message;

    $('#dialog').on('hidden.bs.modal', function () {
      resolve();
    });

    $('#dialog').modal('show');
  });
}

updateMenu();

//Conditional statement to add event listeners to login and register forms in login.html
if (window.location.href.includes('login.html')) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('signupForm');
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    login();
  });

  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    register();
  });
}

// Conditional Statement to add logout event listener to logout button when user is logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    logout();
  });
}
