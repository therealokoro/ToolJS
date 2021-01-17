// import deps module
import { Logs, cToA, getElement, manipulate } from "../deps";
import Obj from "../obj";

/**
 * This method replaces the innerHTML of an element or an array of elements with a new html.
 * If the html paramter is omitted, then it returns the elements innerHTML for a single element,
 * and an array of innerHTML for more than one element
 * @method module:DOM.html
 * @param {String|Array<String|HTMLElement>} [el] A single element or an array of elements to replace the html
 * @param {String} [html] An html string to replace the elements innerHTML with
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
 * @returns {String|Array|HTMLElement} The element/set of elements or the innerHTML
 * @example
 * // changes the innerHTML of the p element and returns the p element
 * // you can pass it an array of selectors to multiple elements
 * var myP = DOM.html("p", "Clean Bandit");
 * // returns the innerHTML of the p elemen
 * var myP = DOM.html("p");
 * // returns an array containing the innerHTML of all h3, and p elements
 * var myP = DOM.html(["h3", "p"]);
 */
const html = (el, html, options) => {
    var elem, elemArr, output, htmlArr = [], opt;

    if (!el) { Logs.throw("Specify an element to either get its innerHTML or change it"); }

    // if the el parameter is not an object literal, continue execution
    var elem = getElement(el);
    elemArr = cToA(elem);

    // resolve manipulation option
    if (Obj.isObj(html)) { opt = html; }
    else if (Obj.isObj(options)) { opt = options; }

    elemArr.forEach(el => { _html(el); });

    function _html(currEl) {
        if (html) {
            if (typeof html == "function") { currEl.innerHTML = html(); }
            else { currEl.innerHTML = html; }
        }
        // if the html parameter is empty then push the innerHTML of each element into an array
        else { htmlArr.push(currEl.innerHTML); }
    }

    // manipulate the elements if options are available
    if (opt != null) { manipulate(elem, opt); }

    if (htmlArr.length != 0) {
        output = (htmlArr.length == 1) ? htmlArr[0] : htmlArr;
    }
    else { output = elem; }

    return output;
}

export default html;