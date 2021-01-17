import ToolJS from '../main';
import { getElement, cToA, Logs, manipulate } from "../deps";
import isObj from '../obj/isObj';

/**
 * This method returns an array containing the available child elements of a specified element. If none is found, then an empty array is returned.
 * @method module:DOM.childrenEl
 * @param {String|HTMLElement} el Could be a valid css selector string, an html element.
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the children elements.
 * @returns {Array<HTMLElement>} The element's children in an array.
 */
const childrenEl = (el, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    var output = [];

    if(!el && debugging) Logs.throw("Specify an element whose children is to be returned");

    if(el){
        var elem = getElement(el);
        var elemArr = cToA(elem);

        var elem = (elemArr.length == 1) ? elemArr[0] : elem;
        var elemChildren = elem.children;

        for (let i = 0; i < elemChildren.length; i++) {
            const currChild = elemChildren[i];
            output.push(currChild);
        }

        // manipulate if options are available
        if (isObj(options)) {
            manipulate(output, options);
        }

        return getElement(output);
    }
}

export default childrenEl;