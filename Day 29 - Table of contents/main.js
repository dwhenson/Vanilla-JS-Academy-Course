/* ==========  Variables  ========== */

const toc = document.querySelector('#table-of-contents');
const headings = document.querySelectorAll('h2');

/* ==========  Functions  ========== */

function createToc(element, list) {
  const array = Array.from(list);
  element.innerHTML = `<ol>
  ${array
    .map(function (item) {
      return `<li><a href="#${item.id}">${item.textContent}</a></li>`;
    })
    .join('')}
  </ol>`;
}

/* ==========  Execution  ========== */

createToc(toc, headings);
