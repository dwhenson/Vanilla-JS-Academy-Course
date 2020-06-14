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

  function updateWeather(endpoint) {
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

  updateWeather(locationEndpoint);

  // close avoid global scope
})();


