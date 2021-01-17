import ToolJS from "../main";
// import deps module
import { getElement, cToA, Logs, manipulate } from "../deps";
import isObj from "../obj/isObj";
import isString from "../str/isString";

/**
 * Styles an element or an array of element using the some css style string
 * @method module:DOM.css
 * @param {String|Array<String|HTMLElement>|HTMLElement} el
 * A valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elments
 * @param {String|Array<String>} value a css style string or an array of css style string
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
 * @returns {HTMLElement|Object} an html element or a collection of elements
 * @example
 * // changes all "p" elements color to red and font size to 40px
 * DOM.css("p", "color: red; font-size: 40px;");
 * 
 * // changes all "p", "h2" elements color to red
 * DOM.css(["p", "h2"], "color: red");
 * 
 * // changes all "p" elements color to red and font size to 40px
 * DOM.css("p", ["color: red", "font-size: 40px"]);
 */
const css = (el, value, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    // get the elements and store in an array

    if(!el && debugging) Logs.throw("Specify an element to apply css rules too");
    
    // @ts-ignore
    var elem = getElement(el);
    var elemArr = cToA(elem);

    elemArr.forEach(el => { _css(el); });

    function _css(el) {
        if (isString(value)) {
            el.style.cssText += value;
        }
        else if (Array.isArray(value)) {
            value.forEach(currValue => {
                el.style.cssText += currValue;
            });
        }
        else if (!isObj(value)) {
            if (debugging) Logs.throw("Value must either be a string or an array of strings. You can alternatively pass it an object literal to manipulate the element")
        }
    }

    // manipulate if options are available
    if (isObj(options)) {
        manipulate(elemArr, options);
    }

    var output = elem;
    return elem;
}

export default css;