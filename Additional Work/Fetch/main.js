// GOAL Modify it so that if the same quote gets returned from the API in the last 50 quotes, you skip it and fetch another one instead.

// STEPS
// Create empty array to store quotes
// Check if array.includes(data??)
// If so call fetch again
// If not render and push to array
// If array.length > 50 delete first item array.shift()

// avoid global scope
(function () {
  /* ==========  Variables  ========== */
  const apiEndpoint = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
  const refresh = document.querySelector('button');
  const element = document.querySelector('[aria-live]');
  const errorMessage = 'Sorry no Ron for you today';
  const quotes = [];

  /* ==========  Functions  ========== */

  function catchError(error) {
    element.textContent = errorMessage;
  }

  function render(data) {
    if (quotes.includes(data)) {
      fetchQuote(apiEndpoint);
      return;
    }
    element.textContent = data;
    quotes.push(data);
    if (quotes.length >= 50) {
      quotes.shift();
    }
  }

  function fetchQuote(endpoint) {
    fetch(endpoint)
      .then(function (response) {
        return response.ok ? response.json() : Promise.reject(response);
      })
      .then((data) => {
        render(data[0]);
      })
      .catch((error) => {
        catchError(error);
      });
  }
  /* ==========  Inits and Event Listeners  ========== */

  fetchQuote(apiEndpoint);

  refresh.addEventListener('click', () => {
    fetchQuote(apiEndpoint);
  });
})();
