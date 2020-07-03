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
// CHECK pass to localStorage first???
// Then convert from JSON, then pass to render function and data{data}
// Create render to map over API data and insert into HTML
// Create isValid function to check timestamp
// Add API data to data{}, and add timestamp to data{timestamp}
// Create loadstorage function, if timestamp is valid use data, else recall API

// avoid global scope
(function () {
  /* ==========  Variables  ========== */

  const app = document.querySelector('#app');
  const apiEndpoint = 'https://vanillajsacademy.com/api/pirates.json';
  const storedData = {
    localData: {},
    timestamp: new Date().getTime(),
  }

  /* ==========  Functions  ========== */

  localStorage.setItem('scuttlebutt', JSON.stringify(storedData))

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
  // function sanitizeHTML (string) {
  //   const temp = document.createElement('div');
  //   temp.textContent = string;
  //   return temp.innerHTML;
  // };

  /**
   * Renders articles into DOM
   * @param  {string} element   The element into articles will be inserted
   * @param  {array}  articles  The articles to render from selectArticles
   * @param  {string} articles  The topic from topics array
   * @return {string}           Articles 'mapped' out from array into HTML format
   */
  function render(data) {
    console.log(data);
    //    element.innerHTML +=
    //     `<h2>Here's ${sanitizeHTML(numberArticles)} articles on ${sanitizeHTML(topic)}</h2>
    //     ${articles.results
    //       .slice(0, numberArticles)
    //       .map(function (article) {
    //         return`
    //       <article>
    //       <h3><a href="${sanitizeHTML(article.url)}">${sanitizeHTML(article.title)}</a></h3>
    //       <i>Published on ${sanitizeHTML(article.published_date.slice(0, 10))}</i>
    //       <p>${sanitizeHTML(article.abstract)}
    //       <br><b>${sanitizeHTML(article.byline)}</b></p>
    //       </article>`;
    //       })
    //       .join('')}`;
  }

  /**
   * Catch and present error if fetch request is not 'OK'
   */
  function catchError() {
    app.innerHTML = `
    <p>I'm sorry no pirates for you today</p>`;
  }

  /**
   * Run a fetch request, convert to JSON, and display on page
   * @param {string} Address of API being 'fetched'
   */

  // CHECK where does response come from? Automatic?

  function fetchScuttlebutt() {
    fetch(apiEndpoint) //
      .then(convertJSON)
      .then(render)
      .catch(catchError);
  }

  /* ==========  Event listeners and Inits  ========== */

  fetchScuttlebutt();
})();

// /**
//      * Check if saved data is still valid
//      * @param  {Object}  saved   Saved data
//      * @param  {Number}  goodFor Amount of time in milliseconds that the data is good for
//      * @return {Boolean}         If true, data is still valid
//      */
//     var isDataValid = function (saved, goodFor) {

//       // Check that there's data, and a timestamp key
//       if (!saved || !saved.data || !saved.timestamp) return false;

//       // Get the difference between the timestamp and current time
//       var difference = new Date().getTime() - saved.timestamp;

//       return difference < goodFor;

//     };

//     // Get data from localStorage
//     var saved = JSON.parse(localStorage.getItem('lunch'));

//     // Check if it's been less than a week since the data was saved
//     if (isDataValid(saved, 1000 * 60 * 60 * 24 * 7)) {
//       console.log('Still good!');
//     } else {
//       console.log('Expired');
//     }
