import { supabase } from "../js/firebase.js";

document.getElementById("posting-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const user = supabase.auth.user();
  if (!user) {
    alert("Please log in before posting an event.");
    return;
  }

  const eventObj = {
    name: document.getElementById("event-name").value.trim(),
    description: document.getElementById("event-description").value.trim(),
    location: document.getElementById("event-location").value.trim(),
    time: document.getElementById("event-time").value.trim(),
    volunteers: 0,
    user_id: user.id, // Associate the event with the logged-in user
  };

  if (!eventObj.name || !eventObj.description || !eventObj.location || !eventObj.time) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const { data, error } = await supabase.from("events").insert([eventObj]);

    if (error) throw error;

    window.location.href = "index.html";
  } catch (error) {
    alert("Error posting event: " + error.message);
  }
});
