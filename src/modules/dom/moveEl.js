import ToolJS from "../main";
// import deps module
import { getElement, cToA, Logs, manipulate } from "../deps";
import Obj from "../obj";

/**
 * This method moves an element or an array of elements from their current location in the DOM to another location
 * @method module:DOM.moveEl
 * @param {String|Array<String|HTMLElement>|HTMLElement} el
 * A valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elments
 * @param {Object|ToolJSNodeListManipulator} options An object literal that specifies the move type and destination
 * <blockquote>Note that you're expected to use only of the available options</blockquote>
 * @param {String|HTMLElement} [options.prependTo] This prepends the element to the destination(i.e makes the element first child)
 * @param {String|HTMLElement} [options.appendTo] This appends the element to the destination(i.e makes the element the last child)
 * @param {String|HTMLElement} [options.insertBefore] This places the elements before the specified element(i.e destination)
 * @param {String|HTMLElement} [options.insertAfter] This places the elements after the specified element(i.e destination)
 * @returns {HTMLElement|Object} an html element or a collection of elements
 * @example
 * // this prepends the elements to the ".dest" element
 * DOM.moveEl("#p", ".myElem", {
 *      prependTo: ".dest"
 * });
 * 
 * // this appends the elements to the ".dest" element
 * DOM.moveEl("#p", ".myElem", {
 *      appendTo: ".dest"
 * });
 * 
 * // this places the elements before of the ".dest" element
 * DOM.moveEl("#p", ".myElem", {
 *      insertBefore: ".dest"
 * });
 * 
 * // this places the elements after of the ".dest" element
 * DOM.moveEl("#p", ".myElem", {
 *      insertAfter: ".dest"
 * });
 */
const moveEl = (el, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    // get the elements and store in an array
    // @ts-ignore
    var elem = getElement(el);
    var elemArr = cToA(elem);

    elemArr.forEach(el => { _moveEl(el); });

    function _moveEl(el) {
        if(Obj.isObj(options)){
            Obj.forEach(options, (type, value) => {
                var sibling = getElement(value);
                var parent = sibling.parentElement;

                if (type == "insertBefore") {
                    parent.insertBefore(el, sibling);
                }
                else if (type == "appendTo") {
                    parent = getElement(value);
                    parent.appendChild(el);
                }
                else if (type == "prependTo") {
                    parent = getElement(value);
                    var firstChild = parent.firstElementChild;
                    firstChild.insertAdjacentElement("beforebegin", el);
                }
                else if (type == "insertAfter") {
                    sibling.insertAdjacentElement("afterend", el);
                }
                else{
                    if (debugging) Logs.warn(`'${type}' is not a supported move option. Use any of the following 'insertBefore|insertAfter|appendTo|destination'`)
                }
            });
        }
        else {
            if (debugging) Logs.warn(`The options parameter must be an object literal`);
        }
    }

    // manipulate if options are available
    if (options != null) {
        manipulate(elem, options);
    }

    return getElement(el);
}

export default moveEl;