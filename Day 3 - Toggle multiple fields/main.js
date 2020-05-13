const passwordInput = Array.from(
  document.querySelectorAll('[type="password"]'));
const checkbox = document.querySelector('#show-passwords');

function toggleVisability() {
  passwordInput.forEach((input) => {
    checkbox.checked ? (input.type = 'text') : (input.type = 'password');
  });
}

checkbox.addEventListener('change', toggleVisability);
