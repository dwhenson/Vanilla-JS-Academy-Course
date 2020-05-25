// Modify it so that if the same quote gets returned from the API in the last 50 quotes, you skip it and fetch another one instead.
//
// Create storage array
// Add data to array
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
const retrievedQuotes = [
	'I love nothing',
	'Dear frozen yogurt, you are the celery of desserts. Be ice cream or be nothing. Zero stars.',
	'Fish, for sport only, not for meat. Fish meat is practically a vegetable.',
	"Capitalism: God's way of determining who is smart and who is poor.",
	'I wanna punch you in the face so bad right now.',
	'I love riddles!',
	"I call this turf ‘n’ turf. It's a 16 oz T-bone and a 24 oz porterhouse. Also, whiskey and a cigar. I am going to consume all of this at the same time because I am a free American.",
	"I've cried twice in my life. Once when I was seven and hit by a school bus. And then again when I heard that Li'l Sebastian has passed.",
	"Don't waste energy moving unless necessary.",
	'Just give me all the bacon and eggs you have. Wait...wait. I worry what you just heard was: Give me a lot of bacon and eggs. What I said was: Give me all the bacon and eggs you have. Do you understand?',
	'People who buy things are suckers.',
	'I believe luck is a concept invented by the weak to explain their failures.',
	"Fishing relaxes me. It's like yoga, except I still get to kill something.",
	'Normally, if given the choice between doing something and nothing, I’d choose to do nothing. But I will do something if it helps someone else do nothing. I’d work all night, if it meant nothing got done.',
	'Breakfast food can serve many purposes.',
	'Fish, for sport only, not for meat. Fish meat is practically a vegetable.',
	'Under my tutelage, you will grow from boys to men. From men into gladiators. And from gladiators into Swansons.',
	"My only official recommendations are US Army-issued mustache trimmers, Morton's Salt, and the C.R. Lawrence Fein two inch axe-style scraper oscillating knife blade.",
	'Turkey can never beat cow.',
	'Friends: one to three is sufficient.',
];

/* ==========  functions  ========== */

/**
 * converts response from an API to a JSON object
 * @param  {string} response Unprocessed response from request
 * @return {array}           Response converted to JSON or rejected promise
 */
function convertToJSON(response) {
	return response.ok ? response.json() : Promise.reject(response);
}

function maintainArray(data) {
	console.log(data[0]);
	retrievedQuotes.push(data[0]);
	console.log(retrievedQuotes);
	if (retrievedQuotes.indexOf(data[0]) > -1) {
		console.log('new quote');
	} else {
		console.log('duplicate!!! ');
	}
}

// function checkDuplicate(data) {

// }

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
		.then(maintainArray)
		// .then(checkDuplicate)
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
