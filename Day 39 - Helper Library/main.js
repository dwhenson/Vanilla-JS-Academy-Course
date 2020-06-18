
const buttons = Array.from(document.querySelectorAll('.btn-blue'));

const _ = (function () {
  /* ==========  Variables  ========== */

  const methods = {};

  /* ==========  Methods  ========== */

  methods.nodeToArray = function (nodeList) {
    return Array.from(nodeList);
  };

  methods.findElement = function (element) {
    return document.querySelector(element);
  };

  methods.findAllElements = function (element) {
    return Array.from(document.querySelectorAll(element));
  };

  methods.addClass = function (array, style) {
    array.map((element) => element.classList.add(style));
  };

  methods.removeClass = function (array, style) {
    array.map((element) => element.classList.remove(style));
  };

  return methods;
})();
