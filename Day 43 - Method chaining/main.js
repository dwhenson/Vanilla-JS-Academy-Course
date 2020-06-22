const $ = (function () {
  /**
   * Create the constructor
   * @param {string} selector The selector to use
   */
  const Constructor = function (selector) {
    this.elements = Array.from(document.querySelectorAll(selector));
  };

  /**
   * Converts a node list to an array
   * @param  {object} nodeList The node list to be converted
   * @return {object}          The converted node list as an array
   */
  Constructor.prototype.items = function () {
    return this.elements;
  };

/**
 * Get the first item in an array of elements
 * @return {*} The first item
 */
  Constructor.prototype.first = function () {
    return this.elements[0];
  };

/**
 * Gets the last item in an array of elements
 * @return {*} The last item
 */
  Constructor.prototype.last = function () {
    return this.elements[this.elements.length - 1];
  };

/**
 * Adds a class to each item in an array
 * @param {string} className The name of the class to add
 */
  Constructor.prototype.addClass = function (className) {
    this.elements.forEach(function (element) {
      element.classList.add(className);
    });
    return this
  }; 

/**
 * Removes a class from each item in an array
 * @param  {string} className The name of the class to remove
 */
  Constructor.prototype.removeClass = function (className) {
    this.elements.forEach(function (element) {
      element.classList.remove(className);
    });
    return this
  };

// Return the constructor object
  return Constructor;
})();

/* ==========  Testing  ========== */

const buttons = new $('button');
const listItems = new $('li');
buttons.addClass('btn-purple').removeClass('btn-blue');
listItems.addClass('text-red').removeClass('text-red');



