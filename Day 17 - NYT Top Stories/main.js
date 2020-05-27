// It should get the top stories from the NYT website, and then display them on a webpage
// Steps:
// Set variables for APIendpoint, and app
// Fetch top stories from NYT - check return is array
// Store array in variable?
// Map over array adding li to each end (and ul overall)
// Update app innerHTML with new array created from map
// 

/* ==========  variables  ========== */

const endpoint = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=IVkW1nLsL3ufkeo8FjJrw6oXLUo7qZ62';
const app = document.querySelector('#app');


/* ==========  functions  ========== */

function convertJSON(response) {
	return response.ok ? response.json() : Promise.reject(response);
}

function displayStories (storyArray) {
	// TODO display in html
	console.log(storyArray); 
}

function catchError(error) {
	// TODO display in html 
	console.log('Ohhh no!', error);
}


function fetchStories (APIendpoint) {
	fetch(APIendpoint)
	.then(convertJSON)
	.then(displayStories)
	.catch(catchError)
}

/* ==========  execution  ========== */

fetchStories(endpoint)