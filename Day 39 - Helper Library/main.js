const _ = (function () {
  /* ==========  Variables  ========== */

  // object for holding public methods
  const methods = {};

  /* ==========  Methods  ========== */

  /**
   * Converts a node list to an array
   * @param  {object} nodeList The node list to be converted
   * @return {object}          The converted node list as an array
   */
  methods.convert = function (nodeList) {
    return Array.from(nodeList);
  };

  /**
   * Finds the first matching element
   * @param  {string} element The name of the element to find
   * @return {object}         The matched element
   */

  methods.get = function (element) {
    return document.querySelector(element);
  };

  /**
   * Finds all elements of the type specified
   * @param  {string} element The name of the elements to find
   * @return {object}         An array of the elements found
   */
  methods.getAll = function (element) {
    return methods.convert(document.querySelectorAll(element));
  };
  /**
   * Adds a class to all elements in an array
   * @param {object} array The array of elements to add a class to
   * @param {string} style The name of the class to add
   */
  methods.addClass = function (elements, className) {
    elements.forEach((element) => element.classList.add(className));
  };

  /**
   * Removes a class from all elements in an array
   * @param  {object} array The array of elements to remove a class from
   * @param  {string} style The name of the class to remove
   */
  methods.removeClass = function (elements, className) {
    elements.forEach((element) => element.classList.remove(className));
  };

  return methods;
})();
