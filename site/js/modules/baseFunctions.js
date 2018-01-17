/**
 * baseFunctions.js
 * [description]
 */
function baseFunctions() {

  /**
   * filter
   * This function, create the filter and return true or false.
   *
   * @param {element} element
   * @param {array} selectorArr
   *
   * @return {boolean}
   */
  this.filter = function (element, selectorArr) {

    var i,
      el = element,
      length = selectorArr.length;

    for (i = 0; i < length; i++) {
      if (selectorArr[i] === el) {
        return true;
      }
    }
    return false;
  };
};

module.exports = baseFunctions;
