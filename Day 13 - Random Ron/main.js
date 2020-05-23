/* ==========  variables  ========== */

const endpoint = 'http://ron-swanson-quotes.herokuapp.com/v2/quotes';
const quote = document.querySelector('blockquote');
const button = document.querySelector('button');

/* ==========  functions  ========== */

function fetchQuote(endpoint) {
	fetch(endpoint)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(response);
			}
		})
		.then(function (data) {
			quote.textContent = data;
		})
		.catch(function (error) {
			console.warn('This when wrong:', error);
		});
}

/* ==========  execution  ========== */

fetchQuote(endpoint); // initial run on page load

button.addEventListener('click', () => {
	fetchQuote(endpoint);
});
