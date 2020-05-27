// It should get the top stories from the NYT website, and then display them on a webpage
// Steps:
// Set variables for APIendpoint, and app  - DONE
// Fetch top stories from NYT - check return is array - DONE
// Store array in variable - parameter, sufficient?
// Map over array extracting abstract and li to each end (and ul overall)
// Add links to each abstract li element
// Update app innerHTML with new array created from map
//
// Further work, e

/* ==========  variables  ========== */

const endpoint =
	'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=IVkW1nLsL3ufkeo8FjJrw6oXLUo7qZ62';
const app = document.querySelector('#app');

/* ==========  functions  ========== */

function convertJSON(response) {
	return response.ok ? response.json() : Promise.reject(response);
}

//

// function displayStories(responseJSON) {
// 	const storyArray = responseJSON.results;
// 	storyArray.forEach( function(element, index) {
// 		console.log(element[index].url);
// 	});
// 	// storyArray.map(function (story, index) {
// 	// 	return;
// 	// 	`
// 	// 	<li>
// 	// 	<a href="${storyArray[index].url}">
// 	// 	${storyArray[index].abstract}
// 	// 	</li>
// 	// 	`;
// 	// });
// 	// app.innerHTML = storyArray;
// }

function displayStories(responseJSON) {
	let html = '';
	const storyArray = responseJSON.results;
	storyArray.forEach(function (story, index) {
		html += '<li>' + storyArray[index].abstract + '</li>';
	});
	app.innerHTML = '<ul>' + html + '</ul>';
}

function catchError(error) {
	// TODO display in html
	console.log('Oh no!', error);
}

function fetchStories(APIendpoint) {
	fetch(APIendpoint).then(convertJSON).then(displayStories).catch(catchError);
}

/* ==========  execution  ========== */

fetchStories(endpoint);
