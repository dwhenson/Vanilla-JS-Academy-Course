// FIXME need to rethink logic and approach

// avoid global scope
(function () {
  /* ==========  Variables  ========== */

  const app = document.querySelector('#app');
  const apiEndpoint = 'https://vanillajsacademy.com/api/pirates.json';
  const storedData = {
    localData: {},
    timestamp: new Date().getTime(),
  };

  localStorage.setItem('scuttlebutt', JSON.stringify(storedData));

  /* ==========  Functions  ========== */
  /**
   * Catch and present error if fetch request is not 'OK'
   */
  function catchError() {
    app.innerHTML = `
    <p>I'm sorry no pirates for you today</p>`;
  }

  // *
  //  * Sanitize and encode all HTML in a user-submitted string
  //  * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
  //  * @param  {String} string  The user-submitted string
  //  * @return {String} string  The sanitized string
  function sanitizeHTML(string) {
    const temp = document.createElement('div');
    temp.textContent = string;
    return temp.innerHTML;
  }

  // Check if it's been less than a week since the data was saved

  function render(dataObject) {
    app.innerHTML = `
    <h1>${dataObject.localData.publication}</h1>
    ${dataObject.localData.articles //
      .map(function (article) {
        return `
      <article>
      <h2>${sanitizeHTML(article.title)}</h2>
      <i>${sanitizeHTML(article.pubdate)}</i>
      <p>${sanitizeHTML(article.article)}</p>
      </article>`;
      })
      .join('')}
    `;
  }

  /**
   * Check if saved data is still valid
   * @param  {Object}  saved   Saved data
   * @param  {Number}  goodFor Amount of time in ms that the data is good for
   * @return {Boolean}         If true, data is still valid
   */
  function isDataValid(saved, goodFor) {
    // Check that there's data, and a timestamp key
    if (!saved || !saved.localData || !saved.timestamp) return false;
    // Get the difference between the timestamp and current time
    const difference = new Date().getTime() - saved.timestamp;
    console.log(difference);
    return difference < goodFor;
  }

  function checkValidity() {
    const retrivedData = JSON.parse(localStorage.getItem('scuttlebutt'));
    if (isDataValid(retrivedData, 400)) {
      console.log('From cache');
      render(retrivedData);
    } else {
      console.log('From API call');
      fetch(apiEndpoint) //
        .then(convertJSON)
        .then(storeData)
        .then(render(retrivedData))
    }
  }

  function storeData(data) {
    const scuttlebuttString = localStorage.getItem('scuttlebutt');
    const scuttlebuttObject = JSON.parse(scuttlebuttString);
    scuttlebuttObject.localData = data;
    localStorage.setItem('scuttlebutt', JSON.stringify(scuttlebuttObject));
  }

  /**
   * Converts response from an API to a JSON object
   * @param  {string} response  Unprocessed response from request
   * @return {object}           Response converted to JSON or rejected promise
   */
  function convertJSON(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }

  function fetchScuttlebutt() {
    fetch(apiEndpoint) //
      .then(convertJSON)
      .then(storeData)
      .then(checkValidity)
      .catch(catchError);
  }

  /* ==========  Event listeners and Inits  ========== */

  fetchScuttlebutt();
})();
