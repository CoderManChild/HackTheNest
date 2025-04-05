import { supabase } from "../js/firebase.js";

function handleAttendance(eventName) {
  const user = supabase.auth.user();
  if (!user) {
    alert("Please log in to confirm attendance.");
    return;
  }

  supabase
    .from("events")
    .select("*")
    .eq("name", eventName)
    .single()
    .then(async ({ data, error }) => {
      if (error) throw error;

      const eventToUpdate = data;
      if (eventToUpdate.volunteers && eventToUpdate.volunteers.includes(user.id)) {
        alert("You have already confirmed attendance.");
        return;
      }

      eventToUpdate.volunteers = eventToUpdate.volunteers || [];
      eventToUpdate.volunteers.push(user.id); // Add user ID to the volunteers list

      const { error: updateError } = await supabase
        .from("events")
        .update({ volunteers: eventToUpdate.volunteers })
        .eq("name", eventName);

      if (updateError) {
        alert("Error confirming attendance: " + updateError.message);
        return;
      }

      alert("Attendance confirmed!");
      loadPosts(); // Reload posts to reflect the new volunteer count
    });
}
