// Avoid global scope
(function () {
  /* ==========  Variables  ========== */

  const form = document.querySelector('#save-me');
  const submit = document.querySelector('button');

  /* ==========  Functions  ========== */

  /**
   * Sets the value of the input fields in local storage
   */
  function setStorage() {
    localStorage.setItem(event.target.name, event.target.value);
  }

  /**
   * Gets the values from local storage and returns them to the form
   * @return {string} The values the user entered originally
   */
  function getStorage() {
    const storage = Object.entries(localStorage);
    for (const userData of storage) {
      const input = document.querySelector(`#${userData[0]}`);
      input.value = localStorage.getItem(userData[0]);
    }
  }

  /**
   * Removes all values from local storage
   */
  function removeStorage() {
    localStorage.clear();
  }

  /* ==========  Event listeners and inits  ========== */

  form.addEventListener('input', setStorage);
  window.addEventListener('load', getStorage);
  submit.addEventListener('click', removeStorage);
})();
