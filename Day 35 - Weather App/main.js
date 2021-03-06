// avoid global scope
(function () {
  /* ==========  Variables  ========== */

  const app = document.querySelector('#app');
  const locationEndpoint = 'https://ipapi.co/json/';
  const weatherEndpoint = 'https://api.weatherbit.io/v2.0/current?';
  const weatherAPI = 'c81e60446f394ac3b6efb4b5c187cafa';

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
  function render(element, location, weather) {
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
    app.innerHTML = `<p>I'm sorry we can't find the weather for your location at the moment.</p>`;
    console.warn(error);
  }

  /**
   * Fetches user location based on IP address, passes that into weather API and gets the current weather
   */
  function updateWeather() {
    let location;
    fetch(locationEndpoint)
      .then(convertJSON)
      .then((data) => {
        location = data;
        return fetch(
          `${weatherEndpoint}city=${location.city}&key=${weatherAPI}`
        );
      })
      .then(convertJSON)
      .then((data) => {
        render(app, location, data.data[0]);
      })
      .catch(catchError);
  }

  /* ==========  Execution  ========== */

  updateWeather();

  // close function to avoid global scope
})();
