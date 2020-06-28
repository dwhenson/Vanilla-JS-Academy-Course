// Avoid global scope
(function () {
  /* ==========  Variables  ========== */

  const form = document.querySelector('#save-me');
  const submit = document.querySelector('button');
  const prefix = 'form-autosave_';

  /* ==========  Functions  ========== */

  function setStorage(event) {
    if (!event.target.name) return;
    localStorage.setItem(prefix + event.target.name, event.target.value);
  }

  function getStorage() {
    const storage = Object.entries(localStorage);
    for (const userData of storage) {
      const selector = userData[0].split('_').pop();
      const input = document.querySelector(`#${selector}`);
      input.value = localStorage.getItem(userData[0]);
    }
  }

  function removeStorage() {
    const storage = Object.entries(localStorage);
    for (const userData of storage) {
      const selector = userData[0].split('_').shift();
      if (`${selector}_` === prefix) {
        localStorage.removeItem(userData[0]);
      }
    }
  }

  /* ==========  Event listeners and inits  ========== */

  form.addEventListener('input', setStorage);
  window.addEventListener('load', getStorage);
  submit.addEventListener('click', removeStorage);
})();
