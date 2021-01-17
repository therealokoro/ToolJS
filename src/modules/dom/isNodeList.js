/**
 * This method checks if a variable holds a NodeList.
 * @method module:DOM.isNodeList
 * @param {*} item The variable or item to check for
 * @returns {Boolean} The result of the check for
 * @example
 * var myEl = document.querySelector("p");
 * DOM.isNodeList(myEl) // returns true;
 *
 * var myElem = document.getElementsByTagName("p");
 * DOM.isNodeList(myElem) // returns false;
 *
 * var byId = document.getElementById("p");
 * DOM.isNodeList(byId) // returns false;
 */
const isNodeList = (item) => {
    return NodeList.prototype.isPrototypeOf(item);
}

export default isNodeList;