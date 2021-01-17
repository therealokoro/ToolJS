import ToolJS from "../main";
// import deps module
import { getElement, cToA, Logs, manipulate } from "../deps";
import isString from "../str/isString";
import hasClass from "./hasClass";

/**
 * This method removes a single or multiple classNames from an element of an array of elements
 * @method module:DOM.removeClass
 * @param {String|Array<String|HTMLElement>|HTMLElement} el
 * A valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elments
 * @param {String|Array<String>} className The classNames to be removed from an element
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
 * @returns {HTMLElement|Object} an html element or a collection of elements
 * @example
 * // removes a single className to the "p" elements
 * DOM.removeClass("p", "myClass");
 * 
 * // removes two classNamees to the "p", "h2" elements
 * DOM.removeClass(["p", "h2"], ["myClass1", "myClass2"]);
 * 
 */
const removeClass = (el, className, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    // get the elements and store in an array
    
    // @ts-ignore
    var elem = getElement(el);
    var elemArr = cToA(elem);

    elemArr.forEach(el => { _removeClass(el); });

    function _removeClass(el) {
        if (isString(className)) {
            if(hasClass(el, className)){ el.classList.remove(className); }
        }
        else if (Array.isArray(className)) {
            className.forEach(currValue => {
                if(hasClass(el, currValue)){ el.classList.remove(currValue); }
            });
        }
        else { if (debugging) Logs.throw("The className must either be a string or an array of strings"); }
    }

    // manipulate if options are available
    if (options != null) {
        manipulate(elem, options);
    }

    return getElement(el);
}

export default removeClass;