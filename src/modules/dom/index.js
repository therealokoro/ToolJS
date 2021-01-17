/** This is the entry point into the DOM module */

import ToolJS from "../main";

// import all methods from their files
import getEl from "./getEl";
import css from "./css";
import styleEl from "./styleEl";
import createEl from "./createEl";
import createText from "./createText";
import text from "./text";
import html from "./html";
import cloneEl from "./cloneEl";
import getAttr from "./getAttr";
import dataAttr from "./dataAttr";
import setAttr from "./setAttr";
import removeAttr from "./removeAttr";
import replaceEl from "./replaceEl";
import removeEl from "./removeEl";
import removeChild from "./removeChild";
import attr from "./attr";
import addClass from "./addClass";
import removeClass from "./removeClass";
import hasClass from "./hasClass";
import toggleClass from "./toggleClass";
import moveEl from "./moveEl";
import on from "./on";
import isEl from "./isEl";
import isCollection from "./isCollection";
import isNodeList from "./isNodeList";
import getStyle from "./getStyle";
import each from "./each";
import find from "./find";
import next from "./next";
import prev from "./prev";
import firstChildEl from "./firstChildEl";
import lastChildEl from "./lastChildEl";
import siblings from "./siblings";
import wrap from "./wrap";
import childrenEl from "./childrenEl";
import height from "./height";
import width from "./width";
import offset from "./offset";

/**
 * This module contains methods and functions that can be used to manipulate DOM elements See {@tutorial dom-tuts}
 * @tutorial dom-tuts
 * @module DOM
 * @since v1.0.0
 */

const DOM = {
    addClass: addClass,
    attr: attr,
    childrenEl: childrenEl,
    cloneEl: cloneEl,
    createEl: createEl,
    createText: createText,
    css: css,
    dataAttr: dataAttr,
    each: each,
    find: find,
    firstChildEl: firstChildEl,
    getAttr: getAttr,
    getEl: getEl,
    getStyle: getStyle,
    hasClass: hasClass,
    height: height,
    html: html,
    lastChildEl: lastChildEl,
    isCollection: isCollection,
    isEl: isEl,
    isNodeList: isNodeList,
    moveEl: moveEl,
    next: next,
    offset: offset,
    on: on,
    prev: prev,
    setAttr: setAttr,
    siblings: siblings,
    styleEl: styleEl,
    removeAttr: removeAttr,
    removeChild: removeChild,
    removeClass: removeClass,
    removeEl: removeEl,
    replaceEl: replaceEl,
    text: text,
    toggleClass: toggleClass,
    width: width,
    wrap: wrap,
}

/**
 * @typedef {Object} ToolJSNodeListManipulator - This defines a of key to pair object which manipulates DOM elements in a [ToolJSNodeList]{@link ToolJSNodeList} instance.
 * This options help to do a quick manipulation on the DOM element(s). The options object is usually the last parameter of the methods in the DOM module.
 * All methods in the DOM module have this parameter except <code>dataAttr()</code>, <code>each()</code>, <code>on()</code>, <code>off()</code>, <code>isNodeList()</code>, <code>isCollection()</code>, <code>removeChild()</code>, <code>removeEl()</code>, <code>offset()</code> and <code>isEl()</code>
 * It comes with a set of pre-defined properties, while the rest are the same properties every DOM element has in your native javascript such as "id", "className", "title", "tabIndex" etc.
 *
 * Below are a list of the pre-defined properties available
 *
 * @property {Object} [insertBefore] - This options moves the element using the insertBefore method.
 * @property {Object} [insertAfter] - This options moves the element using the insertAfter method.
 * @property {Object} [appendTo] - This options moves the element using the appendTo method.
 * @property {String} [css] - Adds a css style string to an element. E.g "color: red; font-size: 40px".
 * @property {Object} [style] - Accepts an object of javascript style properties and values. E.g {color: "red", fontSize: "40px"}.
 * @property {Object} [children] - Manipulates the children of the reference element.
 * It takes any option in the <code>ToolJSNodeListManipulator</code> object. It basically replicates the [.childrenEl]{@link module:DOM.childrenEl} method.
 * @property {Object} [siblings] -  Manipulates the siblings of the reference element, replicating the [.siblings]{@link module:DOM.siblings} method and also providing two(2) options.
 * It accepts an objcet itself as a value, and if passed a valid css selector string as key of one of its object properties, then a matching element is looked for and returned for manipulation.
 * @property {Object} [siblings.next] - This returns the next sibling of an element for manipulation using the <code>ToolJSNodeListManipulator</code> object options.
 * @property {Object} [siblings.prev] - This returns the previous sibling of an element for manipulation using the <code>ToolJSNodeListManipulator</code> object options.
 * @property {Object} [classList] - This manipulates the classList of an element. It accepts an object with two(2) pre-defined properties.
 * @property {String|Array<String>} [add] - This specifes a list of classes to be added to the element
 * @property {String|Array<String>} [remove] - This specifes a list of classes to be removed from the element
 * @property {Object} [create] - This option also accepts an object with each key serving as the element tag to be created and its value serves as the properties of the element, which can include any of the <code>ToolJSNodeListManipulator</code> object options.
 * @property {String|Array<String>} [removeChild] - This specifies a list of child elements to be removed from the reference element.
 * @property {Object} [events] - This option accepts an object which is used to set multiple event listeners on the element by specifing each event as the property key, and the callback function as the property value.
 * @property {Object} [attr] - This options accepts an object which manipulates the attributes of the reference element. It comes with two(2) pre-defined properties.
 * @property {Object} [attr.set] - This options accepts an object with each property key representing an attribute to be set(whether a new or already existing attribute), and the property value, being the attribute's value.
 * @property {String|Array<String>} [attr.remove] - This options accepts either an array of strings or a single string containing an attribute that is to be removed from the element.
 * @property {Object} [move] - This options accepts an object which specifies how the reference element is to be moved through the property key and where its to be moved to through the property value. It comes with three pre-defined options which you are expected to use only one.
 * @property {Object} [move.insertBefore] - This options moves the element using the insertBefore method.
 * @property {Object} [move.insertAfter] - This options moves the element using the insertAfter method.
 * @property {Object} [move.appendTo] - This options moves the element using the appendTo method.
 * @property {Object} [move.prependTo] - This options moves the element using the prependTo method.
 */


// register the DOM object as a module in the library
var ToolJSModules = ToolJS.modules;
ToolJSModules.DOM = DOM;

// export the DOM object as the default export
export default DOM;