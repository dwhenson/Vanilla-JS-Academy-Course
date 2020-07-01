// Avoid global scope
(function () {
  /* ==========  Variables  ========== */

  const form = document.querySelector('#save-me');
  const storageID = 'form-autosave_';

  /* ==========  Functions  ========== */

  /**
   * Sets and adds user added data to object in localStorage as a string
   * @param {event} event The event object
   */
  function setStorage(event) {
    let formData = localStorage.getItem(storageID);
    formData = formData ? JSON.parse(formData) : {};
    // if the event.target is a checkbox set the 'checked' attribute
    if (event.target.getAttribute('type') === 'checkbox') {
      formData[storageID + event.target.id] = 'checked';
      // if a radio check if already stored, if so delete and store new value
    } else if (event.target.getAttribute('type') === 'radio') {
      if (
        localStorage.getItem(formData[storageID + event.target.id]) !== null
      ) {
        localStorage.removeItem(storageID + event.target.id);
      } else {
        formData[storageID + event.target.id] = event.target.value;
      }
      // otherwise it's an input, so store the value
    } else {
      formData[storageID + event.target.id] = event.target.value;
    }
    localStorage.setItem(storageID, JSON.stringify(formData));
  }

  /**
   * Gets the stored data string from localStorage, converts to object then array
   * Then loops though items, selects html element and adds value
   */

  function getStorage() {
    let formData = localStorage.getItem(storageID);
    if (!formData) return;
    // get the string convert it to an object, then an array
    formData = JSON.parse(localStorage.getItem(storageID));
    const storage = Object.entries(formData);
    // iterate over array, and get element based on id name
    storage.forEach((userData) => {
      const selector = document.querySelector(
        `#${userData[0].split('_').pop()}`
      );
      // if a radio or checkbox set the checked attribute
      if (
        selector.getAttribute('type') === 'checkbox' ||
        selector.getAttribute('type') === 'radio'
      ) {
        selector.setAttribute('checked', 'checked');
      // otherwise set the input value
      } else {
        selector.value = userData[1];
      }
    });
  }

  /**
   * Removes the data stored in the object from localStorage
   */
  function removeStorage(event) {
    if (event.target.id !== 'save-me') return;
    localStorage.removeItem(storageID);
  }

  /* ==========  Event listeners and inits  ========== */

  getStorage();
  form.addEventListener('input', setStorage);
  form.addEventListener('submit', removeStorage);
})();
