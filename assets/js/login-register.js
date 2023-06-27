let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'];

async function login() {
  var email = document.getElementById('loginEmail').value;
  var pass = document.getElementById('loginPswd').value;

  let isInStorage = false;

  var userDatabase = localStorage.getItem('userDatabase');
  try {
    userDatabase = JSON.parse(userDatabase);
    isInStorage = userDatabase.some((data) => {
      if (data.email === email && data.password === pass) {
        localStorage.setItem('currentUser', JSON.stringify(data));
        return true;
      }
    });
  }
  catch (e) {
    await showPopup('No such user exists');
    return;
  }

  if (isInStorage) {
    localStorage.setItem('isLoggedIn', 'true');
    await showPopup('Logged in successfully!');
    window.location.href = 'index.html';
  }
  else {
    await showPopup('Invalid email or password!');
  }
}

async function register() {
  const user = document.getElementById('signupUsername').value;
  const email = document.getElementById('signupEmail').value;
  const pass = document.getElementById('signupPswd').value;
  const userType = document.querySelector('input[name="userType"]:checked').value;
  const profilePic = document.getElementById('fileUpload').files[0];

  //Add current date as date of registration
  const curDate = new Date();
  const year = curDate.getFullYear();
  const month = monthNames[curDate.getMonth()];
  const registerDate = `${month} ${year}`;

  var newUserData = {
    username: user,
    email: email,
    password: pass,
    type: userType,
    description: '',
    profilePic: '',
    joinDate: registerDate,
    noOfReviews: 0,
    followers: 0,
    college: '',
    course: ''
  };

  var currentData = localStorage.getItem('userDatabase')

  if (currentData !== null) {
    currentData = JSON.parse(currentData);

    //Check if username or email already exists
    var isExisting = false;

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
  }
  else {
    currentData = [newUserData];
  }

  // Handle file upload
  if (profilePic) {
    const reader = new FileReader();

    reader.onload = async function () {
      newUserData.profilePic = reader.result;
      localStorage.setItem('userDatabase', JSON.stringify(currentData)); // Update local storage with newUserData

      await showPopup('Registered successfully!');

      window.location.href = 'login.html';
    };

    reader.readAsDataURL(profilePic);
  } else {
    localStorage.setItem('userDatabase', JSON.stringify(currentData)); // Update local storage without profilePic

    await showPopup('Registered successfully!');

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
  var menu = document.querySelector('.nav')
  var isLoggedIn = localStorage.getItem('isLoggedIn');
  var userID = '';
  if (localStorage.getItem('isLoggedIn') !== 'false') {
    userID= JSON.parse(localStorage.getItem('currentUser'));
  }

  //get the current page
  var currentPage = window.location.href;

  // Build the menu HTML dynamically
  var menuHTML = '';

  if (isLoggedIn === 'true') {
    // Display menu for logged-in users
    menuHTML += `
      <li><a href="index.html" class="${currentPage.includes('index.html') ? 'active' : ''}">Home</a></li>
      <li><a href="test-profile.html?id=${userID.username}" class="${currentPage.includes('test-profile.html') ? 'active' : ''}">My Profile</a></li>
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
    var dialog = document.querySelector('#dialog');
    var DialogueMessage = dialog.querySelector('p');
    DialogueMessage.textContent = message;
    dialog.showModal();

    dialog.addEventListener('close', () => {
      resolve();
    });
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
