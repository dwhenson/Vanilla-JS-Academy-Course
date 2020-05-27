// Sort out error message - should array be global variable?
// Check API documentation for updating

/* ==========  variables  ========== */

const endpoint =
	'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=IVkW1nLsL3ufkeo8FjJrw6oXLUo7qZ62';
const app = document.querySelector('#app');

/* ==========  functions  ========== */

function convertJSON(response) {
	return response.ok ? response.json() : Promise.reject(response);
}

function displayStories(responseJSON) {
	const storyArray = responseJSON.results;
	app.innerHTML = storyArray
		.map(function (story) {
			return `<li><a href="${story.url}">${story.abstract}</a></li>`;
		})
		.join('');
}

// function displayStories(responseJSON) {
// 	let html = '';
// 	const storyArray = responseJSON.results;
// 	storyArray.forEach(function (story, index) {
// 		// CHECK why storyArray[index] and not story??
// 		// NOTE because storyArray[index] = story (not story[index])
// 		html += '<li>' + storyArray[index].abstract + '</li>';
// 	});
// 	app.innerHTML = '<ul>' + html + '</ul>';
// }

function catchError(error) {
	app.innerHTML = `<p>I'm sorry we can't retrieve any suggestions at the moment.<br>The New York Times has some good suggestions <a href="https://www.nytimes.com">here</a></p>`;
	console.log('Oh no!', error);
}

function fetchStories(APIendpoint) {
	fetch(APIendpoint)
		.then(convertJSON) //
		.then(displayStories)
		.catch(catchError);
}

/* ==========  execution  ========== */

fetchStories(endpoint);
