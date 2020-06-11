/* ==========  Variables  ========== */

const toc = document.querySelector('#table-of-contents');
const headings = Array.from(document.querySelectorAll('h2'));

/* ==========  Functions  ========== */

/**
 * Checks if element has an id and creates one if not
 * @param  {string} element Element to check
 * @return {string}         Element with updated id
 */
function createId(element) {
  if (!element.id) {
    element.setAttribute('id', `${element.textContent.replace(new RegExp(/[^a-z0-9]+/, 'ig'), '-').toLowerCase()}`);
  }
}

/**
 * Creates a list of items from an array
 * @param  {string} element Element into which list will be inserted
 * @param  {array} array   Array of items that will form the list
 */
function createToc(element, array) {
  const tocHTML = array
    .map(function (item) {
      createId(item)
      return `<li><a href="#${item.id}">${item.textContent}</a></li>`;
    })
    .join('');
  element.innerHTML = `<ol>${tocHTML}</ol?`;
}

/* ==========  Execution  ========== */

createToc(toc, headings);
