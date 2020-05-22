/* ----------  variables  ---------- */

const inputArea = document.querySelector('#text');
const numberChars = document.querySelector('#character-count');
const numberWords = document.querySelector('#word-count');
const announce = document.querySelector('#announce');

/* ----------  functions  ---------- */

function updateContents() {
	
	function handleCharCount() {
		numberChars.textContent = inputArea.value.length;
		return numberChars.textContent;
	};

	function handleWordCount() {
		const wordCount = inputArea.value
			.split(/[\n\r\s]+/g) //
			.filter(function (wordCount) {
				return wordCount.length > 0;
			});
		numberWords.textContent = wordCount.length;
		return numberWords.textContent;
	};

	function updateContent() {
		announce.innerHTML = `
	You've written ${handleWordCount()} word and ${handleCharCount()} characters.
	`;
	}

	updateContent();
}

/* ----------  execution  ---------- */

inputArea.addEventListener('input', updateContents);
