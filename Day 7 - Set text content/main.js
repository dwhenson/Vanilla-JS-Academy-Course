const text = document.querySelector('#text');
const characterCount = document.querySelector('#character-count');

text.addEventListener('input', () => {
  characterCount.textContent = text.value.length;
});
