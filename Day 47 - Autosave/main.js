// GOAL As the user types, the value of a form field should automatically be saved.
// When the page is reloaded or opened back up, the form should be repopulated with the user’s saved data.
// If the form is submitted, clear the data from storage and wipe the form.
//

// TODO
// Clear data on submit
// Convert for loop to for of loop or something?
// add in email verification in HTML?

// Avoid global scope
(function () {
  /* ==========  Variables  ========== */

  const form = document.querySelector('#save-me');
  const submit = document.querySelector('button')

  /* ==========  Functions  ========== */

  function setStorage(event) {
    localStorage.setItem(event.target.name, event.target.value);
  }

  function getStorage() {
    for (var i = 0; i < localStorage.length; i++) {
      const content = document.querySelector(`#${localStorage.key(i)}`);
      content.value = localStorage.getItem(localStorage.key(i));
    }
  }

  function removeStorage () {
    localStorage.clear();
  }

  /* ==========  Event listeners and inits  ========== */

  form.addEventListener('input', setStorage);
  window.addEventListener('load', getStorage);
  submit.addEventListener('click', removeStorage);
})();
