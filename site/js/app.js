var DOMTraversing = require('./modules/DOMTraversing');
var DOMManipulation = require('./modules/DOMManipulation');

var traversingInstance = new DOMTraversing();
var manipulationInstance = new DOMManipulation();

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

Element.prototype.getMatches = function (selector) {
  return traversingInstance.getMatches(this, selector);
};

Element.prototype.getClosest = function (selector) {
  return traversingInstance.getClosest(this, selector);
};

Element.prototype.removeElement = function () {
  return manipulationInstance.removeElement(this);
};

Object.prototype.removeElements = function () {
  return manipulationInstance.removeElements(this);
};

var element = document.getElementsByClassName('page-main')[0];
var endangered = document.getElementsByClassName('endangered')[0];
var birds = document.getElementById('birds');

//var siblings = element.getSiblings();
//console.log('siblings', siblings);

//var prevSiblings = element.getPreviousSiblings();
//console.log('prevSiblings', prevSiblings);

//var nextSiblings = element.getNextSiblings();
//console.log('nextSiblings', nextSiblings);

var children = birds.getChildren();
console.log('getChildren', children);

//var closest = endangered.getClosest('div');
//console.log('closest', closest);

birds.removeElements();
