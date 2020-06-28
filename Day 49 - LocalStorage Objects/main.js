// Avoid global scope
(function () {
  /* ==========  Variables  ========== */

  const form = document.querySelector('#save-me');
  const submit = document.querySelector('button');
  const prefix = 'form-autosave_';
  const formData = {};

  /* ==========  Functions  ========== */

/**
 * Sets and adds user added data to object in localStorage as a string
 * @param {event} event The event object
 */ 
  function setStorage(event) {
    if (!event.target.name) return;
    formData[prefix + event.target.name] = event.target.value;
    localStorage.setItem('formData', JSON.stringify(formData));
  }

/**
 * Gets the stored data string from localStorage, converts to object then array
 * Then loops though items, selects html element and adds value
 */
  function getStorage() {
    if (!localStorage.formData) return;
    const storedObject = JSON.parse(localStorage.getItem('formData'));
    const storage = Object.entries(storedObject);
    for (const userData of storage) {
      const selector = userData[0].split('_').pop();
      const input = document.querySelector(`#${selector}`);
      input.value = userData[1];
    }
  }

/**
 * Removes the data stored in the object from localStorage
 */
  function removeStorage() {
    if (!localStorage.formData) return;
    localStorage.removeItem('formData');
  }

  /* ==========  Event listeners and inits  ========== */

  form.addEventListener('input', setStorage);
  window.addEventListener('load', getStorage);
  submit.addEventListener('click', removeStorage);
})();
