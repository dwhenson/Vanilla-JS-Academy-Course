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
