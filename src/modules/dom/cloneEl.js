// import deps module
import { Logs, getElement, cToA, manipulate } from "../deps";
import Obj from "../obj";
import isNum from "../num/isNum";

/**
 * This method clones an element or an array of elements. 
 * It gives you the option of deep cloning(i.e clone children) or just the element itself.
 * By default, deepClone is used on the element, which means both the elements children are cloned.
 * @method module:DOM.cloneEl
 * @param {String | String[]} el A valid css selector string or an array of strings and elements representing an HTML element
 * @param {Object|ToolJSNodeListManipulator} [options] A key to pair object that specifies how the element(s) are cloned. 
 * If passed a boolean, then its sts the <code>deepClone</code> parameter and if passed a number, its sets the clone <code>count</code> parameter
 * @param {Object} [options.deepClone=true] Specifies whether to clone both the elements children
 * @param {Number} [options.count=1] Specifies the number of times the clone is made.
 * @param {Number} [cloneCount=1] This also optionally specifies the number of times the clone is made.
 * @returns {HTMLElement|Array<HTMLElement>} an html element or an array of elements
 * @example
 * // returns a single clone of each element in the array
 * var myClones = DOM.cloneEl(["h4", "p", "#myDiv1"]);
 * 
 * // returns a single clone of the "div" element without its children
 * var myClone = DOM.cloneEl("#myDiv1", false, 1);
 * 
 * // returns 2 clones of the "div" element without its children and appends them to "#newDiv"
 * var myClone = DOM.cloneEl("#myDiv1", {
 *     deepClone: false,
 *     count: 2,
 *     appendTo: "#newDiv"
 * });
 */
const cloneEl = (el, options, cloneCount) => {
    // check debugging status
    var output, cloneArr = [], elem;
    var deepClone = true, count = 1;

    if (!el) { Logs.throw("Specify an element or an array of elements to be cloned"); }

    var elem = getElement(el);
    var elemArr = cToA(elem);

    if (Obj.isObj(options)) {
        // @ts-ignore
        if (typeof options.deepClone == "boolean"){ deepClone = options.deepClone; }
        if (isNum(options.count)){ count = options.count; }

        if (typeof options == "boolean") { deepClone = options }
        if (isNum(options)) { count = options }
        if (typeof options == "boolean" && typeof isNum(cloneCount) == "number") { 
            deepClone = options; count = cloneCount;
        }
    }

    elemArr.forEach(el => { _clone(el); });

    function _clone(el) {
        for (let i = 0; i < count; i++) {
            var newClone = el.cloneNode(deepClone);
            cloneArr.push(newClone);
        }
    }

    if(Obj.isObj(options)){
        manipulate(cloneArr, options);
    }

    cloneArr = getElement(cloneArr);
    output = (cloneArr.length == 1) ? cloneArr[0] : cloneArr;

    return output;
}

export default cloneEl;