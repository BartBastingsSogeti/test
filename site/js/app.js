var DOMTraversing = require('./modules/DOMTraversing');

var traversingInstance = new DOMTraversing();

Element.prototype.getSiblings = function (selector) {
  return traversingInstance.getSiblings(this, selector);
};

Element.prototype.getNextSiblings = function (selector) {
  return traversingInstance.getNextSiblings(this, selector);
};

Element.prototype.getPreviousSiblings = function (selector) {
  return traversingInstance.getPreviousSiblings(this, selector);
};

Element.prototype.closest = function (selector) {
  return traversingInstance.closest(this, selector);
};

Element.prototype.getChildren = function (selector) {
  return traversingInstance.getChildren(this, selector);
};

var element = document.getElementsByClassName('page-wrapper')[0];
var siblings = element.getChildren();

console.log(siblings);
