// GOAL Build an app that gets a user’s location and displays their current weather information (use ipapi for location and Weatherbit for weather data)
//
// STEPS
// fetch the location information from ipai
// use object.city to fetch weather information from weather bit
// render to app
// figure out icons...
//
// Create vars for app, location and weather-api, and weather(?)
// Fetch() location information and set as location variable
// Then() fetch weather-api + ${location} - in correct place
// Render variable to app - aria-live
// Figure out associated icons...

// avoid global scope
(function () {
  /* ==========  Variables  ========== */

  const app = document.querySelector('#app');
  const locationEndpoint = 'https://ipapi.co/json/';
  const weatherEndpoint = 'https://api.weatherbit.io/v2.0/current?';
  const weatherAPI = 'c81e60446f394ac3b6efb4b5c187cafa';
  let weatherFetch;
  let location;
  let weather;

  /* ==========  Functions  ========== */

  function convertJSON(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }

  function catchError(error) {
    app.innerHTML = `
      <p>I'm sorry we can't find the weather for your location at the moment. You could try looking out the window?</p>`;
  }

  function render(element) {
    element.innerHTML = `
      <p aria-live="polite" >The weather in ${location.city} is 
      ${weather.toLowerCase()} right now</p>`;
  }

  function updateWeather(endpoint) {
    fetch(endpoint)
      .then(convertJSON)
      .then((data) => {
        location = data;
        weatherFetch = `${weatherEndpoint}city=${location.city}&key=${weatherAPI}`;
      })
      .catch(catchError);
  }

  console.log(weatherFetch);
  // function getWeather(fetchWeather) {
  //   console.log(fetchWeather);
  //   fetch(fetchWeather)
  //     .then(convertJSON)
  //     .then((data) => {
  //       weather = data.data[0].weather.description;
  //     })
  //     .then(() => {
  //       render(app, location, weather);
  //     })
  //     .catch(catchError);
  // }

  /* ==========  Execution  ========== */

  updateWeather(locationEndpoint);
  // getWeather(weatherFetch)

  // close avoid global scope
})();
