console.log('It works!!!');
/* ----------  variables  ---------- */

const inputArea = document.querySelector('#text');
const numberChars = document.querySelector('#character-count');
const numberWords = document.querySelector('#word-count');
const announce = document.querySelector('#announce');

/* ----------  functions  ---------- */

function handleCharCount(element) {
	element.textContent = inputArea.value.length;
}

function handleWordCount(element) {
	const words = inputArea.value
		.split(/[\n\r\s]+/g) //
		.filter(function (word) {
			return word.length > 0;
		});
	element.textContent = words.length;
}

function announceValues(element) {
	setTimeout(function() {
		console.log(element.textContent);
	}, 5000)
}


/* ----------  execution  ---------- */

inputArea.addEventListener('input', () => {
	handleCharCount(numberChars);
	handleWordCount(numberWords);
	announceValues(announce);
});

// on input start a timer on typing the first character
// after five seconds
// announce the text content giving number of letters and words typed
// 
// while textarea state is focus
// log announce content after first input every 5 seconds
// on blur announce content immediately and clear interval
