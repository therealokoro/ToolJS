import ToolJS from "../main";
// import deps module
import { getElement, cToA, Logs, manipulate } from "../deps";
import Obj from "../obj";

/**
 * Styles an element or an array of element using the some css style properties.
 * @method module:DOM.styleEl
 * @param {String|Array<String|HTMLElement>|HTMLElement} el
 * A valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elments
 * @param {Object|String|Array<String>} props
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned.
 * @returns {HTMLElement|Object} an html element or a collection of elements
 * @example
 * // gives all "p" element a color of red and a fontsize of 30px
 * DOM.styleEl("p", {
 *     color: "red",
 *     fontSize: "30px"
 * });
 * 
 * // styles all "h3" and "p" elements with the following giving parameters
 * DOM.styleEl(["h3", "p"], {
 *     color: "red",
 *     fontSize: "30px"
 * });
 */
const styleEl = (el, props, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    var output;

    if(!el && debugging) Logs.throw("Specify an element to be styled");

    // get the elements and store in an array
    // @ts-ignore
    var elem = getElement(el);
    var elemArr = cToA(elem);

    elemArr.forEach(el => { _style(el); });

    /* if the props paramter holds a string, 
    then return the value of the style property that corresponds with the string */
    function _style(el) {
        if(Obj.isObj(props)){
            Obj.forEach(props, (property, value) => {
                el.style[property] = value;
            });
        }
        else{ if(debugging){ Logs.throw("The props parameter must be an object literal"); } }
    }

    output = elem;

    // manipulate if options are available
    if (options != null) {
        manipulate(elem, options);
    }

    return getElement(el);
}

export default styleEl;