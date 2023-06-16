function login() {
  document.getElementById('menu_nav').innerHTML = "" +
    "                 <li><a href=\"index.html\" class=\"active\">Home</a></li>\n" +
    "                 <li><a href=\"category.html\">My Profile</a></li>\n" +
    "                 <li><a href=\"listing.html\">Explore Listings</a></li>\n" +
    "                 <li><a href=\"#\" onclick=\"logout()\">Logout</a></li>";

}

function logout() {
  document.getElementById('menu_nav').innerHTML = "" +
    "                 <li><a href=\"index.html\" class=\"active\">Home</a></li>\n" +
    "                 <li><a href=\"listing.html\">Explore Listings</a></li>\n" +
    "                 <li><a href=\"#\" onclick=\"login()\">Log In | Sign Up</a></li>";

}
