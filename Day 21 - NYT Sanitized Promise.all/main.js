// Before rendering API data into the DOM as markup, sanitize it to protect yourself from any malicious code that might get sent back.
//

/* ==========  variables  ========== */

const app = document.querySelector('#app');
const numberArticles = 2;
let endpoint;
const apiKey = `MzjNjEmTGPTcAbKdbZonokosBAmd42Xd`;
const topics = ['Technology', 'Books'];
let promises = [];

/* ==========  functions  ========== */

/**
 * Creates APIendpoint based on option selected
 * @param  {string} category 	Value from event target selected
 * @return {string}						Completed API endpoint
 */
function createEndpoint(topic) {
	endpoint = `https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=`;
	return endpoint;
}

/**
 * Converts response from an API to a JSON object
 * @param  {string} response 	Unprocessed response from request
 * @return {object} 					Response converted to JSON or rejected promise
 */
function convertJSON(response) {
	return response.ok ? response.json() : Promise.reject(response);
}

/**
 * Reduce number of articles show to desired number
 * @param  {array} array of articles from fetch request
 * @return {array}          Sliced array to desired length
 */
function selectArticles(articles) {
	return articles.slice(0, numberArticles);
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
 * Renders articles into DOM
 * @param  {string}	element		The element into articles will be inserted
 * @param  {array} 	articles 	The articles to render from selectArticles
 * @param  {string}	articles 	The topic from topics array
 * @return {string} 					Articles 'mapped' out from array into HTML format
 */
function render(element, articles, topic) {
	element.innerHTML += `<h2>Here's ${sanitizeHTML(
		numberArticles
	)} articles on ${sanitizeHTML(topic)}</h2>
		${articles.results
			.slice(0, numberArticles)
			.map(function (article) {
				return `
			<article>
			<h3><a href="${sanitizeHTML(
				article.url
			)}">${sanitizeHTML(article.title)}</a></h3>
			<i>Published on ${sanitizeHTML(article.published_date.slice(0, 10))}</i>
			<p>${sanitizeHTML(article.abstract)}
			<br><b>${sanitizeHTML(article.byline)}</b></p>
			</article>`;
			})
			.join('')}`;
}

/**
 * Catch and present error if fetch request is not 'OK'
 */
function catchError(error) {
	app.innerHTML = `
		<p>I'm sorry we can't retrieve any suggestions at the moment.<br>
		<a href="https://www.nytimes.com">The New York Times</a> has some good ideas though</p>`;
}

/**
 * Run a fetch request, convert to JSON, and display on page
 * @param {string} Address of API being 'fetched'
 */
// function fetchStories(topic) {
// 	createEndpoint(topic);
// 	fetch(endpoint + apiKey)
// 		.then(convertJSON) // fetched object (as)
// 		.then((data) => {
// 			selectArticles(data.results); // JSON object.array[objects]
// 			render(app, data, topic); // element, array[objects], topic
// 		})
// 		.catch(catchError);
// }

function createPromises(topics) {
	topics.forEach(function (topic) {
		createEndpoint(topic);
		const promise = fetch(endpoint + apiKey);
		convertJSON(promise)
		promises.push(promise);
	});
}

// /* ==========  execution  ========== */

createPromises(topics);
Promise.all(promises) //
	// .then(
	// 	promises.forEach(function (promise) {
	// 		convertJSON(response)//
	// 		.then((data) => {
	// 			selectArticles(data.results);
	// 			render(app, data);
	// 		});
	// 	})
	// );
