// function toggglePassword(passwordInput) {
//   passwordInput.checked
//     ? (passwordInput.type = 'text')
//     : (passwordInput.type = 'password');
// }

// function toggleVisability() {
//   passwordInput.forEach((input) => {
//     checkbox.checked ? (input.type = 'text') : (input.type = 'password');
//   });
// }

document.addEventListener('click', (event) => {
  if (event.target === ('[type="checkbox"]')) {
    const form = event.target.closest('form');
    const passwordInputs = [...form.querySelectorAll('[type="password"]')];
    passwordInputs.forEach((input) => {
      event.target.checked ? (input.type = 'text') : (input.type = 'password');
    });
  }
});
