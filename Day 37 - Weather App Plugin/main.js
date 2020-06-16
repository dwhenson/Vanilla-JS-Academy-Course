// Avoid global scope
(function () {

  // global variables to be used in function call, if required
  const fahrenheit = 'units=I';
  const celsius = 'units=M';

  /**
   * Gets weather based on user location and renders to index.html
   * @param  {object} options Options included by caller to overwrite defaults
   * @return {string}         HTML elements and text contents
   */
  function getWeatherRender(options) {

    /* ==========  Variables  ========== */

    // API call information
    const locationEndpoint = 'https://ipapi.co/json/';
    const weatherEndpoint = 'https://api.weatherbit.io/v2.0/current?';
    const weatherAPI = 'c81e60446f394ac3b6efb4b5c187cafa';

    // default options
    const defaults = {
      element: '#app',
      intro: 'h2',
      message: "Too lazy to look out the window? Here's the weather",
      units: 'celsius',
      icon: 'yes',
    };

    // combines options object into defaults object and overwrites as needed
    const settings = Object.assign(defaults, options);

    // select element to insert final HTML into
    const app = document.querySelector(settings.element);

    /* ==========  Functions  ========== */

    /* ----  Render html and associated helper functions  ---- */

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
     * Checks what temp units are passed and displays correct symbol
     * @return {string} C or F
     */
    function checkUnits() {
      return settings.units === 'celsius' ? 'C' : 'F';
    }

    /**
     * Checks if user wants an icon and renders accordingly
     * @param  {array} weather The weather array retried from API call
     * @return {string}        An img tag with or without icon src completed
     */
    function includeIcon(weather) {
      return settings.icon === 'yes'
        ? `<img src="icons/${sanitizeHTML(weather.weather.icon)}.png" alt=""/>`
        : `<img>`;
    }

    /**
     * Render the contents to HTML
     * @param  {string} element The element content is being inserted into
     */
    function render(element, location, weather) {
      element.innerHTML = `
    <${settings.intro}>${settings.message}<${settings.intro}>
    <h2>${sanitizeHTML(location.city)} Weather</h2>
      <div id="flex">
        <p>${sanitizeHTML(weather.weather.description)}</p>
        <p>${sanitizeHTML(weather.temp)}&deg${checkUnits()}</p>
        ${includeIcon(weather)}
     </div>`;
    }

    /* ----  API call and associated helper functions  ---- */

    /**
     * Converts response from an API to a JSON object
     * @param  {string} response  Unprocessed response from request
     * @return {object}           Response converted to JSON or rejected promise
     */
    function convertJSON(response) {
      return response.ok ? response.json() : Promise.reject(response);
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
            `${weatherEndpoint}city=${location.city}&${settings.units}&key=${weatherAPI}`
          );
        })
        .then(convertJSON)
        .then((data) => {
          render(app, location, data.data[0]);
        })
        .catch(catchError);
    }
    updateWeather();
  }

  /* ----  End getWeatherRender function  ---- */

  /* ==========  Execution  ========== */

  // Element options
  // element: 'any HTML element on index.html'

  // Intro options
  // intro: 'any HTML element'

  // Message options
  // Message: 'any text in a string'

  // Unit options
  // units: celsius(default) or fahrenheit (variables, not string)

  // Icon options
  // icon: 'yes' or 'no'

  getWeatherRender({
    // add your options here - uncomment below to see how it works:
    // message: 'this will give you a new message - update as needed'
    // units: fahrenheit
  });

  // close avoid global scope
})();
