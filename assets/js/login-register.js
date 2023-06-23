async function login() {
  var email = document.getElementById('loginEmail').value;
  var pass = document.getElementById('loginPswd').value;

  let isInStorage = false;

  var userDatabase = localStorage.getItem('userDatabase');
  try {
    userDatabase = JSON.parse(userDatabase);
    isInStorage = userDatabase.some((data) => {
      if (data.email === email && data.password === pass) {
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
  var user = document.getElementById('signupUsername').value;
  var email = document.getElementById('signupEmail').value;
  var pass = document.getElementById('signupPswd').value;
  var userType = document.getElementById('userType').value;

  var newUserData = {
    username: user,
    email: email,
    password: pass,
    type: userType
  };

  var currentData = localStorage.getItem('userDatabase')

  if (currentData !== null) {
    currentData = JSON.parse(currentData);

    //Check if username or email already exists
    var isExisting = currentData.some(async (data) => {
      if (data.username === user) {
        await showPopup('Username already exists!');
        return true;
      } else if (data.email === email) {
        await showPopup('Email already exists!');
        return true;
      }
    });
    // If username or email already exists, do not add to database
    if (isExisting) {
      return;
    }

    currentData.push(newUserData);
  }
  else {
    currentData = [newUserData];
  }

  localStorage.setItem('userDatabase', JSON.stringify(currentData));

  alert('Registered successfully!');

  window.location.href = 'login.html';
}

async function logout() {
  localStorage.setItem('isLoggedIn', 'false');
  await showPopup('Logged out successfully!');
  window.location.href = 'index.html';
}

function updateMenu() {
  var menu = document.querySelector('.nav')
  var isLoggedIn = localStorage.getItem('isLoggedIn');

  //get the current page
  var currentPage = window.location.href;

  // Build the menu HTML dynamically
  var menuHTML = '';

  if (isLoggedIn === 'true') {
    // Display menu for logged-in users
    menuHTML += `
      <li><a href="index.html" class="${currentPage.includes('index.html') ? 'active' : ''}">Home</a></li>
      <li><a href="category.html" class="${currentPage.includes('category.html') ? 'active' : ''}">My Profile</a></li>
      <li><a href="listing.html" class="${currentPage.includes('listing.html') ? 'active' : ''}">Explore Listings</a></li>
      <li><a href="index.html" id="logoutBtn">Logout</a></li>
    `;
  } else {
    // Display menu for non-logged-in users
    menuHTML += `
      <li><a href="index.html" class="${currentPage.includes('index.html') ? 'active' : ''}">Home</a></li>
      <li><a href="listing.html" class="${currentPage.includes('listing.html') ? 'active' : ''}">Explore Listings</a></li>
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

if (window.location.href.includes('index.html') && localStorage.getItem('isLoggedIn') === 'true') {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    logout();
  });
}
function pageReload() {
  location.reload();
}

