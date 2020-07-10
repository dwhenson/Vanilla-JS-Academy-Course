// avoid global scope
(function () {
  /* ==========  Variables  ========== */

  const submit = document.querySelector('button');
  const prefix = 'form-data';

  /* ==========  Functions  ========== */

  function getID(field) {
    // if input has an id use that
    if (field.id.length > 0) {
      return field.id;
    }
    // else if it has a name use that
    if (field.name.length > 0) {
      return field.name;
    }
    // otherwise return
    return null;
  }

  function inputHandler(event) {
    // check if target is in the form
    if (!event.target.closest === '#save-me') return;
    // create an id for the input
    const id = getID(event.target);
    if (!id) return;

    // if the object exists retrieve, if not create
    let saved = localStorage.getItem(prefix);
    saved = saved ? JSON.parse(saved) : {};

    // if event target is a checkbox set id as on/off in localStorage
    if (event.target.type === 'checkbox') {
      saved[id] = event.target.checked ? 'on' : 'off';
    } else {
      // otherwise set id and input.value as key:value pair on object
      saved[id] = event.target.value;
    }
    localStorage.setItem(prefix, JSON.stringify(saved));
  }

  function loadData() {
    // get local storage and save in variable
    let saved = localStorage.getItem(prefix);
    // if there is none return
    if (!saved) return;
    // convert local storage as an object
    saved = JSON.parse(saved);

    // get an array of fields from the form
    const fields = Array.from(
      document.querySelectorAll('input, textarea, select')
    );

    // loop through each input and load relevant data from local storage
    fields.forEach(function (field) {
      // set id as the field id name
      const id = getID(field);
      // if field has no usable id return
      if (!id) return;
      // if field has no data in local storage return
      if (!saved[id]) return;

      // if checkbox set checked attribute as true/false based on localStorage
      if (field.type === 'checkbox') {
        field.checked = saved[id] === 'on' ? true : false;
        // if radio button, if saved[id] is field.value, and set checked true
      } else if (field.type === 'radio') {
        field.checked = saved[id] === field.value ? true : false;
      } else {
        // otherwise set the field value to the saved data in local storage
        field.value = saved[id];
      }
    });
  }

  function clickHandler() {
    localStorage.removeItem(prefix);
  }

  /* ==========  Inits and Event Listeners  ========== */

  loadData();

  document.addEventListener('input', inputHandler);
  submit.addEventListener('click', clickHandler);
})();
