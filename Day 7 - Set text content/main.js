const text = document.querySelector('#text');
const characterCount = document.querySelector('#character-count');

text.addEventListener('input', () => {
  characterCount.textContent = text.value.length;
});

// Alternative without anonymous function

function characterCounter(element) {
  element.textContent = text.value.length;
}

text.addEventListener('input', characterCounter(characterCount));
