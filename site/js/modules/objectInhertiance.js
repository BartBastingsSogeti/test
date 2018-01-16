/*
 * objectInhertiance
 * [description]
 */
function objectInhertiance () {

  /**
   * arrayToElement
   * [description]
   *
   * @param {function} elementfunction
   */
  Array.prototype.arrayToElement = function (elementFunction) {

    var array = this;

    if (array.length > 0) {
    	Array.prototype.map.call(array, function (element) {
    		elementFunction(element);
    	});
    }
  };

  /**
   * HTMLCollectionToElement
   * [description]
   *
   * @param {HTMLCollection | NodeList} elementCollection
   */
  function elementCollectionToElement (elementCollection, elementFunction) {

    var arrayCollection = Array.prototype.slice.call(elementCollection);

    arrayCollection.arrayToElement(elementFunction);
  }

  HTMLCollection.prototype.HTMLCollectionToElement = function (elementFunction) {
    elementCollectionToElement(this, elementFunction);
  };

  NodeList.prototype.NodeListToElement = function (elementFunction) {
    elementCollectionToElement(this, elementFunction);
  };

  /**
   * checkInhertiance
   * [description]
   *
   * @param {object} object
   * @param {function} elementFunction
   */
  this.checkInhertiance = function (object, elementFunction) {

    var inhertiance = Object.prototype.toString.call(object);

    switch(inhertiance) {
      case '[object HTMLCollection]':
        object.HTMLCollectionToElement(elementFunction);
        break;
      case '[object NodeList]':
        object.NodeListToElement(elementFunction);
        break;
      case '[object Array]':
        object.arrayToElement(elementFunction);
        break;
      case '[object HTMLLIElement]':
      case '[object HTMLUListElement]':
        elementFunction(object);
      break;
      default:
        console.error('Uncaught ReferenceError: inheritance ' + inhertiance +' is not defined');
        break;
     }
   };
}

module.exports = objectInhertiance;
