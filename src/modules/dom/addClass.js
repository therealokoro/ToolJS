import ToolJS from "../main";
// import deps module
import { getElement, cToA, Logs, manipulate } from "../deps";
// import hasClass
import hasClass from "./hasClass";

/**
 * This method adds a single or multiple classNames to an element of an array of elements
 * @method module:DOM.addClass
 * @param {String|Array<String|HTMLElement>|HTMLElement} el
 * A valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elments
 * @param {String|Array<String>} className The classNames to be added to the element
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
 * @returns {HTMLElement|Object} an html element or a collection of elements
 * @example
 * // adds a single className to the "p" elements
 * DOM.addClass("p", "myClass");
 * 
 * // adds two classNamees to the "p", "h2" elements
 * DOM.addClass(["p", "h2"], ["myClass1", "myClass2"]);
 * 
 */
const addClass = (el, className, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    // get the elements and store in an array
    // @ts-ignore
    var elem = getElement(el);
    var elemArr = cToA(elem);

    elemArr.forEach(el => { _addClass(el); });

    function _addClass(el) {
        if (typeof className === "string") {
            if (!hasClass(el, className)) { el.classList.add(className); }
            else { if (debugging) Logs.warn(`The specified element already has a class labelled '${className}'`) }
        }
        else if (Array.isArray(className)) {
            className.forEach(currValue => {
                if (!hasClass(el, currValue)) { el.classList.add(currValue); }
                else { if (debugging) Logs.warn(`The specified element already has a class labelled '${currValue}'`) }
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

    return elem;
}

export default addClass;