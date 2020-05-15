/*=================================
=            Variables            =
=================================*/

const passwordInput = Array.from(
  document.querySelectorAll('[type="password"]'));
const checkbox = document.querySelector('#show-passwords');

/*=================================
=            Functions            =
=================================*/

/**
 * toggle 'type' attribute of single password input field
 * @param  {element} password The input field
 */
function toggglePassword(input) {
  checkbox.checked ? (input.type = 'text') : (input.type = 'password');
}

/**
 * toggle visibility of all inputs fields in an array
 */
function togglePasswords() {
  passwordInput.forEach(toggglePassword);
}

/* =======================================
=            Event listeners            =
======================================= */

// toggle visibility of passwords by changing 'type' attr on 'change'
checkbox.addEventListener('change', togglePasswords);
