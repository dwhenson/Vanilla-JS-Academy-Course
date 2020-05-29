// Get articles from categories, then render the top three from API data into markup and inject it into the #app
//
// add a delegate event listener to option elements, on change? get event.target.value - how to store/extract - set as variable?
// insert event.target.value into place holder APIend point, and call fetch based on this updated value (endpoint, 'category', and APIkey)
// get returned array and trim so that only the first top five stories are presented (.array(slice)
// map sliced array to generate html and present in app.inner html - include a heading before each section showing which section they are from
//
//

/* ==========  variables  ========== */

const dropdown = document.querySelector('#topics');
const app = document.querySelector('#app');
const placeholder = document.querySelector('#placeholder');
const heading = document.querySelector('#heading');
const apiKey = `MzjNjEmTGPTcAbKdbZonokosBAmd42Xd`;
let endpoint = '';

/* ==========  functions  ========== */

function createEndpoint(category) {
	endpoint = `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=`;
	return endpoint;
}

function generatePlaceholder() {
	placeholder.textContent = `One moment please...loading your articles`;
}

function generateHeading (category) {
	heading.innerHTML = `Top Five Articles About ${category}`
}


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
	element.innerHTML = articles.results
		.slice(0, 5)
		.map(function (article) {
			return `
			<article>
			<h3><a href="${article.url}">${article.title}</a></h3>
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
		<p>I'm sorry we can't retrieve any suggestions at the moment.<br><a href="https://www.nytimes.com">The New York Times has some good ideas though</a></p>`;
}

/**
 * Run a fetch request, convert to JSON, and display on page
 * @param {string} Address of API being 'fetched'
 */
function fetchStories(APIendpoint) {
	fetch(APIendpoint + apiKey)
		.then(convertJSON) //
		.then((data) => {
			render(app, data);
		})
		.catch(catchError);
}

/* ==========  execution  ========== */

dropdown.addEventListener('change', (event) => {
	generatePlaceholder();
	createEndpoint(event.target.value);
	generateHeading(event.target.value)
	fetchStories(endpoint);
});
