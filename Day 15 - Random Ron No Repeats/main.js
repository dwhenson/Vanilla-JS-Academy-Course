/* ==========  variables  ========== */

const endpoint = 'http://ron-swanson-quotes.herokuapp.com/v2/quotes';
const quote = document.querySelector('blockquote');
const button = document.querySelector('button');
const retrievedQuotes = [];

/* ==========  functions  ========== */

/**
 * converts response from an API to a JSON object
 * @param  {string} response Unprocessed response from request
 * @return {array}           Response converted to JSON or rejected promise
 */
function convertToJSON(response) {
	return response.ok ? response.json() : Promise.reject(response);
}

/**
 * maintain array at maximum desired length
 * @param  {array} array         array to be maintained
 * @param  {number} desiredLength maximum length of array being maintained
 */
function maintainArray(array, desiredLength) {
	if (array.length > desiredLength) {
		array.shift();
	}
}

/**
 * check if quote retrieved has is already in array of retrieved quotes
 * @param  {array} data quote retrieved in array form (length 0)
 */
// CHECK - can this be turned into a helper function?
function checkDuplicate(data) {
	if (retrievedQuotes.indexOf(data[0]) > -1) {
		fetchQuote(endpoint);
	} else {
		retrievedQuotes.push(data[0]);
		maintainArray(retrievedQuotes, 50);
	}
}

/**
 * displays the JSON object in the HTML
 * @param  {array} data Array with quote returned by fetch request
 */
function displayData(data) {
	quote.textContent = retrievedQuotes.slice(-1), [0];
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
		.then(checkDuplicate)
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
