import ToolJS from "../main";
// import deps module
import { Logs, getElement, cToA } from "../deps";
import Obj from "../obj";
import isString from "../str/isString";

/**
 * Returns the value of a specified data attribute from an element or an array of elements.
 * It can also be used to set mulitple data attributes in an object literal form
 * @method module:DOM.dataAttr
 * @param {String|HTMLElement|Array<string|HTMLElement>} el
 * Could be a valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elements
 * @param {String|Object} [attr] The data attribute whose value is to be returned.
 * If left empty, the value of all the elements data attributes will be retured as an object.
 * You can optionally pass it an object of data attributes to set or change on the element
 * @returns {String|Object} - The data attributes value or an objects of attributes
 * @example
 * // this sets the data-color and data-text attributes of the element
 * DOM.dataAttr("#p", {
 *     color: "red",
 *     text: "ToolJS is awesome"
 * });
 * 
 * // this returns the value of the data-color attribute of the element
 * var val = DOM.dataAttr("#p", "color");
 * 
 * // this returns the value of all the data attributes of the element
 * var val = DOM.dataAttr("#p");
 */
const dataAttr = (el, attr) => {
    var debugging = ToolJS.env.debugging;
    var attrArr = [], output;

    if(!el && debugging) Logs.throw("Specify an element to work on");
    
    // @ts-ignore
    var elem = getElement(el);
    var elemArr = cToA(elem);

    elemArr.forEach(el => { _attr(el); });

    function _attr(el) {
        if(attr){
            if(isString(attr)){
                var attrValue = el.dataset[attr];
                attrArr.push(attrValue);
            }
            else if(Obj.isObj(attr)){
                Obj.forEach(attr, (name, value) => {
                    el.dataset[name] = value;
                });
            }
            else{ if(debugging) Logs.throw("The attr parameter must be of type string"); }
        }
        else{
            var allAttributes = el.dataset;
            var attrObj = {};

            for (const name in allAttributes) {
                const value = allAttributes[name];
                attrObj[name] = value;
            }

            attrArr.push(attrObj);
        }
    }

    if(attrArr.length != 0){ output = (attrArr.length == 1) ? attrArr[0] : attrArr; }
    else{ output = elem; }

    return output;
}

export default dataAttr;