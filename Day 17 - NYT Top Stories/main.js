/* ==========  variables  ========== */

const app = document.querySelector('#app');
const endpoint =
	'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=';
const apiKey = 'IVkW1nLsL3ufkeo8FjJrw6oXLUo7qZ62';

/* ==========  functions  ========== */

/**
 * Converts response from an API to a JSON object
 * @param  {string} Response 	Unprocessed response from request
 * @return {object} 					Response converted to JSON or rejected promise
 */
function convertJSON(response) {
	return response.ok ? response.json() : Promise.reject(response);
}

/**
 * Renders articles into DOM
 * @param  {string}	element		The element into articles will be inserted
 * @param  {array} 	articles 	The articles to render
 * @return {string} 					Articles 'mapped' out from array into HTML format
 */
function render(element, articles) {
	element.innerHTML = articles
		.map(function (article) {
			return `
			<article>
			<h2><a href="${article.url}">${article.title}</a></h2>
			<p>${article.abstract}<b>
			<br>${article.byline}</b><i>&nbsp(${article.published_date})</i></p>
			</article>`;
		})
		.join('');
}

/**
 * Catch and present error if fetch request is not 'OK'
 */
function catchError(error) {
	app.innerHTML = `
		<p>I'm sorry we can't retrieve any suggestions at the moment.<br>The New York Times has some good suggestions <a href="https://www.nytimes.com">here</a></p>`;
}

/**
 * Run a fetch request, convert to JSON, and display on page
 * @param {string} Address of API being 'fetched'
 */
function fetchStories(APIendpoint) {
	fetch(APIendpoint + apiKey)
		.then(convertJSON) //
		.then((data) => {
			render(app, data.results);
		})
		.catch(catchError);
}

/* ==========  execution  ========== */

fetchStories(endpoint);
