const inputArea = document.querySelector('#text');
const numberChars = document.querySelector('#character-count');
const numberWords = document.querySelector('#word-count');

function handleCharCount(element) {
  element.textContent = inputArea.value.length;
}

// split on space
// filter if great than 0
// return length to element.textContent

function handleWordCount(element) {
  const wordArray = inputArea.value.split(' ').filter(function (word) {
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
