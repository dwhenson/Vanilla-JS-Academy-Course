
// Enable or disable the icon for the weather conditions.

function getWeatherRender(options) {
  /* ==========  Variables  ========== */
  const locationEndpoint = 'https://ipapi.co/json/';
  const weatherEndpoint = 'https://api.weatherbit.io/v2.0/current?';
  const weatherAPI = 'c81e60446f394ac3b6efb4b5c187cafa';

  // default options
  const defaults = {
    element: '#app',
    intro: 'h2',
    message: "Too lazy to look out the window? Here's the weather",
    units: 'celsius',
    // icon: present,
  };

  // combine options object into defaults object
  const settings = Object.assign(defaults, options);

  // set default for element to insert HTML into
  const app = document.querySelector(settings.element);
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
    <${settings.intro}>${settings.message}<${settings.intro}>
    <h3>${sanitizeHTML(location.city)}</h3>
      <div id="flex">
        <p>
          ${sanitizeHTML(weather.weather.description)}<br>
          Temperature: ${sanitizeHTML(weather.temp)}
          &deg${settings.units === 'celsius' ? 'C' : 'F'}
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


  /* ==========  Execution  ========== */

// Unit options
const fahrenheit = 'units=I';
const celsius = 'units=M';

getWeatherRender({
  units: fahrenheit
});
