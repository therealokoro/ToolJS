import ToolJS from "../main";
// import deps module
import { getElement, cToA, Logs, manipulate } from "../deps";

/**
 * This method toggles a single or multiple classNames on an element of an array of elements
 * @method module:DOM.toggleClass
 * @param {String|Array<String|HTMLElement>|HTMLElement} el
 * A valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elments
 * @param {String|Array<String>} className The classNames to be toggled on an element
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
 * @returns {HTMLElement|Object} an html element or a collection of elements
 * @example
 * // toggles a single className to the "p" elements
 * DOM.toggleClass("p", "myClass");
 * 
 * // toggles two classNamees to the "p", "h2" elements
 * DOM.toggleClass(["p", "h2"], ["myClass1", "myClass2"]);
 * 
 */
const toggleClass = (el, className, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    // get the elements and store in an array
    // @ts-ignore
    var elem = getElement(el);
    var elemArr = cToA(elem);

    elemArr.forEach(el => { _toggleClass(el); });

    function _toggleClass(el) {
        if (typeof className === "string") {
            el.classList.toggle(className);
        }
        else if (Array.isArray(className)) {
            className.forEach(currValue => {
                el.classList.toggle(currValue);
            });
        }
        else {
            if (debugging) Logs.throw("The className must either be a string or an array of strings");
        }
    }

    // manipulate if options are available
    if (options != null) {
        manipulate(elemArr, options);
    }

    return getElement(el);
}

export default toggleClass;