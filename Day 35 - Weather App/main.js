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

  /**
   * Converts response from an API to a JSON object
   * @param  {string} response  Unprocessed response from request
   * @return {object}           Response converted to JSON or rejected promise
   */
  function convertJSON(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }

  /**
   * Sanitize and encode all HTML in a user-submitted string
   * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {String} string  The user-submitted string
   * @return {String} string  The sanitized string
   */
  function sanitizeHTML(string) {
    const temp = document.createElement('div');
    temp.textContent = string;
    return temp.innerHTML;
  }

/**
 * Render the contents to HTML
 * @param  {string} element The element content is being inserted into
 */
  function render(element) {
    element.innerHTML = `
    <h2>${sanitizeHTML(location.city)} Weather</h2>
      <div id="flex">
        <p>
          ${sanitizeHTML(weather.weather.description)}
          <br>Temperature: ${sanitizeHTML(weather.temp)}&#8451
        </p>
        <img src="icons/${sanitizeHTML(weather.weather.icon)}.png" alt=""/>
     </div>`;
  }

  
  /**
   * Catch and present error if fetch request is not 'OK'
   */
  function catchError(error) {
    app.innerHTML = `
      <p>I'm sorry we can't find the weather for your location at the moment. You could try looking out the window?</p>`;
  }

/**
 * Fetches weather based on location and calls render
  */
  function updateWeather() {
    fetch(locationEndpoint)
      .then(convertJSON)
      .then((data) => {
        location = data;
        return fetch(
          `${weatherEndpoint}city=${location.city}&key=${weatherAPI}`
        )
          .then(convertJSON)
          .then((weatherData) => {
            weather = weatherData.data[0];
          })
          .then(() => {
            render(app, location, weather);
          });
      })
      .catch(catchError);
  }

  /* ==========  Execution  ========== */

  updateWeather();

  // close function to avoid global scope
})();
