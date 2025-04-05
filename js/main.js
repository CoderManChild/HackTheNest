// Global functions for authentication, search, and common event listeners

document.addEventListener("DOMContentLoaded", () => {
    checkLoggedIn();
    loadPosts(); // from events.js
    document.getElementById("search-form").addEventListener("submit", handleSearch);
  });
  
  function checkLoggedIn() {
    const user = JSON.parse(localStorage.getItem("user"));
    const greetingContainer = document.getElementById("greetingContainer");
    const logoutButton = document.getElementById("logout");
    const loginButton = document.getElementById("login");
  
    greetingContainer.innerHTML = "";
    if (user) {
      greetingContainer.innerHTML = `<h1>Hello, ${user.username}!</h1>`;
      logoutButton.style.display = "block";
      loginButton.style.display = "none";
      logoutButton.addEventListener("click", handleLogout);
    } else {
      greetingContainer.innerHTML = `<h1>Welcome, Visitor</h1>`;
      logoutButton.style.display = "none";
      loginButton.style.display = "block";
    }
  }
  
  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.href = "index.html";
  }
  
  function handleSearch(e) {
    e.preventDefault();
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const posts = document.querySelectorAll(".post");
    posts.forEach(post => {
      post.style.display = post.textContent.toLowerCase().includes(query) ? "block" : "none";
    });
  }
  