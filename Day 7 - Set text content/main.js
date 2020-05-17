const text = document.querySelector('#text');
const characterCount = document.querySelector('#character-count');

// Alternative without anonymous function

function characterCounter(element) {
  element.textContent = text.value.length;
}

text.addEventListener('input', characterCounter(null, characterCount));
