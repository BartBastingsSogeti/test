/*
 * DOM Traversing
 * Functions for walking the DOM tree and filtering elements.
 */
function DOMTraversing() {
  'use strict';

  /**
   * filter
   * This function, create the filter and return true or false.
   *
   * @param {array} selectorArr
   *
   * @return {boolean}
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
   * matchesSelectorPolyfill
   * The matchesSelectorPolyfill method returns true if the element would be selected by the specified selector string.
   * Otherwise, returns false.
   *
   * @param {string} selector
   *
   * @return {boolean}
   */
  Element.prototype.matchesSelectorPolyfill = function (selector) {

    var el = this,
      matches = (el.document || el.ownerDocument).querySelectorAll(selector),
      i = matches.length;

    while (--i >= 0 && matches.item(i) !== el) { }
    return i > -1;
  };

  /**
   * closestPolyfill
   * The closestPolyfill method returns the closest ancestor of the current element (or the current element itself) which matches the selectors given in parameter.
   * If there isn't such an ancestor, it returns null.
   *
   * @param {string} selector
   *
   * @return {mixed} element | null
   */
  Element.prototype.closestPolyfill = function (selector) {

    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.matchesSelectorPolyfill(selector);
    }

    var el = this;

    if (!document.documentElement.contains(el)) {
      return null;
    } else {
      do {
        if (el.matches(selector)) {
          return el;
        } else {
          el = el.parentElement || el.parentNode;
        }
      } while (el !== null && el.nodeType === 1);
      return null;
    }
  };

  /**
   * loopNext
   * [discription]
   *
   * @param {element} element
   * @param {element} startElement
   * @param {string} selector
   *
   * @return {array} returnArr
   */
  function loopNext (element, startElement, selectorArr) {

    var returnArr = [],
      cache = element,
      el = startElement;

    while (!!(el = el.nextElementSibling)) {
      if (cache !== el) {
        if (selectorArr.length === 0) {
          returnArr.push(el);
        } else if (el.filter(selectorArr)) {
          returnArr.push(el);
        }
      }
    }
    return returnArr;
  }

  /**
   * loopPrev
   * [discription]
   *
   * @param {element} element
   * @param {element} startElement
   * @param {string} selector
   *
   * @return {array} returnArr
   */
  function loopPrev (element, startElement, selectorArr) {

    var returnArr = [],
      cache = element,
      el = startElement;

    while (!!(el = el.previousElementSibling)) {
      if (cache !== el) {
        if (selectorArr.length === 0) {
          returnArr.push(el);
        } else if (el.filter(selectorArr)) {
          returnArr.push(el);
        }
      }
    }
    return returnArr;
  }

  /**
   * loopSelector
   * [discription]
   *
   * @param {element} element
   * @param {element} startElement
   * @param {string} selector
   * @param {string} direction only 'next' or 'prev'
   *
   * @throws {error} If the param "direction" is not "prev" or "next"
   *
   * @return {array} returnArr
   */
  function loopSelector (element, startElement, selector, direction) {
    if (direction === 'next') {
      return loopNext(element, startElement, selector);
    } else if (direction === 'prev') {
      return loopPrev(element, startElement, selector);
    } else {
      console.error('The param "direction" can only be a the string "next" or "prev"!', direction);
    }
  }

  /**
   * getSiblings
   * Get the next, previous or all siblings of an element or retrieve siblings that match a given selector.
   *
   * @param {Element} element
   * @param {String} selector
   *
   * @return {array} siblings
   */
  this.getSiblings = function (element, selector) {
    return loopSelector(element, element.parentElement.firstElementChild, element.parentElement.querySelectorAll(selector), 'next');
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
    return loopSelector(element, element, element.parentElement.querySelectorAll(selector), 'next');
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
    return loopSelector(element, element, element.parentElement.querySelectorAll(selector), 'prev');
  };

  /**
   * getChildren
   * Getting the children of a DOM element.
   *
   * @param {Element} elements
   * @param {String} selector
   *
   * @return {Array} children
   */
  this.getChildren = function (element, selector) {
    return loopSelector(element, element.firstElementChild, element.querySelectorAll(selector), 'next');
  };

  /**
   * getMatches
   * The matchSelector method returns true if the element would be selected by the specified selector string.
   * Otherwise, returns false.
   *
   * @param {Element} elements
   * @param {String} selector
   *
   * @return {boolean}
   */
  this.getMatches = function (element, selector) {

    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.matchesSelectorPolyfill(selector);
    }

    return element.matches(selector);
  };

  /**
   * getClosest
   * Get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   *
   * @param {element} elements
   * @param {string} selector
   *
   * @return {element}
   */
  this.getClosest = function (element, selector) {
    return element.closestPolyfill(selector);
  };
}

module.exports = DOMTraversing;
