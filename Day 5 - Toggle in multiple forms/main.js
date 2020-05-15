document.addEventListener('click', (event) => {
  // check if the clicked element a checkbox
  if (event.target.matches('[type="checkbox"]')) {
    // get the 'form' element checkbox is located within
    const form = event.target.closest('form');
    // get all the input elements with the name 'password'; turn into array
    // NB html edited to adjust name attr to just 'password'
    const passwordInputs = [...form.querySelectorAll('[name="password"]')];
    // loop over array of password inputs and change 'type' attr as needed
    console.log(passwordInputs);
    passwordInputs.forEach((input) => {
      event.target.checked ? (input.type = 'text') : (input.type = 'password');
    });
  }
});

