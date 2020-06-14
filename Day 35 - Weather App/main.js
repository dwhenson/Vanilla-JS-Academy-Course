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
  let location;
  let weather;

  /* ==========  Functions  ========== */

  function convertJSON(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }

  function render(element, location, weather) {
    element.innerHTML = `
      The weather in ${location.city} is ${weather.toLowerCase()} right now`;
  }

  function catchError(error) {
    app.innerHTML = `
      <p>I'm sorry we can't find the weather for your location at the moment. You could try looking out the window?</p>`;
  }

  function getLocation(endpoint) {
    fetch(endpoint)
      .then(convertJSON)
      .then((data) => {
        location = data;
        return fetch(
          `${weatherEndpoint}city=${location.city}&key=${weatherAPI}`
        )
          .then(convertJSON)
          .then((weatherData) => {
            weather = weatherData.data[0].weather.description;
          })
          .then(() => {
            render(app, location, weather);
          });
      })
      .catch(catchError);
  }

  /* ==========  Execution  ========== */

  getLocation(locationEndpoint);

  // close avoid global scope
})();

// Call the API
// fetch('https://jsonplaceholder.typicode.com/posts/5')
//   .then(function (response) {
//     if (response.ok) {
//       return response.json();
//     } else {
//       return Promise.reject(response);
//     }
//   })
//   .then(function (data) {
//     // Store the post data to a variable
//     post = data;

//     // Fetch another API
//     return fetch('https://jsonplaceholder.typicode.com/users/' + data.userId);
//   })
//   .then(function (response) {
//     if (response.ok) {
//       return response.json();
//     } else {
//       return Promise.reject(response);
//     }
//   })
//   .then(function (userData) {
//     console.log(post, userData);
//   })
//   .catch(function (error) {
//     console.warn(error);
// });
