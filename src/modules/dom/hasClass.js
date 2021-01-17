import ToolJS from "../main";
import { getElement, cToA, Logs, manipulate } from "../deps";
import isString from "../str/isString";

/**
 * This method checks if an element contains a particular class and returns true.
 * If an array of elements is passed, it'll only return true if all the elements in the array contain the class
 * @method module:DOM.hasClass
 * @param {String|Array<String|HTMLElement>|HTMLElement} el A valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elments
 * @param {String} className The className to be checked for in an element. Note that this cannot be an array
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
 * @returns {HTMLElement|Object} an html element or a collection of elements
 * @example
 * // checks if the "#p" element has a class labelled "myClass1"
 * DOM.hasClass("#p", "myClass");
 * 
 * // checks if the "p", "h2" elements have a class labelled "myClass1"
 * DOM.hasClass(["p", "h2"], "myClass1");
 * 
 */
const hasClass = (el, className, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;

    if(!el && debugging) Logs.throw("Specify an element to work on");

    // get the elements and store in an array
    var elem = getElement(el);
    var elemArr = cToA(elem);
    var output = _hasClass(elemArr);

    function _hasClass(el) {

        if(el.length === 1){
            var val;
            if (isString(className)) {
                el.every(currEl => { val = currEl.classList.contains(className); });
            }
            else { if (debugging) Logs.throw("The className must either be a string"); }
            return val;
        }
        else { if (debugging) Logs.warn("The hasClass method should be used for one element at a time"); }
        
    }

    // manipulate if options are available
    if (options != null) {
        manipulate(elem, options);
    }

    return output;
}

export default hasClass;