import ToolJS from '../main';
import { getElement, cToA, Logs } from "../deps";
import isObj from '../obj/isObj';

/**
 * This method returns the first child element available of a specified element.
 * @method module:DOM.firstChildEl
 * @param {String|HTMLElement} el Could be a valid css selector string, an html element,
 * @param {ToolJSNodeListManipulator} options A key to pair object that manipulates the elements returned.
 * @returns {HTMLElement} The first child element.
 */
const firstChildEl = (el, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    var output;

    if(!el && debugging) Logs.throw("Specify an element whose first child element is to be returned");

    var elem = getElement(el);
    var elemArr = cToA(elem);

    console.log(elemArr);

    if (elemArr.length == 1) { output = getElement(elemArr[0].firstElementChild); }
    else { if (debugging) Logs.warn("You can only use this method on one element at a time"); }

    var out = output;
    if (isObj(options)) { manipulate(out, options) }

    return output;

}

export default firstChildEl;