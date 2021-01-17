import ToolJS from '../main';
import { getElement, cToA, Logs } from "../deps";

/**
 * This method returns the previous available sibling element of a specified element.
 * @method module:DOM.prev
 * @param {String|HTMLElement} el Could be a valid css selector string, an html element.
 * @param {ToolJSNodeListManipulator} options A key to pair object that manipulates the returned element.
 * @returns {HTMLElement} The previous available element sibling.
 */
const prev = (el, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    if(!el && debugging) Logs.throw("Specify an element whose previous sibling is to be returned");

    if(el){
        var elem = getElement(el);
        var elemArr = cToA(elem);

        if(elemArr.length == 1){ return elemArr[0].previousElementSibling; }
        else { if(debugging) Logs.warn("You can only use this method on one element at a time"); }

        // manipulate if options are available
        if (isObj(options)) {
            manipulate(elem, options);
        }
    }
}

export default prev;