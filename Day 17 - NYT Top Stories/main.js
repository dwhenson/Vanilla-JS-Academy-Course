// Check API documentation for updating

/* ==========  variables  ========== */

const app = document.querySelector('#app');
const endpoint =
	'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=IVkW1nLsL3ufkeo8FjJrw6oXLUo7qZ62';

/* ==========  functions  ========== */

/**
 * converts response from an API to a JSON object
 * @param  {string} (response)	Unprocessed response from request
 * @return {object}           	Response converted to JSON or rejected promise
 */
function convertJSON(response) {
	return response.ok ? response.json() : Promise.reject(response);
}

/**
 * finds desired data on an array of objects, map to string and insert
 * @param  {object} (responseJSON)	response from fetch request in JSON form
 * @return {string} 								values 'mapped' out and inserted into HTML
 */
function displayStories(responseJSON) {
	const storyList = responseJSON.results
		.map(function (story) {
			return `
			<li><b><a href="${story.url}">${story.title}</a></b></li>
			<p>${story.abstract}<b>
			<br>${story.byline}</b><i>&nbsp(${story.published_date})</i></p>`;
		})
		.join('');
	app.innerHTML = `<ul>${storyList}</ul>`;
}

/**
 * catch and present error if fetch request is not 'OK'
 */
function catchError(error) {
	app.innerHTML = `
		<p>I'm sorry we can't retrieve any suggestions at the moment.<br>The New York Times has some good suggestions <a href="https://www.nytimes.com">here</a></p>`;
}

function fetchStories(APIendpoint) {
	fetch(APIendpoint)
		.then(convertJSON) //
		.then(displayStories)
		.catch(catchError);
}

/* ==========  execution  ========== */

fetchStories(endpoint);
