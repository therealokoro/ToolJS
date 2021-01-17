import ToolJS from "../main";
// import deps module
import { getElement, cToA, Logs, manipulate } from "../deps";

/**
 * This method takes a string and gets the corresponding style property value of an element.
 * The method checks if the element has a custom style set to the style property and returns the value, else it gets the computed style(default style).
 * @method module:DOM.getStyle
 * @param {String|Array<String|HTMLElement>|HTMLElement} el
 * A valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elments
 * @param {String} prop The style property whose value is to be returned.
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
 * @returns {HTMLElement|Object} The style property value
 * @example
 * 
 * DOM.getStyle("#p", "color"); // returns "rgba(0,0,0)" this is the default color of a p tag.
 * 
 * DOM.styleEl("#p", { color: "red" }) // change the color of the p tag
 * 
 * DOM.getStyle("#p", "color"); // returns "red" this is the default color of a p tag.
 */
const getStyle = (el, prop, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    var styleValues = [], returnValue;

    if (!el && debugging) Logs.throw("Specify an element whose style property is to be returned");

    // get the elements and store in an array
    // @ts-ignore
    var elem = getElement(el);
    var elemArr = cToA(elem);

    elemArr.forEach(el => { _getstylevalue(el); });

    /* if the prop paramter holds a string, 
    then return the value of the style property that corresponds with the string */
    function _getstylevalue(el) {
        if(typeof prop == "string"){
            var styleValue;
            var computedStyle = window.getComputedStyle(el).getPropertyValue(prop);
            var stylePropValue = el.style[prop];

            if (typeof stylePropValue == "undefined" || stylePropValue == ""){
                styleValue = computedStyle;
            }
            else{ styleValue = stylePropValue; }

            styleValues.push(styleValue);
        }
        else{
            if (debugging) { Logs.warn("The prop parameter is required and must be a string"); }
        }
    }

    if(styleValues.length != 0){
        returnValue = (styleValues.length == 1) ? styleValues[0] : styleValues;
    }

    // manipulate if options are available
    if (options != null) {
        manipulate(elem, options);
    }

    return returnValue;
}

export default getStyle;