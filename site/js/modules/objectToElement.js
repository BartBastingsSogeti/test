/*
 * objectInhertiance
 * [description]
 */
function objectToElement () {

  /**
   * arrayToElement
   * [description]
   *
   * @param {array} array
   * @param {function} elementFunction
   * @param {mixed} param
   */
  function arrayToElement (array, elementFunction, param) {
    if (array.length > 0) {
      Array.prototype.map.call(array, function (element) {
        elementFunction(element, param);
      });
    }
  }

  /**
   * elementCollectionToElement
   * [description]
   *
   * @param {HTMLCollection | NodeList} elementCollection
   * @param {function} elementFunction
   * @param {mixed} param
   */
  function elementCollectionToElement (elementCollection, elementFunction, param) {

    var arrayCollection = Array.prototype.slice.call(elementCollection);

    arrayToElement(arrayCollection, elementFunction, param);
  }

  /**
   * HTMLCollectionToElement
   * [description]
   *
   * @param {function} elementFunction
   * @param {mixed} param
   */
  HTMLCollection.prototype.HTMLCollectionToElement = function (elementFunction, param) {
    elementCollectionToElement(this, elementFunction, param);
  };

  /**
   * NodeListToElement
   * [description]
   *
   * @param {function} elementFunction
   * @param {mixed} param
   */
  NodeList.prototype.NodeListToElement = function (elementFunction, param) {
    elementCollectionToElement(this, elementFunction, param);
  };

  /**
   * checkInhertiance
   * [description]
   *
   * @param {object} object
   * @param {function} elementFunction
   * @param {mixed} param
   */
  this.checkObject = function (object, elementFunction, param) {

    var inhertiance = Object.prototype.toString.call(object);

    switch(inhertiance) {
      case '[object HTMLCollection]':
        object.HTMLCollectionToElement(elementFunction, param);
        break;
      case '[object NodeList]':
        object.NodeListToElement(elementFunction, param);
        break;
      case '[object Array]':
        arrayToElement(object, elementFunction, param);
        break;
      case '[object HTMLLIElement]':
      case '[object HTMLUListElement]':
        elementFunction(object, param);
        break;
      default:
        console.error('Uncaught ReferenceError: inheritance ' + inhertiance +' is not defined');
        break;
     }
   };
}

module.exports = objectToElement;
