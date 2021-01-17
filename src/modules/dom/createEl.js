import ToolJS from "../main";
// import deps module
import { Logs, manipulate, cToA, getElement } from "../deps";
import Str from "../str";

/**
 * This method accepts either a string or an array of strings representing an HTML element
 * and creates an element for each string and manipulates the elements using a set of options provided(optional)
 * @method module:DOM.createEl
 * @param {String | String[]} tag A string or an array of strings representing an HTML element to be created
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) created
 * @returns {HTMLElement|Array<HTMLElement>} an html element or an array of elements
 * @example
 * // creates a h4 element gives it some properties, and appends it to the "body"
 * var myElem = DOM.createEl("h4", {
 *      innerText: "This was created programmatically",
 *      className: "myNewElem",
 *      id: "newElem",
 *      title: "I was just created",
 *      appendTo: "body" // other alternative to appendTo includes "insertAfter", "insertBefore", 
 * });
 * 
 * // create a h4, p and a div element
 * var myElems = DOM.createEl(["h4", "p", "div"]);
 * 
 * // you can pass it an html string and it will create the element
 * DOM.createEl("<div class='myElem'>This was just <b>created</b>", {
 *      appendTo: "body"
 * });
 */
const createEl = (tag, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    var elemArr = [], elem;

    if (!tag) { Logs.throw("Specify a tag representing an HTML element to be created"); }

    if (Array.isArray(tag)) {
        tag.forEach(currStr => {
            if(Str.isString(currStr)){
                var newElem = stringCreate(currStr);
                elemArr.push(newElem);
            }
            else{ if(debugging) Logs.warn("Tag must be a string representing an HTML element"); }
        });
    }
    else if (Str.isString(tag)) {
        var newElem = stringCreate(tag);
        elemArr.push(newElem);
    }
    else { if (debugging) Logs.warn("Tag must be a string or an array of strings representing an HTML element"); }

    function stringCreate(str) {
        var firstChar = Str.firstChar(str);
        var lastChar = Str.lastChar(str);

        if (firstChar == "<" && lastChar == ">") {
            var tempDiv = document.createElement("div");
            tempDiv.innerHTML = str;
            elem = tempDiv.children[0];
        }
        else { elem = document.createElement(str); }
        return elem;
    }

    if (options) { manipulate(elemArr, options); }

    elem = getElement(elemArr);
    return elem;
}

export default createEl;