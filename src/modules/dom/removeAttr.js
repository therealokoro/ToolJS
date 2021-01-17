import ToolJS from "../main";
import { Logs, getElement, cToA, manipulate } from "../deps";
import isString from "../str/isString";

/**
 * This method removes an attribute or an array of attributes from an element if the element has that attribute set
 * @method module:DOM.removeAttr
 * @param {String|HTMLElement|Array<string|HTMLElement>} el
 * Could be a valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elements
 * @param {String|Array<String>} attr A string representing an attribute or an array of attributes to be removed
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
 * @returns {HTMLElement|Array<HTMLElement>} The elements whose attributes were removed
 * @example
 * // this removes the title attribute from the element
 * DOM.removeAttr("#p", "title");
 * 
 * // this removes the title class and the data-color attributes from the element
 * DOM.removeAttr("#p", ["title", "class", "data-color"]);
 */
const removeAttr = (el, attr, options) => {
    var debugging = ToolJS.env.debugging;
    // @ts-ignore
    var elem = getElement(el);
    var elemArr = cToA(elem);
    elemArr.forEach(el => { _attr(el); });

    function _attr(el) {
        if(attr){
            if (Array.isArray(attr)) {
                attr.forEach(currAttr => {
                    if (el.hasAttribute(currAttr)) { el.removeAttribute(currAttr); }
                    else{ if (debugging) Logs.warn(`This element does not have a set attribute named '${currAttr}'`); }
                });
            }
            else if (isString(attr)) {
                if (el.hasAttribute(attr)) {
                    el.removeAttribute(attr);
                }
            }
            else{ if(debugging) Logs.throw("The attr parameter must be an object literal"); }
        }
        else{ if(debugging) Logs.throw("You must specify atleast one attribute to be removed"); }
    }

    if(options != null){ manipulate(elem, options); }

    return getElement(el);
}

export default removeAttr;