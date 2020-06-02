/* ==========  Variables  ========== */

const app = document.querySelector('#app');

// TODO convert to array of objects and include alt text
const monsters = [
	{
		src: 'monster1',
		alt: 'A yellow monster with one eye and a curly nose and tail.',
	},
	{
		src: 'monster2',
		alt:
			'A yellow monster with one eye, a peanut-shaped body, and spindly arms and legs.',
	},
	{
		src: 'monster3',
		alt:
			'A green monster with two eyes, wavy arms, and sharp teeth running down its body.',
	},
	{
		src: 'monster4',
		alt: 'A red monster with two horns, four arms, and a glum expression.',
	},
	{
		src: 'monster5',
		alt: 'A green monster with one eye, a glum expression, and a round body.',
	},
	{
		src: 'monster6',
		alt:
			'A green monster, with one eye and a triangular body, doing a handstand.',
	},
	{ src: 'monster7', alt: 'A purple monster with one eye and two tentacles.' },
	{
		src: 'monster8',
		alt:
			'A purple monster with an egg-shaped body, two horns, and an indifferent expression.',
	},
	{
		src: 'monster9',
		alt:
			'A blue, insect-like monster with two eyes, two arms, three legs, and four wings.',
	},
	{
		src: 'monster10',
		alt: 'A blue, blob-shaped monster with two eyes, two legs, and no arms.',
	},
	{
		src: 'monster11',
		alt: 'A black monster with a yeti-like body and a big smile.',
	},
	{ src: 'sock', alt: 'A pair of socks.' },
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
	while (0 !== currentIndex) {
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
	 	 	<div class="grid"><img src="images/${item.src}.svg" alt="${item.alt}"></div>
	 `;
		})
		.join('');
}

/* ==========  Execution  ========== */

shuffleArray(monsters, app);
