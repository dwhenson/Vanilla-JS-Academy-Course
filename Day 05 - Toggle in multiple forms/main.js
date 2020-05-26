document.addEventListener('click', (event) => {
  // check if the clicked element a checkbox
  if (event.target.matches('[type="checkbox"]')) {
    // get the 'form' element checkbox is located within
    const form = event.target.closest('form');
    // get all the input elements with the name 'password'; turn into array
    // NB html edited to adjust name attr to just 'password'
    const passwordInputs = [...form.querySelectorAll('[name="password"]')];
    // loop over array of password inputs and change 'type' attr as needed
    passwordInputs.forEach((input) => {
      event.target.checked ? (input.type = 'text') : (input.type = 'password');
    });
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.matches('[data-pw-toggle]')) return;
  // create an array from node list
  const passwords = Array.from(
    // select all elements based on the attr values returned from QSA
    document.querySelectorAll(
      // get attr values from event target
      // NB must attr values must match those on elements to be selected
      event.target.getAttribute('[data-pw-toggle]'),
    ),
  );
  passwords.forEach((password) => {
    event.target.checked
      ? (password.type = 'text')
      : (password.type = 'password');
  });
});
