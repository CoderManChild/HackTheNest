import { supabase } from "../js/supabase.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", async function () {
  const eventList = document.getElementById("event-list");

  // Firebase authentication check
  const auth = getAuth();
  let currentUser = null;

  // Listen for Firebase auth state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
      console.log("User is logged in:", currentUser);
      document.getElementById('signup-link').style.display = 'none';
      document.getElementById('login-link').style.display = 'none';
      document.getElementById('logout-link').style.display = 'inline';
    } else {
      currentUser = null;
      console.warn("User not logged in. Sign-up buttons will be disabled.");
      document.getElementById('signup-link').style.display = 'inline';
      document.getElementById('login-link').style.display = 'inline';
      document.getElementById('logout-link').style.display = 'none';
    }
  });

  try {
    // Fetch events from Supabase
    const { data: events, error } = await supabase.from("events").select("*");

    if (error) {
      console.error("Error fetching events from Supabase:", error.message);
      eventList.innerHTML = "<p>Error loading events. Please try again later.</p>";
      return;
    }

    if (!events || events.length === 0) {
      eventList.innerHTML = "<p>No events found.</p>";
      return;
    }

    // Format the date and time
    function formatDate(dateString) {
      const date = new Date(dateString);
      const options = {
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      };
      return date.toLocaleString("en-US", options).replace(",", "");
    }

    events.forEach(event => {
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("event");

      const formattedTime = event.time ? formatDate(event.time) : "TBD";

      eventDiv.innerHTML = `
        <div class="event-info">
          <h2>${event.name || "Untitled Event"}</h2>
          <p><strong>Description:</strong> ${event.description || "No description provided."}</p>
          <p><strong>Location:</strong> ${event.location || "TBD"}</p>
          <p><strong>Time:</strong> ${formattedTime}</p>
          <p><strong>Volunteers Signed Up:</strong> <span class="vol-count">${event.volunteers ?? 0}</span></p>
        </div>
        <button ${!currentUser ? "disabled" : ""}>Sign Up</button>
      `;

      const signUpBtn = eventDiv.querySelector("button");
      const volCountEl = eventDiv.querySelector(".vol-count");

      // Handle sign-up button click
      signUpBtn.addEventListener("click", async () => {
        if (!currentUser) {
          alert("You must be logged in to sign up for an event.");
          return;
        }

        // Check if the user already signed up
        const { data: existingSignup, error: signupError } = await supabase
          .from("event_signups")
          .select("*")
          .eq("event_id", event.id)
          .eq("user_id", currentUser.uid)  // Use Firebase UID
          .single();

        if (signupError && signupError.code !== "PGRST116") {
          console.error("Error checking signup:", signupError.message);
          alert("An error occurred while checking your signup. Try again.");
          return;
        }

        if (existingSignup) {
          alert("You've already signed up for this event.");
          return;
        }

        // Insert new signup
        const { error: insertError } = await supabase
          .from("event_signups")
          .insert([{ event_id: event.id, user_id: currentUser.uid }]);

        if (insertError) {
          console.error("Error inserting signup:", insertError.message);
          alert("Failed to sign up. Please try again.");
          return;
        }

        // Increment volunteer count
        const { error: updateError } = await supabase
          .from("events")
          .update({ volunteers: event.volunteers + 1 })
          .eq("id", event.id);

        if (updateError) {
          console.error("Error updating volunteer count:", updateError.message);
          alert("Signed up but failed to update count.");
          return;
        }

        // Update volunteer count in UI
        event.volunteers += 1;
        volCountEl.textContent = event.volunteers;
        alert("You successfully signed up!");
      });

      // Append event to the list
      eventList.appendChild(eventDiv);
    });
  } catch (err) {
    console.error("Unexpected error occurred:", err);
    eventList.innerHTML = "<p>Something went wrong. Please try again.</p>";
  }
});
