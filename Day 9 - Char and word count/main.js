/* ----------  variables  ---------- */

const inputArea = document.querySelector('#text');
const numberChars = document.querySelector('#character-count');
const numberWords = document.querySelector('#word-count');

/* ----------  functions  ---------- */

function handleCharCount(element) {
  element.textContent = inputArea.value.length;
}

function handleWordCount(element) {
  const words = inputArea.value
  .split(/[\n\r\s]+/g)
  .filter(function (word) {
    return word.length > 0;
  });
  element.textContent = words.length;
}

/*----------  execution  ---------- */

inputArea.addEventListener('input', () => {
  handleCharCount(numberChars);
  handleWordCount(numberWords);
});

