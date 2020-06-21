// GOAL Create a DOM manipulation library with public methods you can use to…

// Get the first and last matching items from the DOM.

const $ = (function () {
  /**
   * Converts a node list to an array
   * @param  {object} nodeList The node list to be converted
   * @return {object}          The converted node list as an array
   */
  function convert(nodeList) {
    return Array.from(nodeList);
  }

  const Constructor = function (array, toggle) {
    this.array = array;
    this.toggle = toggle;
  };

  Constructor.prototype.getArray = function (element = 'element') {
    const elements = convert(document.querySelectorAll(this.array[element]));
    console.log(elements);
  };

  Constructor.prototype.toggleClass = function (
    element = 'element',
    className
  ) {
    const elements = convert(document.querySelectorAll(this.array[element]));
    console.log(elements);
    elements.forEach((item) => {
      item.classList.toggle(this.toggle[className]);
    });
  };

  return Constructor;
})();

/* ==========  Testing  ========== */

const buttons = new $(
  {
    element: 'button',
  },
  {
    purple: 'btn-purple',
    blue: 'btn-blue',
  }
);
const listItems = new $(
  {
    element: 'li',
  },
  {
    red: 'text-red',
  }
);

console.log(buttons, listItems);
