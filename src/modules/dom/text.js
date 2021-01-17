import ToolJS from "../main";
// import deps module
import { Logs, cToA, getElement, manipulate } from "../deps";
import isObj from "../obj/isObj";

/**
 * This method replaces the innertext of an element or an array of elements with a new text.
 * If the text paramter is omitted, then it returns the elements innertext for a single element,
 * and an array of innertext for more than one element
 * @method module:DOM.text
 * @param {String|Array<String|HTMLElement>} [el] A single element or an array of elements to replace the text
 * @param {*} [text] The replacement text for the element(s). If passed a function, the return value of the fuction is used.
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned.
 * @returns {String|Array|HTMLElement} The element/set of elements or the innertext.
 * @example
 * // changes the innertext of the p element and returns the p element
 * // you can pass it an array of selectors to multiple elements
 * var myP = DOM.text("p", "ToolJS Rocks");
 * 
 * // returns the innertext of the p elemen
 * var myP = DOM.text("p");
 * 
 * // returns an array containing the innertext of all h3, and p elements
 * var myP = DOM.text(["h3", "p"]);
 */
const text = (el, text, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    var elem, elemArr, output, textArr = [], opt;

    if (!el && debugging) { Logs.throw("Specify an element to either get its innertext or change it"); }

    // if the el parameter is not an object literal, continue execution
    var elem = getElement(el);
    elemArr = cToA(elem);
    
    // resolve manipulation option
    if (isObj(text)) { opt = text; }
    else if (isObj(options)) { opt = options; }

    elemArr.forEach(el => { _text(el); });

    function _text(currEl) {
        if(text){
            if (typeof text == "function") { currEl.innerText = text(); }
            else{ currEl.innerText = text; }
        }
        // if the text parameter is empty then push the innertext of each element into an array
        else{ textArr.push(currEl.innerText); }
    }

    // manipulate the elements if options are available
    if(opt != null){ manipulate(elem, opt); }

    if(textArr.length != 0){
        output = (textArr.length == 1) ? textArr[0] : textArr;
    }
    else{ output = elem; }

    return output;
}

export default text;