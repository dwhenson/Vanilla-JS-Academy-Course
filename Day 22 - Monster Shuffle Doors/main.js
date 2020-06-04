/* ==========  Variables  ========== */

const app = document.querySelector('#app');

const monsters = [
	{
		src: 'monster1',
		class: 'monster',
		alt: 'A yellow monster with one eye and a curly nose and tail.',
	},
	{
		src: 'monster2',
		class: 'monster',
		alt: 'A yellow monster with one eye, and spindly arms and legs.',
	},
	{
		src: 'monster3',
		class: 'monster',
		alt: 'A green monster with wavy arms, and sharp teeth down its body.',
	},
	{
		src: 'monster4',
		class: 'monster',
		alt: 'A red monster with two horns, four arms, and a glum expression.',
	},
	{
		src: 'monster5',
		class: 'monster',
		alt: 'A green monster with one eye, a glum expression, and a round body.',
	},
	{
		src: 'monster6',
		class: 'monster',
		alt:
			'A green monster, with one eye and a triangular body, doing a handstand.',
	},
	{
		src: 'monster7',
		class: 'monster',
		alt: 'A purple monster with one eye and two tentacles.',
	},
	{
		src: 'monster8',
		class: 'monster',
		alt:
			'A purple monster with an egg-shaped body, and an indifferent expression.',
	},
	{
		src: 'monster9',
		class: 'monster',
		alt: 'A blue, insect-like monster with three legs, and four wings.',
	},
	{
		src: 'monster10',
		class: 'monster',
		alt: 'A blue, blob-shaped monster with two eyes, two legs, and no arms.',
	},
	{
		src: 'monster11',
		class: 'monster',
		alt: 'A black monster with a yeti-like body and a big smile.',
	},
	{ src: 'sock', class: 'sock', alt: 'A pair of socks.' },
];

/* ==========  Functions  ========== */

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
const shuffle = function (array) {
	let currentIndex = array.length;
	let temporaryValue;
	let randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};

/**
 * Shuffle an array and return re-ordered contents to the DOM
 * @param  {object} array   Array of items to be shuffled
 * @param  {string} element Element where shuffled items will be returned
 * @return {string}         HTML string to be inserted into DOM
 */
function shuffleArray(array, element) {
	const suffledArray = shuffle(array.slice());
	element.innerHTML += suffledArray
		.map(function (item) {
			return ` 
	 	 	<div class="grid" >
	 	 		<img class="door" src="images/door.svg" tabindex="0">
	 	 		<img class="${item.class}" src="images/${item.src}.svg" alt="${item.alt}">
	 	 		</div>
	 `;
		})
		.join('');
}

function removeImage(event) {
	if (event.target.className === 'door') {
		event.target.remove();
	}
}

function checkSock(event) {
	if (event.target.nextElementSibling.className === 'sock') {
		alert('Sorry - you got socked. Click OK to play again.');
		window.location.reload();
	}
}

/* ==========  Execution  ========== */

shuffleArray(monsters, app);

app.addEventListener('click', (event) => {
	checkSock(event);
	removeImage(event);
});

app.addEventListener('keydown', (event) => {
	if (event.code === 'Enter' || event.code === 'Space') {
		checkSock(event);
		removeImage(event);
	}
});
