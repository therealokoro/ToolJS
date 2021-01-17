import { getElement, cToA, manipulate } from "../deps";
import Obj from "../obj";

// import setAttr and removeAttr
import setAttr from "./setAttr";
import removeAttr from "./removeAttr";
/**
 * This method manipulates an elements attributes, it adds, updates and removes attributes of an element.
 * @method module:DOM.attr
 * @param {String|HTMLElement|Array<String|HTMLElement>} el
 * Could be a valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elements
 * If left empty, the value of all the elements attributes will be retured as an object
 * @param {Object|ToolJSNodeListManipulator} [options] A key to pair object that specifies the two operations that can be carried out on a DOM element's attribute
 * @param {Object} [options.set] A key to pair object that updates already existing attributes of an element or creates new ones
 * @param {String|Array<String>} [options.remove] A single attribute or an array of attributes to be removed from the element
 * @returns {HTMLElement|Object} the element or elements whose attributes were manipulated
 * @example
 * DOM.attr("#p", {
 *      set: {
 *          class: "some-class another-class",
 *          title: "This is a title",
 *          name: "myInput",
 *          id: "newID"
 *      },
 *      remove: ["data-color", "tabindex"], // or pass it a single string e.g "data-color"
 * });
 */
const attr = (el, options) => {
    // @ts-ignore
    var elem = getElement(el);
    var elemArr = cToA(elem);

    elemArr.forEach(el => { _attr(el); });

    function _attr(el) {
        if(Obj.isObj(options)){
            Obj.forEach(options, (key, value) => {
                if (key == "set") { setAttr(el, value); }
                if(key == "remove"){ removeAttr(el, value); }
            });

        }
    }
    
    if (Obj.isObj(options)) { manipulate(elemArr, options); }

    var output = getElement(el);
    return output;
}

export default attr;