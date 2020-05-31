// Before rendering API data into the DOM as markup, sanitize it to protect yourself from any malicious code that might get sent back.
// 


/* ==========  variables  ========== */

const app = document.querySelector('#app');
const numberArticles = 2;
let endpoint;
const apiKey = `MzjNjEmTGPTcAbKdbZonokosBAmd42Xd`;
const topics = ['technology', 'books', 'food', 'science'];

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

// TODO add sanitizer function here??

/**
 * Renders articles into DOM
 * @param  {string}	element		The element into articles will be inserted
 * @param  {array} 	articles 	The articles to render from selectArticles
 * @param  {string}	articles 	The topic from topics array 
 * @return {string} 					Articles 'mapped' out from array into HTML format
 */
function render(element, articles, topic) {
	element.innerHTML += 
		`<h2>Here's ${numberArticles} articles on ${topic}</h2>
		${articles.results
			.slice(0, numberArticles)
			.map(function (article) {
				return `
			<article>
			<h3><a href="${article.url}">${article.title}</a></h3>
			<i>Published on ${article.published_date.slice(0, 10)}</i>
			<p>${article.abstract}
			<br><b>${article.byline}</b></p>
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
function fetchStories(topic) {
	createEndpoint(topic);
	fetch(endpoint + apiKey)
		.then(convertJSON) // fetched object (as)
		.then((data) => { 
			selectArticles(data.results); // JSON object.array[objects]
			render(app, data, topic); // element, array[objects], topic
		})
		.catch(catchError);
}

// /* ==========  execution  ========== */

topics.forEach(function (topic) {
	fetchStories(topic);
});
