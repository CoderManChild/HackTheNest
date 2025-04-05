import { supabase } from './supabase.js';  // Import the Supabase client

const form = document.getElementById('posting-form');
const eventName = document.getElementById('event-name');
const eventDescription = document.getElementById('event-description');
const eventLocation = document.getElementById('event-location');
const eventTime = document.getElementById('event-time');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const name = eventName.value;
  const description = eventDescription.value;
  const location = eventLocation.value;
  const time = eventTime.value;

  // Insert the event into Supabase
  const { data, error } = await supabase
    .from('events') // Replace with your table name
    .insert([
      {
        name,
        description,
        location,
        time,
      },
    ]);

  if (error) {
    console.error('Error creating event:', error.message);
    alert('Failed to create event. Please try again.');
  } else {
    console.log('Event created:', data);
    alert('Event created successfully!');
    form.reset();
  }
});
  