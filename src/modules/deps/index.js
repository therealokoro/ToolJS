import ToolJS from "../main";
import Obj from "../obj";

/**
 * Converts an HTMLCollection or NodeList to an array of its elements
 * @param {HTMLCollection|NodeList} c An HTMLCollection or HTMLNodelist
 * @param {Array} [a] An array to store elements in
 * @private
 */
export const cToA = (c, a) => {
    // initialise the output array
    var elemArr = [];

    if(Array.isArray(c)){ elemArr = c; }
    else{
        if (c.length == 1) {
            // if there is only one element in the collection push that element to the array
            elemArr.push(c[0]);
        }
        else if (c.length > 1) {
            // if there are more than one element in the collection push each to the array
            for (let x = 0; x < c.length; x++) { elemArr.push(c[x]); }
        }
        else if (c.length == undefined) { elemArr.push(c); }
    }

    if (a) {
        elemArr.forEach(currVal => {
            // foreach node in the elemArr that is not in the given output array, push it in
            if (a.indexOf(currVal) == -1) { a.push(currVal); }
        });
    }
    else {
        return elemArr;
    }
}

/**
 * Defines a set of methods for logging out messages
 * @private
 */
export const Logs = {
    log: (msg) => { console.log(msg) },
    warn: (msg) => { console.warn(msg) },
    error: (msg) => { console.error(msg) },
    debug: (msg) => { console.debug(msg) },
    info: (msg) => { console.info(msg) },
    throw: (msg) => { throw new Error(msg) },
}

/**
 * Gets an element of a collection of elements from the DOM
 * @param {String|Array|HTMLCollection|NodeList} selector element to get
 * @param {String|HTMLElement|HTMLCollection|NodeList} [from=document] where to get the elemet
 * @returns {Object|HTMLElement} an element or an object of elements
 * @private
 */
export const getElement = (selector, from) => {
     // declare used variable
    var elemArr = [], elemCollection, returnVal, scope,
        err3 = "Selector must be either a valid css selector or an HTML element or collection";
    var debugging = ToolJS.env.debugging;

    if(from){
        if (typeof from == "object" && !Obj.isObj(from)) {
            scope = from;
        }
        else if(typeof from == "string"){
            scope = document.querySelectorAll(from);
            scope = (scope.length == 1) ? scope[0] : scope;
        }
        else{
            if(debugging){ Logs.throw("The 'from' paramter must either hold a reference to a DOM element or a valid css selector string") };
        }
    } else{ scope = document; }

    if(selector){
        if (ToolJSNodeList.prototype.isPrototypeOf(selector)){ elemArr = selector; }
        else{
            if(Array.isArray(selector)){
                selector.forEach(currSelector => {
                    if (typeof currSelector == "object" && !Obj.isObj(currSelector)) { cToA(currSelector, elemArr); }
                    else if (typeof currSelector == "string") { _selectorIsString(currSelector) }
                    else { if (debugging) Logs.throw(err3); }
                });
            }
            else if( typeof selector == "object" && !Obj.isObj(selector) ){ cToA(selector, elemArr); }
            else if( typeof selector == "string"){ _selectorIsString(selector) }
            else{ if(debugging) Logs.throw(err3); }
        }
    }

    function _selectorIsString(string) {
        var elements = scope.querySelectorAll(string);
        if (elements.length == 0) {
            Logs.warn(`The selector '${string}' did not match any element in the DOM, or was specified under the wrong parent`)
        } else { cToA(elements, elemArr); }
    }

    elemCollection = new ToolJSNodeList(elemArr);
    elemArr.forEach(element => { elemCollection.push(element); });
    returnVal = (elemCollection.length == 1) ? elemCollection[0] : elemCollection;

    return returnVal;
};

/**
 * manipulates an array of elements or a single element
 * @param {Array|HTMLElement|Object} elem The element(s) to manipulate
 * @param {string} options A key to pair value object of manipulation options
 * @private
 */
export const manipulate = (elem, options) => {
    // check if error logging is enabled
    var debugging = ToolJS.env.debugging;
    // get the DOM methods
    var domMethods = ToolJS.export("DOM");
    var elements = (Array.isArray(elem)) ? [...elem] : [elem];

    // check option parameter type
    if (!Obj.isObj(options) && debugging) {
        Logs.throw("Options must be a key to pair value object");
    }

    function actions(elem) {
        var parent, sibling;

        Obj.forEach(options, function (property, value) {
            if (property == "appendTo") {
                parent = getElement(value);
                parent.appendChild(elem);
            }
            else if (property == "insertBefore") {
                sibling = getElement(value);
                parent = sibling.parentElement;
                parent.insertBefore(elem, sibling);
            }
            else if (property == "insertAfter") {
                sibling = getElement(value);
                sibling.insertAdjacentElement("afterend", elem);
            }
            else if (property == "classList") {
                if (Obj.isObj(value)) {
                    if (value.add) { domMethods.addClass(el, value); }
                    if (value.remove) { domMethods.removeClass(el, value); }
                }
            }
            else if (property == "siblings") {
                var currSibling, parent = elem.parentElement;
                if(Obj.isObj(value)){
                    Obj.forEach(value, (key, val) => {
                        if (key == "next") { currSibling = elem.nextElementSibling; }
                        else if (key == "prev") { currSibling = elem.previousElementSibling; }
                        else { currSibling = parent.querySelector(key); }

                        if (currSibling != undefined) { manipulate(currSibling, val); }
                        else {
                            var parentChildren = parent.children;
                            for (let i = 0; i < parentChildren.length; i++) {
                                const currChild = parentChildren[i];
                                if (!elem.isSameNode(currChild)) { manipulate(currChild, value) }
                            }
                        }
                    });
                }
            }
            else if (property == "create") {
                if(Obj.isObj(value)){
                    Obj.forEach(value, (tag, opt) => {
                        var newEl = domMethods.createEl(tag, opt);
                        elem.appendChild(newEl);
                    });
                }
            }
            else if (property == "move") { domMethods.moveEl(elem, value); }
            else if (property == "style") { domMethods.styleEl(elem, value); }
            else if (property == "css") { domMethods.css(elem, value); }
            else if (property == "attr") { domMethods.attr(elem, value); }
            else if (property == "events") { domMethods.on(elem, value); }
            else if (property == "removeChild") { domMethods.removeChild(elem, value); }
            else if (property == "children") { domMethods.childrenEl(elem, value); }
            else {
                elem[property] = value;
            }
        });
    }

    // loop through the elements and manipulate them
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        var b = actions(el);
    }
}

/**
 * @param {any} a Parameter one
 * @param {any} b Parameter two
 */
export const resolveParam = (a, b) => {
    var optionsObj;

    // resolve the option param
    if (Obj.isObj(a)) {
        optionsObj = a;
    }
    else if (Obj.isObj(b)) {
        optionsObj = b;
    }

    return optionsObj;
}

/**
 * Deep spread all the content of a spread parameter into a new array
 * @param {Array} arr The spread parameter
 * @param {String} type The data type
 * @param {String} [msg] The optional error message
 * @private
 */
export const spreadToArr = (arr, type, msg, debugging) => {
    var output = [];

    function checkType(value, type){ return typeof value === type; }
    
    arr.forEach(curr => {
        if (Array.isArray(curr)) {
            curr.forEach(currVal => {
                if (checkType(currVal, type)) { output.push(currVal); }
                else { if (debugging) Logs.warn(msg) }
            });
        }
        else if (checkType(curr, type)) { output.push(curr); }
        else { if (debugging) Logs.warn(msg) }
    });

    return output;
};

/**
 * ToolJSNodeList returns an array which holds the elements of a DOM fetched using {@link module:DOM.getEl} method.
 * It registers all available method in the DOM module to each element in that array. It also registers a new the DOM methods to the array instance itself
 * @memberof module:DOM
 */
export function ToolJSNodeList(arr) {
    // get the DOM methods
    var domMethods = ToolJS.export("DOM");
    var excludeMethods = ["createEl", "createText", "isCollection", "isNodeList", "isEl"];

    // register a new set of prototypes to the collection
    Obj.forEach(domMethods, (method, func) => {
        if(!excludeMethods.includes(method)){
            ToolJSNodeList.prototype[method] = function (...args) {
                return func(arr, ...args);
            };
        }
    });

    return this;
}

ToolJSNodeList.prototype = Object.create(Array.prototype);