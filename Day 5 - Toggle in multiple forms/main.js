function toggglePassword(passwordInput) {
  passwordInput.checked
    ? (passwordInput.type = 'text')
    : (passwordInput.type = 'password');
}

function toggglePasswords (passwordInputs) {
  passwordInputs.forEach(toggglePassword);
}

document.addEventListener('click', (event) => {
  if (event.target.matches('[type="checkbox"]')) {
    const form = event.target.closest('form');
    const passwordInputs = Array.from(form.querySelectorAll('[type="password"]'));
    console.log(passwordInputs);
  }
});
