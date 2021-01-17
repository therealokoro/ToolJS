// import deps module
import { manipulate, getElement, cToA } from "../deps";
import getEl from "./getEl";
import isObj from "../obj/isObj";

/**
 * This method finds a specific element in another element and returns it.
 * @method module:DOM.find
 * @param {String|HTMLElement|Array<string|HTMLElement>} el The element to be found.
 * Could be a valid css selector string, or an html element.
 * @param {String|HTMLElement|Object} scope The scope in the DOM to which the search is limited to.
 * Could be a valid css selector string, or an html element.
 * @param {ToolJSNodeListManipulator} [options] An key to pair object that manipulates the element(s) returned
 * @returns {HTMLElement|Object} an html element or a collection of elements
 * @example
 * // returns a "p" element from myDiv element
 * var p = DOM.find("p", myDiv);
 * 
 * // returns a "p" element from myDiv element and manipulates it
 * var p = DOM.find("p", myDiv, {
 *     className: "myParagraph",
 *     id: "para1",
 *     title: "This is a paragraph"
 * });
 */
const find = (el, scope, options) => {
    var elem;

    if(!el && debugging) Logs.throw("Specify an element to get or a valid css selector representing an element");
    if(!scope && debugging) Logs.throw("Specify the scope of the search. This should be a DOM element or a css selector representing a DOM element");

    if(el && scope){ elem = getElement(el, scope); }

    // manipulate if options are available
    if (isObj(options)) {
        manipulate(cToA(elem), options);
    }

    return getElement(el, scope);
}

export default find;