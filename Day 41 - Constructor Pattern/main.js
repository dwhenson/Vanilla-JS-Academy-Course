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

  Constructor.prototype.first = function () {
    return this.elements[0];
  };

  Constructor.prototype.last = function () {
    return this.elements[this.elements.length - 1];
  };

  Constructor.prototype.addClass = function (className) {
    this.elements.forEach(function (element) {
      element.classList.add(className);
    });
  }; 

  Constructor.prototype.removeClass = function (className) {
    this.elements.forEach(function (element) {
      element.classList.remove(className);
    });
  };

  return Constructor;
})();

/* ==========  Testing  ========== */

const buttons = new $('button');
buttons.removeClass('btn-purple');

