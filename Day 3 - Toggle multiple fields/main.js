const passwordFields = document.querySelectorAll('[type="password"]');
const checkbox = document.querySelector('#show-passwords');

function toggleVisability() {
  passwordFields.forEach((element) => {
    checkbox.checked ? (element.type = 'text') : (element.type = 'password');
  });
}

checkbox.addEventListener('change', toggleVisability);
