import { ToolJSNodeList } from "../deps";
import isNodeList from "./isNodeList";
import isCollection from "./isCollection";

/**
 * This method checks if a variable or an item is actually an element
 * @method module:DOM.isEl
 * @param {DOMect} item The variable or item to test for if its an element
 * @returns {Boolean} The result of the test
 * @example
 * var myDOM = {};
 * DOM.isEl(myDOM) // returns false;
 *
 * var myElem = DOM.getEl("p");
 * DOM.isEl(myElem) // returns true;
 *
 * var myElem = document.getElementById("p");
 * DOM.isEl(myElem) // returns true;
 *
 * var myElem = document.querySelectorAll("p");
 * DOM.isEl(myElem) // returns true;
 *
 * var myElem = document.getElementsByTagName("p");
 * DOM.isEl(myElem) // returns true;
 *
 * var arr = ["item1", "item2"];
 * DOM.isEl(arr) // returns false;
 */
const isEl = (item) => {
    var arr = [HTMLElement, HTMLDocument, ToolJSNodeList];
    
    function isElement(item){
        return arr.some(arr => {
            return arr.prototype.isPrototypeOf(item);
        });
    }

    return (isNodeList(item) || isCollection(item) || isElement(item));
}

export default isEl;