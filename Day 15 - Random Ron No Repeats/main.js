// Modify it so that if the same quote gets returned from the API in the last 50 quotes, you skip it and fetch another one instead.
//
// Create storage array
// Check if newly retrieved quote matches item already in array
// 		If not display then
// 				Check if array is shorter than 50
// 							if so add retrieved quote to an array
// 								if not pop and add retrieved quote to array
// If so discard and repeat step two
//

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
 * keeps array length below 50 items
 * @param  {array} array array that is being maintained below #items
 * @return {array}       array trimmed to set length
 */
function maintainArray(array, length) {
	if (array.length > length) {
		array.shift();
	}
}

// remove retrieve quotes and add as parameter??
function checkDuplicate(data) {
	if (retrievedQuotes.indexOf(data[0]) > -1) {
		fetchQuote(endpoint);
	} else {
		retrievedQuotes.push(data[0]);
		maintainArray(retrievedQuotes, 50);
	}
	return retrievedQuotes;
}

/**
 * displays the JSON object in the HTML
 * @param  {array} data Array with quote returned by fetch request
 */
function displayData(array) {
	// display last item in array
	quote.textContent = array.slice(-1)[0];
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
