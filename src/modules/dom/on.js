import ToolJS from "../main";
// import deps module
import { Logs, getElement, cToA } from "../deps";
import Obj from "../obj";
import isString from "../str/isString";

/**
 * This method binds one or more events to an element or an array of elements
 * @method module:DOM.on
 * @param {String|HTMLElement|Array<string|HTMLElement>} el
 * Could be a valid css selector string, an html element,
 * a collection of elements or an array of css selector strings and html elements
 * @param {String|Object|Array<String>} event The event to bind on the element.
 * This can be an array of events or even an object literal with each key serving as the event type and its value the callback
 * If left empty, the value of all the elements attributes will be retured as an object
 * @param {Function} [callback] The function to be called when the event is fired.
 * @param {Boolean} [useCapture=false] A Boolean value that specifies whether the events should be executed in the capturing or in the bubbling phase.
 * This can be ommited if you specify multiple events using the object literal format.
 * @returns {HTMLElement|Array<HTMLElement>} - An html element or an array of html elements
 * @example
 * // binds a click event to the "#p" element
 * DOM.on("#p", "click", function(){
 *      console.log("Fired on click event");
 * });
 *
 * // binds a click and contextmenu event to the "#p" element
 * DOM.on("#p", ["click", "contextmenu"], function(){
 *      console.log("Fired on click and contextmenu events");
 * });
 *
 * // binds a click and contextmenu event to the "#p" element separating each event with a comma
 * DOM.on("#p", "click", contextmenu", function(){
 *      console.log("Fired on click and contextmenu events");
 * });
 *
 * // binds a click, contextmenu and mouseout event to the "#p" element
 * DOM.on("#p", {
 *      click: function(){
 *          console.log("Fired on click event");
 *      },
 *      contextmenu: function(){
 *          console.log("Fired on contextmenu event");
 *      },
 *      mouseout: function(){
 *          console.log("Fired on mouseout event");
 *      }
 * });
 */
const on = (el, event, callback, useCapture = false) => {
    var debugging = ToolJS.env.debugging;
    var err1 = "The callback must be a function",
        err2 = "The event type must be a string";

    // @ts-ignore
    var elem = getElement(el);
    var elemArr = cToA(elem);

    elemArr.forEach(el => { _bind(el); });

    function _bind(el) {
        if(event){
            if (isString(event)){
                if(event.includes(",")){
                    var eventArr = event.replace(/ /g, "").split(",");
                    arrayEvents(el, eventArr, callback);
                }
                else { stringEvents(el, event, callback); }
            }
            else if(Array.isArray(event)){ arrayEvents(el, event, callback); }
            else if(Obj.isObj(event)){
                Obj.forEach(event, (eventType, func) => { stringEvents(el, eventType, func); });
            }
            else{ if(debugging) Logs.throw("The event parameter must be of type string or an object literal"); }
        }
        else { if (debugging) Logs.warn("You must specify atleast one event to bind on the element"); }
    }

    function crossBrowserBind(el, event, callback, useCapture) {
        if (document.addEventListener) { el.addEventListener(event, callback, useCapture); }
        else if (document.attachEvent) { el.attachEvent(event, callback, useCapture); }
    }

    function stringEvents(el, event, callback) {
        if (typeof callback == "function") { crossBrowserBind(el, event, callback, useCapture); }
        else { if (debugging) Logs.throw(err1); }
    }

    function arrayEvents(el, arr, callback) {
        arr.forEach(e => {
            if (isString(e)) { stringEvents(el, e, callback); }
            else { if (debugging) Logs.throw(err2); }
        });
    }

    return elem;
}

export default on;