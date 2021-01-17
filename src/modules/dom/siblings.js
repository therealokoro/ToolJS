import ToolJS from '../main';
import { getElement, cToA, Logs } from "../deps";
import isObj from '../obj/isObj';

/**
 * This method returns an array containing the available sibling elements of a specified element. If none is found, then an empty array is returned.
 * @method module:DOM.siblings
 * @param {String|HTMLElement} el Could be a valid css selector string, an html element.
 * @param {ToolJSNodeListManipulator} options A key to pair object that manipulates the sibling elements.
 * @returns {Array<HTMLElement>} The element's siblings in an array.
 */
const siblings = (el, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    var output = [];

    if(!el && debugging) Logs.throw("Specify an element whose sibling elements is to be returned");

    if(el){
        var elem = getElement(el);
        var elemArr = cToA(elem);

        var elem = (elemArr.length == 1) ? elemArr[0] : elem;
        var parentChildren = elem.parentElement.children;

        for (let i = 0; i < parentChildren.length; i++) {
            const currChild = parentChildren[i];
            if (!elem.isSameNode(currChild)) { output.push(currChild); }
        }

        // manipulate if options are available
        if (isObj(options)) {
            manipulate(output, options);
        }

        return getElement(output);
    }
}

export default siblings;