// GOAL
// Call The Scuttlebutt API and get back some pirate-themed articles.
// https://vanillajsacademy.com/api/pirates.json
// 
// STEPS
// Make the API call
// Render contents to the HTML page
// Cache the data in local storage for a short time
// Use cached data on page reload for that time, then re-call API
// 
// TODO 
// Set up variables: app, fetch API, data{}
// Use fetch to get API data (returns promise)
// Then convert from JSON, then pass to render function and data{data}
// Create render to map over API data and insert into HTML
// Create isValid function to check timestamp
// Add API data to data{}, and add timestamp to data{timestamp} 
// Create loadstorage function, if timestamp is valid use data, else recall API

