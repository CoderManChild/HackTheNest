// Functions for loading and managing event posts

function loadPosts() {
    const postsContainer = document.getElementById("postsContainer");
    const events = JSON.parse(localStorage.getItem("events")) || [];
    postsContainer.innerHTML = "";
    const postsPerColumn = 3;
    let currentColumn, count = 0;
  
    events.forEach(eventObj => {
      const postElement = createPostElement(eventObj);
      if (count % postsPerColumn === 0) {
        currentColumn = document.createElement("div");
        currentColumn.classList.add("column");
        postsContainer.appendChild(currentColumn);
      }
      currentColumn.appendChild(postElement);
      count++;
    });
  }
  
  function createPostElement(eventObj) {
    const { name, description, location, time, volunteers = 0 } = eventObj;
    const safeName = name.replace(/\s/g, "_");
  
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
      <h3>${name}</h3>
      <p>${description}</p>
      <p>${location}</p>
      <p>${time}</p>
      <p>Volunteers: ${volunteers}</p>
      <div class="attendance-controls">
        <button class="attendance-button" data-event="${name}">
          <i class="fas fa-check"></i>
        </button>
        <button class="cancel-button" data-event="${name}">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="comments-section" id="comments-${safeName}"></div>
    `;
    // Bind attendance events
    postElement.querySelector(".attendance-button").addEventListener("click", () => handleAttendance(name));
    postElement.querySelector(".cancel-button").addEventListener("click", () => handleCancelRegistration(name));
    // Load comments for this event (from comments.js)
    loadComments(name, document.getElementById(`comments-${safeName}`));
    return postElement;
  }
  
  function handleAttendance(eventName) {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const eventToUpdate = events.find(e => e.name === eventName);
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to confirm attendance.");
      return;
    }
    if (user.attendedEvents && user.attendedEvents.includes(eventName)) {
      alert("You have already confirmed attendance.");
      return;
    }
    eventToUpdate.volunteers = (eventToUpdate.volunteers || 0) + 1;
    user.attendedEvents = user.attendedEvents ? [...user.attendedEvents, eventName] : [eventName];
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("events", JSON.stringify(events));
    loadPosts();
  }
  
  function handleCancelRegistration(eventName) {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const eventToUpdate = events.find(e => e.name === eventName);
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to cancel your attendance.");
      return;
    }
    if (!(user.attendedEvents && user.attendedEvents.includes(eventName))) {
      alert("You have not attended this event.");
      return;
    }
    eventToUpdate.volunteers = Math.max((eventToUpdate.volunteers || 0) - 1, 0);
    user.attendedEvents = user.attendedEvents.filter(e => e !== eventName);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("events", JSON.stringify(events));
    loadPosts();
  }
  