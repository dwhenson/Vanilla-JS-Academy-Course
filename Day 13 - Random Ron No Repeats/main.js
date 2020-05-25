/* ==========  variables  ========== */

const endpoint = 'http://ron-swanson-quotes.herokuapp.com/v2/quotes';
const quote = document.querySelector('blockquote');
const button = document.querySelector('button');

/* ==========  functions  ========== */

/**
 * converts response from an API to a JSON object
 * @param  {string} response Unprocessed response from request
 * @return {array}           Response converted to JSON or rejected promise
 */
function convertToJSON(response) {
	return response.ok ? response.json(response) : Promise.reject(response);
}

/**
 * displays the JSON object in the HTML
 * @param  {array} data Array with quote returned by fetch request
 */
function displayData(data) {
	quote.textContent = data;
}

/**
 * catch and present error if fetch request != 'OK'
 */
function catchError(error) {
	quote.textContent = `Sorry something went wrong; like this: '${error}'`;
}

/**
 * run a fetch request, convert to JSON, and display on page
 * @param  {sting} APIendpoint http address of API being 'fetched'
 */
function fetchQuote(APIendpoint) {
	fetch(APIendpoint) //
		.then(convertToJSON)
		.then(displayData)
		.catch(catchError);
}

/* ==========  execution  ========== */

// initial run on page load
fetchQuote(endpoint);

// repeat runs on click
button.addEventListener('click', () => {
	fetchQuote(endpoint);
});
