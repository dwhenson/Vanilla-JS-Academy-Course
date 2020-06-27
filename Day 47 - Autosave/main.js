
// TODO 
// change button event to submit
// check values exist before action
// Make less destructive:
// localstorage.clear() - replace with remove? (prefix to form variables?)

// Avoid global scope
(function () {
  /* ==========  Variables  ========== */

  const form = document.querySelector('#save-me');
  const submit = document.querySelector('button');
  // const storagePrefix = 'form-autosave_'

  /* ==========  Functions  ========== */

  function setStorage(event) {
    if (!event.target.name) return
    localStorage.setItem(event.target.name, event.target.value);
  }

  function getStorage() {
    const storage = Object.entries(localStorage);
    for (const userData of storage) {
      const input = document.querySelector(`#${userData[0]}`);
      input.value = localStorage.getItem(userData[0]);
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
