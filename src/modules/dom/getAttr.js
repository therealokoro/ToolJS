import ToolJS from "../main";
import { Logs, getElement, cToA, manipulate } from "../deps";
import isString from "../str/isString";

/**
 * Returns the value of a specified attribute from an element or an array of elements
 * @method module:DOM.getAttr
 * @param {String|HTMLElement|Array<string|HTMLElement>} el
 * Could be a valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elements
 * @param {String} [attr] The attribute whose value is to be returned.
 * If left empty, the value of all the elements attributes will be retured as an object
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
 * @returns {String|Object} - The attributes value or an objects of attributes
 * @example
 * // this returns the value of the id attribute of the element
 * var val = DOM.getAttr("#p", "id");
 *
 * // this returns the value of all the set attributes of the element
 * var val = DOM.getAttr("#p");
 */
const getAttr = (el, attr, options) => {
    var debugging = ToolJS.env.debugging;
    var attrArr = [], output;

    if(!el && debugging) Logs.throw("Specify an element whose attribute is to be returned");
    
    // @ts-ignore
    var elem = getElement(el);
    var elemArr = cToA(elem);

    elemArr.forEach(el => { _attr(el); });

    function _attr(el) {
        if(attr){
            if (isString(attr)){
                var attrValue = el.getAttribute(attr);
                attrArr.push(attrValue);
            }
            else{ if(debugging) Logs.throw("The attr parameter must be of type string"); }
        }
        else{
            var allAttributes = el.attributes;
            var attrObj = {};
            
            for (let i = 0; i < allAttributes.length; i++) {
                const currAttr = allAttributes[i];
                attrObj[currAttr.name] = currAttr.value;
            }

            attrArr.push(attrObj);
        }
    }

    if(options != null){ manipulate(elem, options); }

    output = (attrArr.length == 1) ? attrArr[0] : attrArr;

    return output;
}

export default getAttr;