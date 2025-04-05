import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    checkLoggedIn();
    loadPosts(); // from events.js
    document.getElementById("search-form").addEventListener("submit", handleSearch);
});

function checkLoggedIn() {
  const auth = getAuth();
  const greetingContainer = document.getElementById("greetingContainer");
  const logoutButton = document.getElementById("logout");
  const loginButton = document.getElementById("login");

  onAuthStateChanged(auth, user => {
    greetingContainer.innerHTML = "";
    if (user) {
      greetingContainer.innerHTML = `<h1>Hello, ${user.displayName || user.email}!</h1>`;
      logoutButton.style.display = "block";
      loginButton.style.display = "none";
      logoutButton.addEventListener("click", handleLogout);
    } else {
      greetingContainer.innerHTML = `<h1>Welcome, Visitor</h1>`;
      logoutButton.style.display = "none";
      loginButton.style.display = "block";
    }
  });
}

function handleLogout(e) {
  e.preventDefault();
  const auth = getAuth();
  signOut(auth).then(() => {
    window.location.href = "index.html";
  }).catch(error => {
    console.log("Logout error:", error);
  });
}

function handleSearch(e) {
  e.preventDefault();
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach(post => {
    post.style.display = post.textContent.toLowerCase().includes(query) ? "block" : "none";
  });
}
