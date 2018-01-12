/**
 * removeHTMLCollection
 * Remove an HTMLCollectio from the DOM tree.
 *
 * @param {object} HTMLCollection
 */
Array.prototype.arrayToElement = function (elementfunction) {
  'use strict';

  var array = this;

  if (array.length > 0) {
  	Array.prototype.map.call(array, function (element) {
  		elementfunction(element);
  	});
  }
};

HTMLCollection.prototype.HTMLCollectionToElement = function () {
  'use strict';

  var elementCollection = this,
  	arrayCollection = Array.prototype.slice.call(elementCollection);

  arrayCollection.arrayToElement(elementfunction);
};

NodeList.prototype.NodeListToElement = function (elementfunction) {
  'use strict';

  var elementCollection = this,
  	arrayCollection = Array.prototype.slice.call(elementCollection);

  arrayCollection.arrayToElement(elementfunction);
};

Object.prototype.checkInhertiance = function(inhertianceObject, elementFunction) {
  'use strict';

  var object = this,
  	inhertiance = Object.prototype.toString.call(object);

  inhertianceObject.object = object;
  inhertianceObject.elementFunction = elementFunction;

  switch(inhertiance) {
  	case '[object HTMLCollection]':
  		inhertianceObject.object.HTMLCollectionToElement(inhertianceObject.elementFunction);
    break;
  	case '[object NodeList]':
  		inhertianceObject.object.NodeListToElement(inhertianceObject.elementFunction);
  		break;
  	case '[object HTMLLIElement]':
  		inhertianceObject.elementFunction();
  		break;
  	default:
  		console.error('Uncaught ReferenceError: inheritance ' + inhertiance +' is not defined');
  		break;
  }
};
