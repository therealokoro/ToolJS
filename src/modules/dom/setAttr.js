import ToolJS from "../main";
// import deps module
import { Logs, getElement, cToA, manipulate } from "../deps";
import Obj from "../obj";
import isString from "../str/isString";

/**
 * This method takes in an object of attributes with values and sets each on an element or an array of elements
 * @method module:DOM.setAttr
 * @param {String|HTMLElement|Array<string|HTMLElement>} el
 * Could be a valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elements
 * @param {Object} attr A key to pair objcet of attributes and values
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
 * @returns {HTMLElement|Array<HTMLElement>} -  The elements whose attributes were set
 * @example
 * // this sets the id and title attributes of the element
 * DOM.setAttr("#p", {
 *     id: "newElem1",
 *     title: "ToolJS is awesome"
 * });
 * 
 DOM.setAttr("#p", "id", "myNewId");
 */
const setAttr = (el, attr, options) => {
    var debugging = ToolJS.env.debugging;
    // @ts-ignore
    var elem = getElement(el);
    var elemArr = cToA(elem);

    elemArr.forEach(el => { _attr(el); });

    function _attr(el) {
        if(attr){
            if (Obj.isObj(attr)) {
                Obj.forEach(attr, (name, value) => {
                    el.setAttribute(name, value);
                });
            }
            else if(isString(attr) && isString(options)){
                el.setAttribute(attr, options);
            }
            else{ if(debugging) Logs.throw("The attr parameter must be an object literal"); }
        }
    }

    if(Obj.isObj(options)){ manipulate(elem, options); }

    return elem;
}

export default setAttr;