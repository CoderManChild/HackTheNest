// insert-events.js
import { supabase } from "../js/supabase.js";

document.addEventListener("DOMContentLoaded", async function () {
  const eventList = document.getElementById("event-list");

  try {
    // Fetch events from Supabase
    const { data: events, error } = await supabase.from("events").select("*");

    if (error) {
      console.error("Error fetching events from Supabase:", error.message);
      eventList.innerHTML = "<p>Error loading events. Please try again later.</p>";
      return;
    }

    console.log("Fetched events:", events);

    if (!events || events.length === 0) {
      eventList.innerHTML = "<p>No events found.</p>";
      return;
    }

    // Render all events
    events.forEach(event => {
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("event");

      eventDiv.innerHTML = `
<<<<<<< HEAD
        <h2>${event.name || "Untitled Event"}</h2>
        <p><strong>Description:</strong> ${event.description || "No description provided."}</p>
        <p><strong>Location:</strong> ${event.location || "TBD"}</p>
        <p><strong>Time:</strong> ${event.time || "TBD"}</p>
        <p><strong>Volunteers Signed Up:</strong> ${event.volunteers ?? 0}</p>
        <hr>
=======
        <h2>${event.name}</h2>
        <p><strong>Description:</strong> ${event.description}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Volunteers Signed Up:</strong> ${event.volunteers}</p>
        <button class="confirm-btn">Yes</button>
        <button class="confirm-btn">No</button>
>>>>>>> 48818c9e6728da0a269e833d18408290d5c22227
      `;

      eventList.appendChild(eventDiv);
    });
  } catch (err) {
    console.error("Unexpected error occurred:", err);
    eventList.innerHTML = "<p>Something went wrong. Please try again.</p>";
  }
});

const { data: events, error } = await supabase.from("events").select("*");
console.log("Fetched events:", events); // Add this line
console.log("Fetch error:", error);     // And this one
