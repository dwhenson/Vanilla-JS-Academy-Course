
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
      .then((response) => {
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
