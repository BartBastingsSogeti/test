var DOMTraversing = require('./modules/DOMTraversing');
var DOMManipulation = require('./modules/DOMManipulation');

var traversing = new DOMTraversing();
var manipulation = new DOMManipulation();

/**
 * With jQuery you can traverse sideways in the DOM tree to find siblings of an element.
 * Siblings share the same parent. 
 */

/**
* siblings()
* The siblings() method returns all sibling elements of the selected element.
* Optionaly with query selector filter.
*
* @param {string} selector
*
* @returns {array} siblings
*/
if (!Element.prototype.siblings) {
  Element.prototype.siblings = function (selector) {
    return traversing.getSiblings(this, selector);
  };
}

/**
 * next()
 * The next() method returns the next sibling element of the selected element.
 * 
 * @returns {object} next sibling
 */
if (!Element.prototype.next) {
  Element.prototype.next = function () {
    return traversing.getNextSibling(this);
  };
}

/**
 * nextAll()
 * The nextAll() method returns all next sibling elements of the selected element.
 * Optionaly with query selector filter.
 * 
 * @param {string} selector
 * 
 * @returns {array} next siblings
 */
if (!Element.prototype.nextAll) {
  Element.prototype.nextAll = function (selector) {
    return traversing.getNextSiblings(this, selector);
  };
}

/**
 * nextUntil()
 * The nextUntil() method returns all next sibling elements between two given arguments
 * 
 * @todo function not constructed yet
 */
if (!Element.prototype.nextUntil) {
  Element.prototype.nextUntil = function (selector) {
    console.error('Not working!');
  };
}

/**
 * prev()
 * The prev() method returns the previous sibling element of the selected element.
 * 
 * @returns {object} previous sibling
 */
if (!Element.prototype.prev) {
  Element.prototype.prev = function () {
    return traversing.getPreviousSibling(this);
  };
}

/**
 * prevAll()
 * The prevAll() method returns all previous sibling elements of the selected element.
 * Optionaly with query selector filter.
 * 
 * @param {string} selector
 * 
 * @returns {array} previous siblings
 */
if (!Element.prototype.prevAll) {
  Element.prototype.prevAll = function (selector) {
    return traversing.getPreviousSiblings(this, selector);
  };
}

/**
 * prevUntil()
 * The prevUntil() method returns all next sibling elements between two given arguments
 * 
 * @todo function not constructed yet
 */
if (!Element.prototype.prevUntil) {
  Element.prototype.prevUntil = function (selector) {
    console.error('Not working!');
  };
}


if (!Element.prototype.jsClosest) {
  Element.prototype.jsClosest = function (selector) {
    return traversing.closest(this, selector);
  };
}

if (!Element.prototype.jsChildren) {
  Element.prototype.jsChildren = function (selector) {
    return traversing.getChildren(this, selector);
  };
}

if (!Element.prototype.jsMatches) {
  Element.prototype.jsMatches = function (selector) {
    return traversing.getMatches(this, selector);
  };
}

if (!Element.prototype.jsClosest) {
  Element.prototype.jsClosest = function (selector) {
    return traversing.getClosest(this, selector);
  };
}

if (!Element.prototype.jsReplaceWith) {
  Element.prototype.jsReplaceWith = function (replaceElement) {
    return manipulation.replaceElement(this, replaceElement);
  };
}

if (!Element.prototype.jsEmpty) {
  Element.prototype.jsEmpty = function (replaceElement) {
    return manipulation.emptyElement(this);
  };
}

if (!Element.prototype.jsRemove) {
  Element.prototype.jsRemove = function () {
    return manipulation.removeElement(this);
  };
}

if (!Element.prototype.jsRemoveAll) {
  Object.prototype.jsRemoveAll = function () {
    return manipulation.removeElements(this);
  };
}

var birds = document.getElementById('birds'),
  childeren = birds.jsChildren('#endangered')
  endagered = document.getElementById('endangered');

  endagered.prev().style.color = 'red';
// NOTES
// Dom events
// prepend, append, before, after, replace, and remove
// classList, matches

// Array.prototype
// indexOf, lastIndexOf, forEach, every, filter, some, map, reduce, reduceRight
