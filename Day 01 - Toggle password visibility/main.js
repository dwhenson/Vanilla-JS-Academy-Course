const checkbox = document.querySelector('[type="checkbox"]');
const attributeToChange = document.querySelector('[type="password"]');

function showHidePassword(element) {
  if (element) {
    checkbox.checked ? (element.type = 'text') : (element.type = 'password');
    // correct solution but better to link changes to checkbox state
    // element.getAttribute('type') === 'password'
    //   ? element.setAttribute('type', 'text')
    //   : element.setAttribute('type', 'password');
  }
}

checkbox.addEventListener('change', () => {
  showHidePassword(attributeToChange);
});
