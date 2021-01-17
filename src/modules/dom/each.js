import { ToolJSNodeList } from "../deps";

import ToolJS from '../main';
import { Logs, getElement, cToA } from '../deps';

/**
 * This method fires a callback function once for each element in a collection, nodelist or array.
 * @method module:DOM.each
 * @param {String|HTMLElement|Array<string|HTMLElement>} el An array of elements. Could also be a valid css selector string.
 * @param {Function} callback The callback function to be fired once for each element.
 * @returns {String|HTMLElement} The elements
 * @example
 * var myElem = document.getElementsByTagName("p");
 * DOM.each(myElem) // returns true;
 *
 * var myEl = document.querySelector("p");
 * DOM.each(myEl) // returns false;
 *
 * var byId = document.getElementById("p");
 * DOM.each(byId) // returns false;
 */
const each = (el, callback) => {
    var debugging = ToolJS.env.debugging;
    if(!el && debugging) Logs.warn("You must specify an element or an array of element first");

    var elem = getElement(el);
    var elemArr = cToA(elem);

    if("function" === typeof callback){
        elemArr.forEach((currEl, index) => callback(currEl, index, elemArr));
    }
    else { if(debugging) Logs.warn("The callback parameter must a of function") }

    return getElement(el);
}

export default each;