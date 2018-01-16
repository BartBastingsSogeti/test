/**
 * DOMManipulation
 * Manipulating DOM Elements.
 * Adding, removing, copying DOM elements and related manipulations.
 */
function DOMManipulation() {
  'use strict';

  var inhertianceInstance = require('./objectInhertiance');

  /**
   * replaceElement
   * Remove an element from the DOM tree and insert a new one in its place.
   *
   * @param {element} element
   * @param {element} replaceElement
   */
  this.replaceElement = function (element, replaceElement) {
    element.parentNode.replaceChild(replaceElement, element);
  };

  /**
   * emptyElement
   * Remove all child nodes of an element from the DOM.
   *
   * @param {element} element
   */
  this.emptyElement = function (element) {
    element.innerHTML = '';
  };

  /**
   * removeElement
   * Remove an element from the DOM tree.
   *
   * @param {element} element
   */
  this.removeElement = function (element) {
    element.parentNode.removeChild(element);
  };

  /**
   * removeElements
   * [description]
   *
   * @param {object} elements
   */
  this.removeElements = function (elements) {

    var inhertiance = new inhertianceInstance();

    inhertiance.checkInhertiance(elements, this.removeElement);
  };

  /**
   * removeChild
   * [description]
   *
   * @param {element} element
   * @param {string} selctor
   *
   * @todo insert function to removeChild with selctor
   */
  this.removeChildFromElement = function (element, selector) {

  };

  /**
   * removeChild
   * [description]
   *
   * @param {element} element
   * @param {string} selctor
   *
   * @todo insert function to removeChild with selctor
   */
  this.removeChildsFromElement = function (element, selector) {

  };

  /**
   * insertAfter
   * The following helper function insertAfter() lets you insert a new element after an existing one in the DOM tree.
   *
   * @param {element} element
   * @param {element} target
   */
  this.insertAfter = function (element, target) {
    target.parentNode.insertBefore(element, target.nextSibling);
  };

  /**
   * insertBefore
   * To insert an element before another one, we can use a very similar helper function: insertBefore()
   *
   * @param {element} element
   * @param {element} target
   */
  this.insertBefore = function (element, target) {
    target.parentNode.insertBefore(element, target);
  };

  /**
   * append
   * Append element as last child of the element
   *
   * @param {element} element
   * @param {element} HTMLelement
   */
  this.append = function (element, HTMLelement) {

  };

  /**
   * prepend
   * Prepend element as first child of the element
   *
   * @param {element} element
   * @param {element} HTMLelement
   */
  this.prepend = function (element, HTMLelement) {

  };

   /**
   * wrap
   * Wrap a given element in a new container element
   *
   * @param {element} element
   * @param {element} HTMLelement
   */
  this.wrap = function (element, HTMLelement) {
    element.parentNode.insertBefore(HTMLelement, element);
    HTMLelement.appendChild(element);
  };

  /**
   * unwrapElement
   * Remove the parents of an element from the DOM, leaving the element's content in place.
   *
   * @param {element} element
   */
  this.unwrapElement = function (element) {

    var parent = element.parentNode;

    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }
    parent.removeChild(element);
  };

  /**
   * clone
   * creates a deep copy of the selected DOM element including attributes and child elements.
   *
   * @return {element} element
   * @return {node} node
   */
  this.clone = function (element, node) {

    if (!node) {
      node = true;
    }
    return element.cloneNode(node);
  };
}

module.exports = DOMManipulation;
