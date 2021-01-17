/**
 * This method checks if a variable holds an HTMLCollection.
 * @method module:DOM.isCollection
 * @param {*} item The variable or item to check for
 * @returns {Boolean} The result of the check for
 * @example
 * var myElem = document.getElementsByTagName("p");
 * DOM.isCollection(myElem) // returns true;
 *
 * var myEl = document.querySelector("p");
 * DOM.isCollection(myEl) // returns false;
 *
 * var byId = document.getElementById("p");
 * DOM.isCollection(byId) // returns false;
 */
const isCollection = (item) => {
    return HTMLCollection.prototype.isPrototypeOf(item);
}

export default isCollection;