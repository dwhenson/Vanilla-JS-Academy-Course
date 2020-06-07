/* ==========  Variables  ========== */

const app = document.querySelector('#app');
let timesRun = 0;
const monsters = [
  {
    src: 'monster1',
    alt: 'A yellow monster with one eye and a curly nose and tail.',
  },
  {
    src: 'monster2',
    alt: 'A yellow monster with one eye, and spindly arms and legs.',
  },
  {
    src: 'monster3',
    alt: 'A green monster with wavy arms, and sharp teeth down its body.',
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
    alt: 'A green monster, with one eye,  a triangle body, doing a handstand.',
  },
  {
    src: 'monster7',
    alt: 'A purple monster with one eye and two tentacles.',
  },
  {
    src: 'monster8',
    alt:
      'A purple monster with an egg-shaped body, and an indifferent expression.',
  },
  {
    src: 'monster9',
    alt: 'A blue, insect-like monster with three legs, and four wings.',
  },
  {
    src: 'monster10',
    class: 'monster',
    alt: 'A blue, blob-shaped monster with two eyes, two legs, and no arms.',
  },
  {
    src: 'monster11',
    alt: 'A black monster with a yeti-like body and a big smile.',
  },
  { src: 'sock', alt: 'A pair of socks.' },
];

const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const enoughBtn = document.querySelector('.btn-enough');
const moreBtn = document.querySelector('.btn-more');
const result = document.querySelector('#result');

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
  const suffledArray = shuffle(array);
  element.innerHTML = suffledArray
    .map(function (item, index) {
      return ` 
      <div class="grid" aria-live="polite">
      <button data-monster-id="${index}">
        <img src="images/door.svg" alt="door, click to see what's inside">
      </button>
     </div>
   `;
    })
    .join('');
}

/**
 * Show the modal
 */
function showModal() {
  modal.style.display = 'block';
  modalContent.focus();
}

/**
 * Check if the result is causes a win or loose       
 * @param  {array} array The array of items being investigated
 * @param  {number} id   The index of the item in the array
 */
function checkResult(array, id) {
  // count the number of times function is run
  timesRun += 1;
  // if the item is the sock, and not the last item show loose modal
  if (array[id].src === 'sock' && timesRun < array.length) {
    result.innerHTML = `Sorry! You got socked!!`;
    showModal();
  // if the use manages to click all items in the array show won modal
  } else if (timesRun === array.length) {
    result.innerHTML = `Nice one. You did it!`;
    showModal();
  }
}

/**
 * Handle click events
 * @param  {object} event The event object
 * @param  {array}  array Array to select items from
 */
function clickHandler(event, selector, array) {
  // check if clicked element or parent has a specific attribute
  const parentElement = event.target.closest(`[${selector}]`);
  if (!parentElement) return;
  // if so, get the element's index passed in from an array
  const id = parentElement.getAttribute(selector);
  // replace the parent element's innerHTML with new image and attributes
  parentElement.parentNode.innerHTML = `<img src="images/${array[id].src}.svg" alt="${array[id].alt}" class="${array[id].class}">`;
  checkResult(array, id);
}

/**
 * Close the modal
 * @param {object} event The event from the listener
 */
function closeModal(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

/**
 * Removes event listener from the document
 * @param  {event} event The event object
 */
function enableRemoval(event) {
  clickHandler(event, 'data-monster-id', monsters);
}

/* ==========  Execution  ========== */

/* ----  App ---- */

// shuffle order in array
shuffleArray(monsters, app);

document.addEventListener('click', enableRemoval);

/* ----  Modal  ---- */

// reload page if want to continue playing
moreBtn.addEventListener('click', () => window.location.reload());

// close modal if button clicked, and stop future clicks
enoughBtn.addEventListener('click', () => {
  document.removeEventListener('click', enableRemoval);
  modal.style.display = 'none';
});

// close modal if click outside modal
document.addEventListener('click', closeModal);
