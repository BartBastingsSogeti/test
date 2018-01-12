/*
 * DOM Traversing
 * Functions for walking the DOM tree and filtering elements.
 */

function DOMTraversing() {
  'use strict';

  /**
   * filter
   * this is a exmaple function, create the filter and return true or false
   *
   * @param {array} selectorArr
   *
   * @returns {boolean}
   */
  Element.prototype.filter = function (selectorArr) {

    var i,
      el = this,
      length = selectorArr.length;

    for (i = 0; i < length; i++) {
      if (selectorArr[i] === el) {
        return true;
      }
    }
    return false;
  };

  /**
   * getSiblings
   * Get the next, previous or all siblings of an element or retrieve siblings that match a given selector.
   *
   * @param {Element} element
   * @param {String} selector
   *
   * @returns {array} siblings
   */
  this.getSiblings = function (element, selector) {

    var siblings = [],
      el = element.parentNode.firstChild,
      selectorArr = el.parentElement.querySelectorAll(selector);

    while (!!(el = el.nextElementSibling)) {
      if (!selector || el.filter(selectorArr) && this !== el) {
        siblings.push(el);
      }
    }
    return siblings;
  };

  /**
   * getNextSiblings
   * Get all following siblings of an element, optionally filtered with the query selector.
   *
   * @param {Element} element
   * @param {String} selector
   *
   * @returns {Array} siblings
   */
  this.getNextSiblings = function (element, selector) {

    var siblings = [],
      el = element,
      selectorArr = el.parentElement.querySelectorAll(selector);

    while (!!(el = el.nextElementSibling)) {
      if (!selector || el.filter(selectorArr)) {
        siblings.push(el);
      }
    }
    return siblings;
  };

  /**
   * getPreviousSiblings
   * Get all preceding siblings of an element, optionally filtered with the query selector.
   *
   * @param {Element} element
   * @param {String} selector
   *
   * @returns {Array} siblings
   */
  this.getPreviousSiblings = function (element, selector) {

    var siblings = [],
      el = element,
      selectorArr = el.parentElement.querySelectorAll(selector);

    while (!!(el = el.previousElementSibling)) {
      if (!selector || el.filter(selectorArr)) {
        siblings.push(el);
      }
    }
    return siblings;
  };

  /*
   * Get closest element by selector
   * Get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   */
  this.closest = function (element, selector) {
  };


  /*
   * Select the children of an element
   * Getting the children of a DOM element.
   */
  this.getChildren = function (element, selector) {

    var children = [],
      el = element.firstChild,
      selectorArr = el.parentElement.querySelectorAll(selector);

console.log(el);

      while (!!(el = el.previousElementSibling)) {
        if (!selector || el.filter(selectorArr) && this !== el) {
          children.push(el);
        }
      }
      return children;
  };
}

module.exports = DOMTraversing;
