// import deps module
import { getElement, manipulate } from "../deps";
import isObj from "../obj/isobj";
import isString from "../str/isString";

/**
 * Gets and returns an element or a collection of elements(if more than one elememt is found) from the DOM
 * @method module:DOM.getEl
 * @param {String|HTMLElement|Array<string|HTMLElement>} el 
 * Could be a valid css selector string, an html element, 
 * a collection of elements or an array of css selector strings and html elments
 * @param {String|HTMLElement|Object} [from=document]
 * A location(i.e an element) in the DOM where the element can be found.
 * Could be a valid css selector string, or an html element.
 * If passed an object, that object is considered to be manipulation options
 * @param {ToolJSNodeListManipulator} [options] An key to pair object that manipulates the element(s) returned
 * @returns {HTMLElement|Object} an html element or a collection of elements
 * @example
 * // returns a "div" element from the document
 * var myDiv = DOM.getEl("div");
 * 
 * // returns a "p" element from myDiv element
 * var p = DOM.getEl("p", myDiv);
 * 
 * // returns a "p" element from myDiv element and manipulates it
 * var p = DOM.getEl("p", myDiv, {
 *     className: "myParagraph",
 *     id: "para1",
 *     title: "This is a paragraph"
 * });
 * 
 * // returns a "p" element and manipulates it
 * var p = DOM.getEl("p", {
 *     className: "myParagraph",
 *     id: "para1",
 *     title: "This is a paragraph"
 * });
 */
const getEl = (el, from, options) => {
    var optionsObj, scope;

    if(!el && debugging) Logs.throw("Specify an element to get or a valid css selector representing an element");

    // resolve the option param
    if (isObj(from)) {
        optionsObj = from;
        scope = document;
    }
    else { scope = from; }

    if(isObj(options)){ optionsObj = options };

    // get the element
    var elem = getElement(el, scope);
    
    // manipulate if options are available
    if (isObj(optionsObj)) {
        manipulate(elem, optionsObj);
    }
    
    var output = getElement(el, scope);
    return output;
}

export default getEl;