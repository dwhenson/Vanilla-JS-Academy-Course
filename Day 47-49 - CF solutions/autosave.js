//
// Variables
//

const storagePrefix = 'form-autosave_';

//
// Methods
//

/**
 * Get an ID for a field
 * @param  {Node}   field The field
 * @return {String}       The ID
 */
const getID = function (field) {
  if (field.id.length > 0) {
    return field.id;
  }

  if (field.name.length > 0) {
    return field.name;
  }

  return null;
};

/**
 * Load saved form data from localStorage
 */
const loadData = function () {
  // Get all of the form fields
  const fields = document.querySelectorAll('#save-me input, #save-me textarea');
  // Loop through each field and load any saved data in localStorage
  Array.prototype.slice.call(fields).forEach(function (field) {
    // If the field has no usable ID, skip it
    const id = getID(field);
    console.log(id);
    if (!id) return;

    // If there's no saved value in localStorage, skip it
    const saved = localStorage.getItem(storagePrefix + id);
    if (!saved) return;

    // Set the field value to the saved data in localStorage
    field.value = saved;
  });
};

/**
 * Delete saved data from localStorage
 */
const clearData = function () {
  // Get all of the form fields
  const fields = document.querySelectorAll('#save-me input, #save-me textarea');

  // Loop through each field and load any saved data in localStorage
  Array.prototype.slice.call(fields).forEach(function (field) {
    // If the field has no usable ID, skip it
    const id = getID(field);
    if (!id) return;

    // Remove the item from localStorage
    localStorage.removeItem(storagePrefix + id);
  });
};

/**
 * Handle input events
 * @param  {Event} event The event object
 */
const inputHandler = function (event) {
  // Only run for fields in the #save-me form
  if (!event.target.closest('#save-me')) return;

  // Get an ID for the field
  const id = getID(event.target);
  if (!id) return;

  // Save the field to localStorage
  localStorage.setItem(storagePrefix + id, event.target.value);
};

/**
 * Handle submit events
 * @param  {Event} event The event object
 */
const submitHandler = function (event) {
  // Only run for the #save-me form
  if (event.target.id !== 'save-me') return;

  // Clear saved data
  clearData();
};

//
// Inits & Event Listeners
//

// Load saved data from storage
loadData();

// Listen for input events
document.addEventListener('input', inputHandler, false);

// Listen for submit events
document.addEventListener('submit', submitHandler, false);
