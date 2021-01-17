// import deps module
import { getElement, cToA } from "../deps";
import isString from "../str/isString";
import isEl from "./isEl";

/**
 * This method removes an element or an array of elements from a <b>specific</b> element in the DOM.
 * This is different from the [removeEl]{@link module:DOM.removeEl} method which checks the whole DOM for the element to be removed.
 * @method module:DOM.removeChild
 * @param {String|HTMLElement|Array<string|HTMLElement>} scope
 * Could be a valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elements.
 * This is where the element or elements are to be removed from
 * @param {String|HTMLElement|Array<string|HTMLElement>} el The element or an array elements to be removed.
 * Could be a valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elements.
 * @example
 * // this removes all the p elements from the element with id "myDiv"
 * DOM.removeChild("#myDiv", "p");
 * 
 * // this removes all p and b elements from the element with id "myDiv"
 * DOM.removeChild("#myDiv", ["p", "b"]);
 */
const removeChild = (scope, el) => {
    var from, parent;

    if (isString(scope)){ from = document.querySelector(scope); }
    else if(isEl(scope)){ from = scope; }
    else{ from = document; }

    if(el){
        var elem = getElement(el, from);
        var elemArr = cToA(elem);

        elemArr.forEach(el => {
            parent = el.parentElement;
            parent.removeChild(el);
        });
    }

    return from;
}

export default removeChild;