const inputArea = document.querySelector('#text');
const numberChars = document.querySelector('#character-count');
const numberWords = document.querySelector('#word-count');
const seperators = (/[\s\n]+/);

function handleCharCount(element) {
  element.textContent = inputArea.value.length;
}

function handleWordCount(element) {
  const wordArray = inputArea.value.split(seperators).filter(function (word) {
    return word.length > 0;
  });
  element.textContent = wordArray.length;
}

inputArea.addEventListener('input', () => {
  handleCharCount(numberChars);
});
inputArea.addEventListener('input', () => {
  handleWordCount(numberWords);
});
