// Handles the event posting form on posting_page.html

document.getElementById("posting-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in before posting an event.");
      return;
    }
    const eventObj = {
      name: document.getElementById("event-name").value.trim(),
      description: document.getElementById("event-description").value.trim(),
      location: document.getElementById("event-location").value.trim(),
      time: document.getElementById("event-time").value.trim(),
      volunteers: 0
    };
    if (!eventObj.name || !eventObj.description || !eventObj.location || !eventObj.time) {
      alert("Please fill in all fields.");
      return;
    }
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(eventObj);
    localStorage.setItem("events", JSON.stringify(events));
    window.location.href = "index.html";
  });
  