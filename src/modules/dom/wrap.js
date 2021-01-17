import ToolJS from '../main';
import { getElement, cToA, Logs } from "../deps";
import isObj from '../obj/isObj';
import createEl from './createEl';

/**
 * This method wraps a given element with a new element specified as a string and returns it back.
 * @method module:DOM.wrap
 * @param {String|HTMLElement} el The element to be wrapped. Could be a valid css selector string, an html element
 * @param {String} wrapper The element to be wrapped. Could be a valid css selector string, an html element
 * @param {ToolJSNodeListManipulator} options A key to pair object that manipulates the returned element.
 * @returns {HTMLElement} The wrapped element.
 */
const wrap = (el, wrapper, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    if(!el && wrapper && debugging) Logs.throw("Specify an element whose wrap sibling is to be returned");

    if(el){
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(currEl => {
            if (wrapper) {  
                var wrapEl = createEl(wrapper, {
                    insertBefore: currEl
                });
                wrapEl.appendChild(currEl);
            }
        });

        // manipulate if options are available
        if (isObj(options)) {
            manipulate(elemArr, options);
        }
    }

    return getElement(el);
}

export default wrap;