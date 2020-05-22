/* ----------  variables  ---------- */

const inputArea = document.querySelector('#text');
const announce = document.querySelector('#announce');

/* ----------  functions  ---------- */

function updateContents() {
	function handleCharCount() {
		return inputArea.value.length;
	}

	function handleWordCount() {
		const wordCount = inputArea.value
			.split(/[\n\r\s]+/g) //
			.filter(function (wordCount) {
				return wordCount.length > 0;
			});
		return wordCount.length;
	}

	function updateContent() {
		announce.textContent = `
	You've written ${handleWordCount()} word and ${handleCharCount()} characters.
	`;
	}

	updateContent();
}

/* ----------  execution  ---------- */

inputArea.addEventListener('input', updateContents);
