const inputArea = document.querySelector('#text');
const numberChars = document.querySelector('#character-count');
const numberWords = document.querySelector('#word-count');

function handleCharCount(element) {
  element.textContent = inputArea.value.length;
}

function handleWordCount(element) {
  element.textContent = inputArea.value.split(' ').length;
}

inputArea.addEventListener('input', handleCharCount.bind(null, numberChars));
inputArea.addEventListener('input', handleWordCount.bind(null, numberWords));
