// GOAL
// create table of contents,
// if the heading doesn’t have an ID to link to
// create one and assign it to the heading.
// 
// STEPS
// for each item in array
// * array.forEach (item => function)
// check if ID exists
// * function (if id return, else)
// if no ID create attribute where ID is the title
// * item.setAttribute (id, ${item.textContent})
// insert in HTML
// * pass to createToc?

/* ==========  Variables  ========== */

const toc = document.querySelector('#table-of-contents');
const headings = Array.from(document.querySelectorAll('h2'));

/* ==========  Functions  ========== */

function createToc(element, array) {
  const tocHTML = array
    .map((item) => `<li><a href="#${item.id}">${item.textContent}</a></li>`)
    .join('');
  element.innerHTML = `<ol>${tocHTML}</ol?`;
}

/* ==========  Execution  ========== */

createToc(toc, headings);
