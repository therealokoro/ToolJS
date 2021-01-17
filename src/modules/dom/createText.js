import ToolJS from "../main";
// import deps module
import { Logs, getElement } from "../deps";
import Obj from "../obj";
import isString from "../str/isString";

/**
 * This method creates a textnode by accepting a string as the first paramter
 * and manipulates the textnode using a set of options provided(optional)
 * @method module:DOM.createText
 * @param {String} text A textnode to be created
 * @param {Object|ToolJSNodeListManipulator} [options] A key to pair object that specifies where and how to place the textnode.
 * @param {String|HTMLElement} [options.appendTo] An element to append the  createdtextnode to.
 * @param {String|HTMLElement} [options.prependTo] An element to prepend the created textnode to.
 * @param {String|HTMLElement} [options.insertBefore] An element to insert the created textnode before.
 * @param {String|HTMLElement} [options.insertAfter] An element to insert the created textnode after.
 * @returns {Text} The textnode created
 * @example
 * // creates a textnode, and inserts it before the p element in the h2 element
 * var text = DOM.createText("Clean Bandit", {
 *      insertBefore: "h2 p"
 * });
 */
const createText = (text, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    var textNode, parent, sibling, newTextContent;

    if (!text) { Logs.throw("Specify a text node to be created"); }

    if (isString(text)) {
        textNode = document.createTextNode(text);
        newTextContent = textNode.textContent;

        if (options) {
            Obj.forEach(options, (type, dest) => {
                if (type == "appendTo") {
                    if(dest == "body"){
                        parent = document.createElement("p");
                        parent.appendChild(textNode);
                        document.body.appendChild(parent);
                    }
                    else{
                        parent = getElement(dest);
                        parent.appendChild(textNode);
                    }
                }
                else if (type == "prependTo") {
                    parent = getElement(dest);
                    var firstChild = parent.firstElementChild;
                    firstChild.insertAdjacentText("beforebegin", newTextContent);
                }
                else if (type == "insertBefore") {
                    sibling = getElement(dest);
                    parent = sibling.parentElement;
                    parent.insertBefore(newTextContent, sibling);
                }
                else if (type == "insertAfter") {
                    sibling = getElement(dest);
                    sibling.insertAdjacentText("afterend", newTextContent);
                }
            })
        }
    }
    else if (!isString(text) && debugging) {
        Logs.throw("Textnode to be created must be a string");
    }

    return textNode;
}

export default createText;