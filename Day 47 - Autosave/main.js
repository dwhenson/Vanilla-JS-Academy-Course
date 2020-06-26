// GOAL As the user types, the value of a form field should automatically be saved. 
// When the page is reloaded or opened back up, the form should be repopulated with the user’s saved data.
// If the form is submitted, clear the data from storage and wipe the form.
// 
// STEPS:
// Delegate event listener to form
// On change, get input value
// Save input value to local storage
// On submit clear all local storage