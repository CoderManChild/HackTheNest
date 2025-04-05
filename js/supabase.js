// supabase.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.8.0/+esm";



// Replace these with your actual Supabase URL and anon key
const SUPABASE_URL = "https://oikulzakedxjpyxhbtte.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pa3VsemFrZWR4anB5eGhidHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4ODMxMTAsImV4cCI6MjA1OTQ1OTExMH0.DRQyFJsU0Yw0SzsZThODmjrSoHvV2MD4AKXBesJD5_M";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabase };
