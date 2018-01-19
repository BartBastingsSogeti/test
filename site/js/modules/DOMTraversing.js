/*
 * DOMTraversing
 * Functions for walking the DOM tree and filtering elements.
 */
function DOMTraversing() {
  'use strict';

  var baseFunctions = require('./baseFunctions'),
    base = new baseFunctions();

  /**
   * matchesSelectorPolyfill
   * The matchesSelectorPolyfill method returns true if the element would be selected by the specified selector string.
   * Otherwise, returns false.
   *
   * @param {string} selector
   *
   * @return {boolean}
   */
  Element.prototype.matchesPolyfill = function (selector) {

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
        Element.prototype.matchesPolyfill(selector);
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
   * @param {object} element
   * @param {object} startElement
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
        if (selectorArr.length === 0 || base.filter(el, selectorArr)) {
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
   * @param {object} element
   * @param {object} startElement
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
        if (selectorArr.length === 0 || base.filter(el, selectorArr)) {
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
   * @param {object} element
   * @param {object} startElement
   * @param {string} selector
   * @param {string} direction only 'next' or 'prev'
   *
   * @throws {error} If the param "direction" is not "prev" or "next"
   *
   * @return {array} returnArr
   */
  function loopSelector (element, startElement, selector, direction) {
    switch (direction) {
      case 'next':
        return loopNext(element, startElement, selector);
        break;
        case 'prev':
        return loopPrev(element, startElement, selector);
        break;
      default:
        console.error('The param "direction" can only be a the string "next" or "prev"!', direction);
        break;
    }
  }

  /**
   * Ancestors
   * 
   * @todo getParent() | The parent() method returns the direct parent element of the selected element.
   * @todo getParents() | The parents() method returns all ancestor elements of the selected element, all the way up to the document's root element
   * @todo getParents(selector) | You can also use an optional parameter to filter the search for ancestors.
   * @todo getParentsUntil() | The parentsUntil() method returns all ancestor elements between two given arguments.
   */

  /**
   * Descendants
   * 
   * getChildren() | beta version!
   * @todo getFind() | The find() method returns descendant elements of the selected element, all the way down to the last descendant.
   */

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
    return loopSelector(element, element.firstChild, element.querySelectorAll(selector), 'next');
  };
  
  /**
   * Siblings
   * 
   * getSiblings() | beta version!
   * getNext() | beta version!
   * getNextAll() | beta version!
   * @todo getNextUntil() | The getNextUntil() method returns all next sibling elements between two given arguments.
   * getPrev() | beta version!
   * getPrevAll() | beta version!
   * @todo getPrevUntil() | The getPrevUntil() method returns all previous sibling elements between two given arguments.
   */
  
  /**
   * getSiblings
   * Get the next, previous or all siblings of an element or retrieve siblings that match a given selector.
   *
   * @param {object} element
   * @param {string} selector
   *
   * @return {array} siblings
   */
  this.getSiblings = function (element, selector) {
    return loopSelector(element, element.parentNode.firstChild, element.parentElement.querySelectorAll(selector), 'next');
  };

  /**
   * getNextSibling
   * Get the following sibling of an element.
   *
   * @param {object} element
   *
   * @returns {object} next sibling
   */
  this.getNextSibling = function (element) {
    return element.nextElementSibling;
  };

  /**
   * getNextSiblings
   * Get all following siblings of an element, optionally filtered with the query selector.
   *
   * @param {object} element
   * @param {string} selector
   *
   * @returns {Array} siblings
   */
  this.getNextSiblings = function (element, selector) {
    return loopSelector(element, element, element.parentElement.querySelectorAll(selector), 'next');
  };

  /**
   * getPreviousSiblings
   * Get the preceding sibling of an element.
   *
   * @param {object} element
   *
   * @returns {object} previous sibling
   */
  this.getPreviousSibling = function (element) {
    return element.previousElementSibling;
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
   * Filtering
   * 
   * @todo first() | [description]
   * @todo last() | [description]
   * @todo eq() | [description]
   * @todo filter() | [description]
   * @todo not() | [description]
   */

  /**
   * Special
   * 
   * @todo getMatches() | beta version!
   * @todo getClosest() | beta version!
   */

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
        Element.prototype.matchesPolyfill(selector);
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
