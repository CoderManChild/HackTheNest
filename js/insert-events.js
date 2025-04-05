document.addEventListener("DOMContentLoaded", function () {
    const eventList = document.getElementById("event-list");
  
    // Define hardcoded post(s)
    const defaultEvents = [
      {
        name: "Community Cleanup",
        description: "Join us for a neighborhood cleanup event.",
        location: "Central Park",
        time: "Saturday, 10 AM",
        volunteers: 5
      }
    ];
  
    // Load user-created events
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
  
    // Combine default + user events
    const events = [...defaultEvents, ...storedEvents];
  
    // Render all events
    events.forEach(event => {
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("event");
  
      eventDiv.innerHTML = `
        <h2>${event.name}</h2>
        <p><strong>Description:</strong> ${event.description}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Volunteers Signed Up:</strong> ${event.volunteers}</p>
        <hr>
      `;
  
      eventList.appendChild(eventDiv);
    });
  });
  