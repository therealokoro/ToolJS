import ToolJS from "../main";
// import deps module
import { Logs, getElement, cToA, manipulate } from "../deps";
import isObj from "../obj/isObj";
import Str from "../str";

/**
 * This method clones an element or an array of elements. 
 * It gives you the option of deep cloning(i.e clone children) or just the element itself.
 * By default, deepClone is used on the element, which means both the elements children are cloned.
 * @method module:DOM.replaceEl
 * @param {String|HTMLElement} el A valid css selector string or an array of strings and elements representing an HTML element
 * @param {String|HTMLElement|Array<String|HTMLElement>} newEl The replacement element. Could be a valid css selector, or a valid html string which will create the element
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the replacement element.
 * @returns {HTMLElement|Array<HTMLElement>} an html element or an array of elements
 * @example
 * // replaces the first "p" element found 
 * // with the first "div" element found and returns the "div"
 * var myDiv = DOM.replaceEl("p", "div");
 */
const replaceEl = (el, newEl, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    var newElem;

    if (!el && debugging) { Logs.throw("Specify an element or an array of elements to be cloned"); }

    // @ts-ignore
    var elem = getElement(el);

    if(elem.length){
        elem = elem[0];
        if(debugging) Logs.warn("You can only replace one element at a time");
    }
    var elemArr = cToA(elem);

    elemArr.forEach(el => { _replace(el); });

    function _replace(el) {
        if(newEl){
            if(Str.isString(newEl)){
                if (Str.startsWith(newEl, "<") && Str.endsWith(newEl, ">")) {
                    var tempDiv = document.createElement("div");
                    tempDiv.innerHTML = newEl;
                    newElem = tempDiv.children[0];
                }
                else {
                    newElem = getElement(newEl);
                }
            }
            else if(!isObj(newEl)){
                // @ts-ignore
                newElem = getElement(newEl);
            }
            else {
                if (debugging) Logs.throw("The newEl parameter must either be a string or an html element");
            }
        }
        else{
            if(debugging) Logs.throw("You must provide a new element to replace the old element with");
        }

        if (newElem.length) {
            newElem = newElem[0];
            if (debugging) Logs.warn("You can only replace an element with one element");
        }

        parent = el.parentElement;
        // @ts-ignore
        parent.replaceChild(newElem, el);
    }

    if(isObj(options)){
        // @ts-ignore
        manipulate(newElem, options);
    }

    return newElem;
}

export default replaceEl;