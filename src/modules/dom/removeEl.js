// import deps module
import { getElement, cToA } from "../deps";

/**
 * This method removes an element or an array of elements from an element in the DOM
 * This is different from the [removeChild]{@link module:DOM.removeChild} method which checks a specific location in the DOM for the element to be removed.
 * @method module:DOM.removeEl
 * @param {String|HTMLElement|Array<string|HTMLElement>} el
 * Could be a valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elements.
 * This is the element or elements to be removed
 * @example
 * // this removes all the p elements from the DOM
 * DOM.removeEl("p");
 * 
 * // this removes all p and div elements from the DOM
 * DOM.removeEl(["p", "div"]);
 */
const removeEl = (el) => {
    // @ts-ignore
    var elem = getElement(el);
    var elemArr = cToA(elem);
    elemArr.forEach(el => { _remove(el); });

    function _remove(el) {
        var parent = el.parentElement;
        parent.removeChild(el);
    }
}

export default removeEl;