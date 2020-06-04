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

const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content')
const enoughBtn = document.querySelector('.btn-enough');
const moreBtn = document.querySelector('.btn-more');

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

/**
 * Remove the image selected as event target
 * @param  {string} event The event from the listener
 */
function removeImage(event) {
	if (event.target.className === 'door') {
		event.target.remove();
	}
}

/**
 * Show the modal
 */
function showModal() {
	modal.style.display = 'block';
	modalContent.focus();
}

/**
 * Check if removeImage reveals a specific image underneath
 * @param  {string} event The event from the listener
 * @return {function}     A function to reload the page
 */
function checkSock(event, selector) {
	if (event.target.nextElementSibling.className === selector) {
		event.target.remove();
		showModal();
	}
}

/**
 * Close the modal when selected events happed
 * @param  {string} event The event from the listener
 */
function closeModal(event) {
	if (event.target === modal) {
		modal.style.display = 'none';
	}
}

/* ==========  Execution  ========== */

/* ----  Main ---- */

// shuffle order in array
shuffleArray(monsters, app);

// listen for selection and run functions
app.addEventListener('click', (event) => {
	checkSock(event, 'sock'); // run first as traversing DOM based on event
	removeImage(event);
});

app.addEventListener('keydown', (event) => {
	if (event.code === 'Enter' || event.code === 'Space') {
		checkSock(event, 'sock');
		removeImage(event);
	}
});

/* ----  Modal  ---- */

// reload page if want to continue playing
moreBtn.addEventListener('click', () => window.location.reload());

moreBtn.addEventListener('keydown', (event) => {
	if (event.code === 'Enter' || event.code === 'Space') {
		window.location.reload();
	}
});

// close modal if button clicked
enoughBtn.addEventListener('click', () => {
	modal.style.display = 'none';
});

enoughBtn.addEventListener('keydown', (event) => {
	if (event.code === 'Enter' || event.code === 'Space') {
		modal.style.display = 'none';
	}
});

// close modal if click outside modal
document.addEventListener('click', closeModal);
