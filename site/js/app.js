var DOMTraversing = require('./modules/DOMTraversing');
var DOMManipulation = require('./modules/DOMManipulation');

var traversing = new DOMTraversing();
var manipulation = new DOMManipulation();

/**
* jsSiblings
* Wrap a given element in a new container element
*/
if (!Element.prototype.jsSiblings) {
  Element.prototype.jsSiblings = function (selector) {
    return traversing.getSiblings(this, selector);
  };
}

if (!Element.prototype.jsNextSiblings) {
  Element.prototype.jsNextSiblings = function (selector) {
    return traversing.getNextSiblings(this, selector);
  };
}

if (!Element.prototype.jsNextSiblings) {
  Element.prototype.jsPrevSiblings = function (selector) {
    return traversing.getPreviousSiblings(this, selector);
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
  childeren = birds.jsChildren('.endangered');

console.log('children',  childeren);
if (Element.prototype.remove) {
  console.log('remove birds');
  birds.remove();
} else {
  console.log('no support remove');
};
// NOTES
// Dom events
// prepend, append, before, after, replace, and remove
// classList, matches

// Array.prototype
// indexOf, lastIndexOf, forEach, every, filter, some, map, reduce, reduceRight
