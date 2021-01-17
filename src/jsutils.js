// @ts-nocheck

// function for downloading things
// function for creating blob
// scrollTo function
// functions for ajax requests
// create same,is function
// add createEvent function
// implement callback for each function
// add a createHTMl function to create a new page
// toggleText function
// create a Str, Date, Arr, Url, Num(isEven) module
// add a color module
// add an svg module
// add a keys and a mouse module
// add a copy,paste,cut, module
// add a social media module
// add a notification module
// add a animation module
// add an ajax/fetch module
// add a fetch module
// add type checking
// add customEl method

// Fix _toggleElems, _setActiveElem, _cloneElem(count)
// fix length and symbols in the rand function

// Utitity Functions
// 

function is_sameType(value1, value2) {
    if(is_nan(value1) || is_nan(value2)) {
        return is_nan(value1) === is_nan(value2);
    }
    return toString.call(value1) === toString.call(value2);
}

function is_nan(val) {
    return val !== val;
}

var initialDisplay;

function cToA(c, a) {
    if (c.length == 1) {
        a.push(c[0]);
    }
    else if (c.length > 1) {
        for (let x = 0; x < c.length; x++) {
            a.push(c[x]);
        }
    }
    else if (c.length == undefined) {
        a.push(c);
    }
    else if (c.length == 0) {
        throw new Error("The selector '" + c + "' does not match any element in the DOM");
    }

    return a;
}

function manipulate(selector, elem, options) {
    var funString, text, parent, sibling, currSibling, newElem, newChild, objToArray, clonedElems = [];

    if (options == "") {
        _logError("Options must be a non-empty object");
    }
    else {
        var optionKeys = Object.keys(options);
        optionKeys.forEach(function (currOptionKey) {
            var currOptionValue = options[currOptionKey];

            if (currOptionKey == "appendTo") {
                parent = _getElem(currOptionValue);
                parent.appendChild(elem);
            }
            else if (currOptionKey == "insertBefore") {
                sibling = _getElem(currOptionValue);
                parent = sibling.parentElement;
                parent.insertBefore(elem, sibling);
            }
            else if (currOptionKey == "insertAfter") {
                sibling = _getElem(currOptionValue);
                sibling.insertAdjacentElement("afterend", elem);
            }
            else if (currOptionKey == "removeChild") {
                if (Array.isArray(currOptionValue)) {
                    for (var k = 0; k < currOptionValue.length; k++) {
                        var childElem = elem.querySelector(currOptionValue[k]);
                        if (childElem == null) {
                            _error("The selector '" + currOptionValue[k] + "' does not match any child element of '" + selector + "'");
                        }
                        else {
                            _removeElem(childElem);
                        }
                    }
                }
                else {
                    var childElem = elem.querySelector(currOptionValue);
                    if (childElem == null) {
                        _error("The selector '" + currOptionValue + "' does not match any child element of '" + selector + "'");
                    }
                    else {
                        _removeElem(childElem);
                    }
                }
            }
            else if (currOptionKey == "attr") {
                if (typeof currOptionValue == "object") {
                    _setAttr(elem, currOptionValue);
                }
            }
            else if (currOptionKey == "classList") {
                if (typeof currOptionValue == "object") {
                    var classOptions = Object.keys(currOptionValue);
                    classOptions.forEach(function (currOptKey) {
                        if (Array.isArray(currOptionValue[currOptKey])) {
                            for (let j = 0; j < currOptionValue[currOptKey].length; j++) {
                                const currKeyValue = currOptionValue[currOptKey][j];
                                elem.classList[currOptKey](currKeyValue);
                            }
                        }
                        else {
                            elem.classList[currOptKey](currOptionValue[currOptKey]);
                        }
                    });
                }
            }
            else if (currOptionKey == "event") {
                if (typeof currOptionValue == "object") {
                    var eventsObj = Object.keys(currOptionValue);
                    eventsObj.forEach(function (currEvent) {
                        if (typeof currOptionValue[currEvent] == "function") {
                            elem.addEventListener(currEvent, currOptionValue[currEvent]);
                        }
                        else {
                            _logError("Specify an annonymous function to be bounded on the specified event");
                        }
                    })
                }
            }
            else if (currOptionKey == "children") {
                if (typeof currOptionValue == "object") {
                    var childOptionKeys = Object.keys(currOptionValue);
                    childOptionKeys.forEach(function (currChildKey) {
                        var currKeyValue = currOptionValue[currChildKey];

                        if (currChildKey == "add") {
                            if (typeof currKeyValue == "object") {
                                var currOptKeys = Object.keys(currKeyValue);
                                currOptKeys.forEach(function (currKey) {
                                    newChild = _createElem(currKey, currKeyValue[currKey]);

                                    var innerOptions = Object.keys(currKeyValue[currKey]);
                                    if (innerOptions.includes("appendTo") ||
                                        innerOptions.includes("insertBefore")) { }
                                    else {
                                        elem.appendChild(newChild);
                                    }
                                });
                            }
                        }
                        else if (currChildKey == "remove") {
                            if (Array.isArray(currKeyValue)) {
                                for (let j = 0; j < currKeyValue.length; j++) {
                                    const currSelector = currKeyValue[j];
                                    _removeElem(currSelector);
                                }
                            }
                        }
                        else if (currChildKey == "replace") {
                            if (Array.isArray(currKeyValue)) {
                                var oldElem = currKeyValue[0];
                                var newElem = _getElem(currKeyValue[1]);

                                _replaceElem(newElem, oldElem);
                            }
                        }
                        else {
                            currChild = elem.querySelector(currChildKey);

                            if (currChild !== null) {
                                manipulate(selector, currChild, currOptionValue[currChildKey]);
                            }
                            else if (currChild === null) {
                                childElements = elem.children;

                                for (var k = 0; k < childElements.length; k++) {
                                    manipulate(selector, childElements[k], currOptionValue);
                                }
                            }
                        }
                    });
                }
            }
            else if (currOptionKey == "create") {
                if (typeof currOptionValue == "object") {
                    var currOptKeys = Object.keys(currOptionValue);
                    currOptKeys.forEach(function (currKey) {
                        newChild = _createElem(currKey, currOptionValue[currKey]);

                        var innerOptions = Object.keys(currOptionValue[currKey]);
                        if (innerOptions.includes("appendTo") ||
                            innerOptions.includes("insertBefore")) { }
                        else {
                            elem.appendChild(newChild);
                        }
                    });
                }
            }
            else if (currOptionKey == "siblings") {
                if (typeof currOptionValue == "object") {
                    var currOptKeys = Object.keys(currOptionValue);
                    currOptKeys.forEach(function (currKey) {
                        if (currKey == "next") {
                            currSibling = elem.nextElementSibling;
                        }
                        else if (currKey == "prev" || currKey == "previous") {
                            currSibling = elem.previousElementSibling;
                        }
                        else {
                            currSibling = elem.parentElement.querySelector(currKey);
                        }

                        if (currSibling != null) {
                            manipulate(currSibling, currOptionValue[currKey]);
                        }
                        else if (currSibling == null) {
                            var parentChildren = elem.parentElement.children;

                            for (var c = 0; c < parentChildren.length; c++) {
                                if (elem.isSameNode(parentChildren[c]) == false) {
                                    manipulate(parentChildren[c], currOptionValue);
                                }
                            }
                        }
                    });
                }
            }
            else if (currOptionKey == "clone") {
                if (typeof currOptionValue == "object") {
                    objToArray = Object.keys(currOptionValue);

                    if (objToArray.includes("count")) {
                        var count = currOptionValue.count;

                        for (var i = 0; i < count; i++) {
                            clonedElems.push(_cloneElem(elem, currOptionValue));
                        }
                    }
                    else {
                        clonedElems.push(_cloneElem(elem, currOptionValue));
                    }
                }
                else if (currOptionValue == true) {
                    clonedElems.push(_cloneElem(elem));
                }
                else if (typeof currOptionValue == "number") {
                    for (var i = 0; i < currOptionValue; i++) {
                        clonedElems.push(_cloneElem(elem));
                    }
                }

                setTimeout(() => {
                    parent = elem.parentElement || elem.parentNode;
                    // clonedElems.forEach(currClonedElem => {
                    //     parent.appendChild(currClonedElem);
                    // })
                    for (var k = 0; k < clonedElems.length; k++) {
                        var currClonedElem = clonedElems[k]
                        parent.appendChild(currClonedElem);
                    }
                }, 1);
            }
            else if (currOptionKey == "style") {
                if (typeof currOptionValue == "object") {
                    _style(elem, currOptionValue);
                }
            }
            else if (currOptionKey == "css") {
                _css(elem, currOptionValue);
            }
            else if (currOptionKey == "move") {
                _move(elem, currOptionValue);
            }
            else if (currOptionKey == "text") {
                _text(elem, currOptionValue);
            }
            else {
                elem[currOptionKey] = currOptionValue;
            }
        });
    }
};

function getElement(selector) {
    /* Declare Global Variables */
    var elemArr = [];

    // Check if the selector is an object
    if (typeof selector == "object") {
        // Check if the selector is an array
        if (Array.isArray(selector)) {
            // get each index in the array
            selector.forEach(currIndex => {
                // check if current index is an object
                if (typeof currIndex == "object") {
                    if (currIndex.length == 1) {
                        elemArr.push(currIndex[0]);
                    }
                    else if (currIndex.length > 1) {
                        for (let x = 0; x < currIndex.length; x++) {
                            elemArr.push(currIndex[x]);
                        }
                    }
                    else if (currIndex.length == undefined) {
                        elemArr.push(currIndex);
                    }
                    else if (currIndex.length == 0) {
                        throw new Error("The selector '" + selector + "' does not match any element in the DOM");
                    }
                }
                // check if current index is a string
                else if (typeof currIndex == "string") {
                    var stringElem = document.querySelector(currIndex);

                    if (stringElem == null) {
                        throw new Error("The selector '" + currIndex + "' does not match any element in the DOM");
                    }
                    else {
                        elemArr.push(stringElem);
                    }
                }
            });
        }
        else {
            cToA(selector, elemArr);
        }
    }
    // Check if selector index is a string
    else if (typeof selector == "string") {
        var stringElem = document.querySelector(selector);

        if (stringElem == null) {
            throw new Error("The selector '" + selector + "' does not match any element in the DOM");
        }
        else {
            elemArr.push(stringElem);
        }
    }

    // check if the element array has only one element and return that element
    if (elemArr.length == 1) {
        return elemArr[0];
    }
    // else return all element in the array
    else {
        return elemArr;
    }
};


// _getElem: replicates document.querySelector
var _getElem = function (selector, from, options) {
    var elem, root, elemArr = [];

    // check if the selector parameter is empty
    if (!selector) {
        _logError("Specify a selector matching an element in the DOM");
    }

    // check if the from parameter is not empty
    if (from) {
        if (from === null) {
            _logError("The value specified in the 'from' parameter did not match any element in the DOM");
        }
        else if (typeof from == "object") {
            if (from == "[object Object]") {
                root = document;
            }
            else { root = from; }
        }
        else if (typeof from == "string") {
            root = document.querySelector(from);
        }
    }

    if (selector) {
        // check if the selector is a string
        if (typeof selector == "string") {
            if (from) {
                elem = root.querySelector(selector);
            } else {
                elem = document.querySelector(selector);
            }
        }
        // check if the selector is an object
        else if (typeof selector == "object") {

            // check if the selector is an array
            if (Array.isArray(selector)) {
                for (var i = 0; i < selector.length; i++) {
                    if (from) {
                        var newElem = root.querySelector(selector[i]);
                        elemArr.push(newElem);
                    } else {
                        var newElem = document.querySelector(selector[i]);
                        elemArr.push(newElem);
                    }
                }

                elem = elemArr;
            }
            else {
                elem = selector;
            }
        }
    }

    // check if the query returned null, if yes throw a new error
    if (elem === null) {
        _logError("'" + selector + "' did not match any element in the DOM, or was specified under a wrong parent");
    }
    else {
        // check if a key-to-value object was specified in the from parameter
        if (from) {
            if (typeof from == "object" && from == "[object Object]") {
                if (Array.isArray(elem)) {
                    elem.forEach(function (currElem) {
                        manipulate(selector, currElem, from);
                    })
                }
                else {
                    manipulate(selector, elem, from);
                }
            }
        }

        // check if the options paramter was not left empty
        if (options && typeof options == "object" && options == "[object Object]") {
            if (Array.isArray(elem)) {
                elem.forEach(function (currElem) {
                    manipulate(selector, currElem, from);
                })
            }
            else {
                manipulate(selector, elem, from);
            }
        }

        // return the element
        return elem;
    }
};

// _getElems: replicates document.querySelectorAll
var _getElems = function (selector, from, options) {
    var elem, root, elemArr = [];

    // check if the selector parameter is empty
    if (!selector) {
        _logError("Specify a selector matching an element in the DOM");
    }

    // check if the from parameter is not empty
    if (from) {
        if (from === null) {
            _logError("The value specified in the 'from' parameter did not match any element in the DOM");
        }
        else if (typeof from == "object") {
            if (from == "[object Object]") {
                root = document;
            }
            else { root = from; }
        }
        else if (typeof from == "string") {
            root = document.querySelector(from);
        }
    }

    if (selector) {
        // check if the selector is a string
        if (typeof selector == "string") {
            if (from) {
                try {
                    elem = root.querySelectorAll(selector);
                } catch (e) {
                    _logError("The value specified in the 'from' parameter did not match any element in the DOM");
                }
            } else {
                elem = document.querySelectorAll(selector);
            }
        }
        // check if the selector is an object
        else if (typeof selector == "object") {

            // check if the selector is an array
            if (Array.isArray(selector)) {
                for (var i = 0; i < selector.length; i++) {
                    if (from) {
                        var newElem = root.querySelectorAll(selector[i]);
                        newElem.forEach(function (currNewElem) {
                            elemArr.push(currNewElem);
                        })
                    } else {
                        var newElem = document.querySelectorAll(selector[i]);
                        newElem.forEach(function (currNewElem) {
                            elemArr.push(currNewElem);
                        })
                    }
                }

                elem = elemArr;
            }
            else {
                elem = selector;
            }
        }
    }

    // check if the query returned null, if yes throw a new error
    if (elem === null) {
        _logError("'" + selector + "' did not match any element in the DOM, or was specified under a wrong parent");
    }
    else {
        if (from) {
            if (typeof from == "object" && from == "[object Object]") {
                elem.forEach(function (currElem) {
                    manipulate(selector, currElem, from);
                });
            }
        }

        if (options) {
            elem.forEach(function (currElem) {
                manipulate(selector, currElem, options);
            });
        }

        // return the element
        return elem;
    }
};

// _getById: replicates document.getElementById
var _getById = function (selector, from, options) {
    var elem, root;

    // check if the selector parameter is empty
    if (!selector) { _logError("Specify a selector matching an element in the DOM"); }

    // check if the from parameter is not empty
    if (from) {
        if (from === null) {
            _logError("The value specified in the 'from' parameter did not match any element in the DOM");
        } else if (typeof from == "object") {
            if (from == "[object Object]") {
                root = document;
            }
            else { root = from; }
        } else if (typeof from == "string") {
            root = document.getElementById(from);
        }
    }

    if (selector) {
        // check if the selector is a string
        if (typeof selector == "string") {
            if (from) {
                elem = root.getElementById(selector);
            } else {
                elem = document.getElementById(selector);
            }
        }
        // check if the selector is an object
        else if (typeof selector == "object") {
            // check if the selector is an array
            if (Array.isArray(selector)) {
                for (var i = 0; i < selector.length; i++) {
                    if (from) {
                        var newElem = root.getElementById(selector[i]);
                        for (var j = 0; j < newElem.length; j++) {
                            elemArr.push(newElem[j]);
                        }
                    }
                    else {
                        var newElem = document.getElementById(selector[i]);
                        for (var j = 0; j < newElem.length; j++) {
                            elemArr.push(newElem[j]);
                        }
                    }
                }
                elem = elemArr;
            }
            else {
                elem = selector;
            }
        }
    }

    // check if the query returned null, if yes throw a new error
    if (elem === null) {
        _logError("'" + selector + "' did not match any element in the DOM, or was specified under a wrong parent");
    } else {
        if (from) {
            if (typeof from == "object" && from == "[object Object]") {
                for (var i = 0; i < elem.length; i++) {
                    manipulate(selector, elem[i], from);
                }
            }
        }

        if (options) {
            for (var i = 0; i < elem.length; i++) {
                manipulate(selector, elem[i], options);
            }
        }

        // return the element
        return elem;
    }
};

// _getByClass: replicates document.getElementsByClassName
var _getByClass = function (selector, from, options) {
    var elem, root;

    // check if the selector parameter is empty
    if (!selector) {
        _logError("Specify a selector matching an element in the DOM");
    }

    // check if the from parameter is not empty
    if (from) {
        if (from === null) {
            _logError("The value specified in the 'from' parameter did not match any element in the DOM");
        } else if (typeof from == "object") {
            if (from == "[object Object]") {
                root = document;
            }
            else { root = from; }
        } else if (typeof from == "string") {
            root = document.querySelector(from);
        }
    }

    if (selector) {
        // check if the selector is a string
        if (typeof selector == "string") {
            if (from) {
                try {
                    elem = root.getElementsByClassName(selector);
                } catch (e) {
                    _logError("The value specified in the 'from' parameter did not match any element in the DOM");
                }
            } else {
                elem = document.getElementsByClassName(selector);
            }
        }
        // check if the selector is an object
        else if (typeof selector == "object") {

            // check if the selector is an array
            if (Array.isArray(selector)) {
                for (var i = 0; i < selector.length; i++) {
                    if (from) {
                        var newElem = root.getElementsByClassName(selector[i]);
                        for (var j = 0; j < newElem.length; j++) {
                            elemArr.push(newElem[j]);
                        }
                    }
                    else {
                        var newElem = document.getElementsByClassName(selector[i]);
                        for (var j = 0; j < newElem.length; j++) {
                            elemArr.push(newElem[j]);
                        }
                    }
                }

                elem = elemArr;
            }
            else {
                elem = selector;
            }
        }
    }

    // check if the query returned null, if yes throw a new error
    if (elem === null) {
        _logError("'" + selector + "' did not match any element in the DOM, or was specified under a wrong parent");
    } else {
        if (from) {
            if (typeof from == "object" && from == "[object Object]") {
                for (var i = 0; i < elem.length; i++) {
                    manipulate(selector, elem[i], from);
                }
            }
        }

        if (options) {
            for (var i = 0; i < elem.length; i++) {
                manipulate(selector, elem[i], options);
            }
        }

        // return the element
        return elem;
    }
};

// _getByTag: replicates document.getElementsByTagName
var _getByTag = function (selector, from, options) {
    var elem, root, elemArr = [];

    // check if the selector parameter is empty
    if (!selector) {
        _logError("Specify a selector matching an element in the DOM");
    }

    // check if the from parameter is not empty
    if (from) {
        if (from === null) {
            _logError("The value specified in the 'from' parameter did not match any element in the DOM");
        } else if (typeof from == "object") {
            if (from == "[object Object]") {
                root = document;
            }
            else { root = from; }
        } else if (typeof from == "string") {
            root = document.querySelector(from);
        }
    }

    if (selector) {
        // check if the selector is a string
        if (typeof selector == "string") {
            if (from) {
                try {
                    elem = root.getElementsByTagName(selector);
                } catch (e) {
                    _logError("The value specified in the 'from' parameter did not match any element in the DOM");
                }
            } else {
                elem = document.getElementsByTagName(selector);
            }
        }
        // check if the selector is an object
        else if (typeof selector == "object") {

            // check if the selector is an array
            if (Array.isArray(selector)) {
                for (var i = 0; i < selector.length; i++) {
                    if (from) {
                        var newElem = root.getElementsByTagName(selector[i]);
                        for (var j = 0; j < newElem.length; j++) {
                            elemArr.push(newElem[j]);
                        }
                    }
                    else {
                        var newElem = document.getElementsByTagName(selector[i]);
                        for (var j = 0; j < newElem.length; j++) {
                            elemArr.push(newElem[j]);
                        }
                    }
                }

                elem = elemArr;
            }
            else {
                elem = selector;
            }
        }
    }

    // check if the query returned null, if yes throw a new error
    if (elem === null) {
        _logError("'" + selector + "' did not match any element in the DOM, or was specified under a wrong parent");
    } else {
        if (from) {
            if (typeof from == "object" && from == "[object Object]") {
                for (var i = 0; i < elem.length; i++) {
                    manipulate(selector, elem[i], from);
                }
            }
        }

        if (options) {
            for (var i = 0; i < elem.length; i++) {
                manipulate(selector, elem[i], options);
            }
        }

        // return the element
        return elem;
    }
};

// _getByName: replicates document.getElementsByName
var _getByName = function (selector, from, options) {
    var elem, root;

    // check if the selector parameter is empty
    if (!selector) {
        _logError("Specify a selector matching an element in the DOM");
    }

    // check if the from parameter is not empty
    if (from) {
        if (from === null) {
            _logError("The value specified in the 'from' parameter did not match any element in the DOM");
        } else if (typeof from == "object") {
            if (from == "[object Object]") {
                root = document;
            }
            else { root = from; }
        } else if (typeof from == "string") {
            root = document.querySelector(from);
        }
    }

    if (selector) {
        // check if the selector is a string
        if (typeof selector == "string") {
            if (from) {
                try {
                    elem = root.getElementsByName(selector);
                } catch (e) {
                    _logError("The value specified in the 'from' parameter did not match any element in the DOM");
                }
            } else {
                elem = document.getElementsByName(selector);
            }
        }
        // check if the selector is an object
        else if (typeof selector == "object") {

            // check if the selector is an array
            if (Array.isArray(selector)) {
                for (var i = 0; i < selector.length; i++) {
                    if (from) {
                        var newElem = root.getElementsByName(selector[i]);
                        for (var j = 0; j < newElem.length; j++) {
                            elemArr.push(newElem[j]);
                        }
                    }
                    else {
                        var newElem = document.getElementsByName(selector[i]);
                        for (var j = 0; j < newElem.length; j++) {
                            elemArr.push(newElem[j]);
                        }
                    }
                }

                elem = elemArr;
            }
            else {
                elem = selector;
            }
        }
    }

    // check if the query returned null, if yes throw a new error
    if (elem === null) {
        _logError("'" + selector + "' did not match any element in the DOM, or was specified under a wrong parent");
    } else {
        if (from) {
            if (typeof from == "object" && from == "[object Object]") {
                for (var i = 0; i < elem.length; i++) {
                    manipulate(selector, elem[i], from);
                }
            }
        }

        if (options) {
            for (var i = 0; i < elem.length; i++) {
                manipulate(selector, elem[i], options);
            }
        }

        // return the element
        return elem;
    }
};

/*  ************************************  */

/*
* DOM Manipulation
*/

// _style: replicates document.style
var _style = function (selector, rules) {
    var elem, currStyle;

    // check if the selector parameter is empty
    if (!selector) { _logError("Specify a selector matching an element in the DOM"); }
    if (!rules) { _logError("Specify a some style rules in an object to apply or a rule as a string to return its value"); }

    if (selector) {
        elem = getElement(selector);

        if (Array.isArray(elem)) {
            for (var i = 0; i < elem.length; i++) {
                style(elem[i]);
            }
        }
        else {
            style(elem);
        }
    }

    function style(elem) {
        if (rules) {
            if (typeof rules == "object") {
                var styleRules = Object.keys(rules);
                styleRules.forEach(function (currRule) {
                    elem.style[currRule] += rules[currRule];
                });
            }
            else if (typeof rules == "string") {
                currStyle = elem.style[rules];
            }
        }
    }

    if (currStyle != null) {
        return currStyle;
    }
};

// _css: replicates document.style.cssText
var _css = function (selector, rules, options) {
    // check if the selector parameter is empty
    if (!selector) { _logError("Specify a selector matching an element in the DOM"); }
    if (!rules) { _logError("Specify a some style rules in string to apply"); }

    if (selector) {
        elem = getElement(selector);

        if (Array.isArray(elem)) {
            for (var i = 0; i < elem.length; i++) {
                css(elem[i]);
            }
        }
        else {
            css(elem);
        }
    }

    function css(elem) {
        if (rules) {
            if (typeof rules == "object") {
                var styleRules = Object.keys(rules);
                styleRules.forEach(function (currRule) {
                    if (options && options == true) {
                        elem.style.cssText = "" + currRule + ": " + rules[currRule] + ";";
                    }
                    else {
                        elem.style.cssText += "" + currRule + ": " + rules[currRule] + ";";
                    }
                });
            }
            else {
                if (options && options == true) {
                    elem.style.cssText = rules;
                }
                else {
                    elem.style.cssText += rules;
                }
            }
        }
    }
};

// _createElem: replicates document.createElement
var _createElem = function (element, options) {
    var elem, parent, sibling, styleRule, elemArr = [], selector = '';

    if (!element) { _logError("Specify a tag matching an element to be created"); }

    if (Array.isArray(element)) {
        element.forEach(function (el) {
            currEl = document.createElement(el);
            if (options) { manipulate(currEl, options); }
            elemArr.push(currEl);
            elem = elemArr;
        });
    }
    else {
        elem = document.createElement(element);
        if (options) { manipulate(selector, elem, options); }
    }

    return elem;
};

// _createText: replicates document.createTextNode
var _createText = function (text, options) {
    var textNode;

    if (!text) { _logError("Specify a text node to be created"); }

    if (text) {
        if (typeof text == "string") {
            textNode = document.createTextNode(text);
        }
    }

    if (options) {
        manipulate(textNode, options);
    }

    return textNode;
}

// _text: replicates document.innerText
var _text = function (selector, text) {
    if (!selector) _logError("Specify a selector matching an element in the DOM to clone");
    if (!text) { _logError("Specify a some text to add, replace or remove"); }

    if (selector) {
        elem = getElement(selector);

        if (Array.isArray(elem)) {
            for (var i = 0; i < elem.length; i++) {
                manipulateText(elem[i]);
            }
        }
        else {
            manipulateText(elem);
        }
    }

    function manipulateText(elem) {
        var newText;

        if (typeof text == "string") {
            elem.innerText += text;
        }
        else if (typeof text == "object") {
            oldText = elem.innerText;

            var options = Object.keys(text);
            options.forEach(function (currOptKey) {
                var textInput = text[currOptKey];

                if (currOptKey == "add") {
                    if (elem.innerText == "") {
                        elem.innerText = text[currOptKey];
                    }
                    else {
                        elem.innerText += text[currOptKey];
                    }
                }
                else if (currOptKey == "remove") {
                    var regExp = `/${textInput}/g`;
                    text = oldText.replace(textInput, "");
                    elem.innerText = text;
                }
                else if (currOptKey == "replace") {
                    if (Array.isArray(text[currOptKey])) {
                        var searchString = text[currOptKey][0] || "";
                        var replaceString = text[currOptKey][1] || "";

                        text = oldText.replace(searchString, replaceString);
                        elem.innerText = text;
                    }
                }
            });
        }
    }
}

// _html: replicates document.innerHTML
var _html = function (selector, text) {
    if (!selector) _logError("Specify a selector matching an element in the DOM to clone");
    if (!text) { _logError("Specify a some text to add, replace or remove"); }

    if (selector) {
        elem = getElement(selector);

        if (Array.isArray(elem)) {
            for (var i = 0; i < elem.length; i++) {
                manipulateText(elem[i]);
            }
        }
        else {
            manipulateText(elem);
        }
    }

    function manipulateText(elem) {
        if (typeof text == "string") {
            elem.innerHTML = text;
        }
    }
}

// _cloneElem: replicates document.cloneNode
var _cloneElem = function (selector, options) {
    var sibling, newElem, objToArray, count, cloneAttr = false, newTags = [];

    if (!selector) _logError("Specify a selector matching an element in the DOM to clone");

    if (selector) {
        elem = getElement(selector);

        if (options) {
            objToArray = Object.keys(options);

            if (objToArray.includes("attributes")) {
                cloneAttr = options.attributes;
            }

            if (objToArray.includes("count")) {
                count = options.count;

                for (var i = 0; i < count; i++) {
                    newElem = [];
                    newElem.push(elem.cloneNode(cloneAttr));
                    newElem.forEach(currElem => {
                        manipulate(currElem, options);
                    });
                }
            }
            else {
                newElem = elem.cloneNode(cloneAttr);
                manipulate(newElem, options);
            }
        }
        else {
            newElem = elem.cloneNode(false);
        }
    }

    return newElem;
};

// _getAttr: replicates document.getAttribute
var _getAttr = function (selector, attributes) {
    var elem, attrValue;

    if (!selector) _logError("Specify an element on which to get the attributes");
    if (!attributes) _logError("Specify an attribute or an array of attributes to get");

    if (selector) {
        elem = _getElem(selector);

        if (Array.isArray(elem)) {
            for (var i = 0; i < elem.length; i++) {
                getAttribute(elem[i]);
            }
        }
        else {
            getAttribute(elem);
        }
    }

    function getAttribute(elem) {
        if (Array.isArray(attributes)) {
            attributes.forEach(attr => {
                var value = elem.getAttribute(attr);
                attrValue = [];
                attrValue.push(value);
            })
        }
        else if (typeof attributes == "string") {
            var value = elem.getAttribute(attributes);
            attrValue = value;
        }
    }

    return attrValue;
}

// _setAttr: replicates document.setAttribute and document.createAttribute
var _setAttr = function (selector, options) {
    if (!selector) _logError("Specify an element on which to set the attributes");
    if (!options) _logError("Specify attributes to be set in form of a key-to-value pair object");

    if (selector) {
        elem = getElement(selector);

        if (Array.isArray(elem)) {
            elem.forEach(function (currElem) {
                setAttribute(currElem);
            })
        }
        else {
            setAttribute(elem);
        }
    }

    function setAttribute(elem) {
        if (options) {
            if (typeof options == "object") {
                var attributes = Object.keys(options);
                attributes.forEach(function (currAttr) {
                    elem.setAttribute(currAttr, options[currAttr]);
                });
            }
        }
    }
};

// _removeAttr: replicates document.removeAttribute
var _removeAttr = function (selector, attributes) {
    if (!selector) _logError("Specify an element on which to remove the attributes");
    if (!attributes) _logError("Specify an attribute or an array of attributes to be removed");

    if (selector) {
        if (typeof selector == "object") {
            elem = selector;
            removeAttribute(elem);
        }
        else if (typeof selector == "string") {
            elem = _getElems(selector);
            elem.forEach(function (currElem) {
                removeAttribute(currElem);
            });
        }
        else if (Array.isArray(selector)) {
            selector.forEach(function (currSelector) {
                elem = _getElems(currSelector);
                elem.forEach(function (currElem) {
                    removeAttribute(currElem);
                });
            });
        }
    }

    function removeAttribute(elem) {
        if (Array.isArray(attributes)) {
            attributes.forEach(function (attr) {
                if (elem.hasAttribute(attr)) {
                    elem.removeAttribute(attr);
                }
            });
        }
        else if (typeof attributes == "string") {
            if (elem.hasAttribute(attr)) {
                elem.removeAttribute(attr);
            }
        }
    }

    return elem;
};

// _replaceElem: replicates document.replaceChild
var _replaceElem = function (selector, oldSelector, options) {
    var parent;

    if (!selector) _logError("Specify the new element to be replaced with");
    if (!oldSelector) _logError("Specify the old element to be replaced");

    if (selector && oldSelector) {
        newElem = getElement(selector);
        oldElem = getElement(oldSelector);

        parent = oldElem.parentElement;
        parent.replaceChild(newElem, oldElem);

        if (options) {
            manipulate(selector, newElem, options);
        }
    }
};

// _replaceElem: replicates document.replaceChild
var _removeElem = function (selector) {
    var parent;

    if (selector) {
        elem = getElement(selector);
        removeElement(elem);
    }

    function removeElement(elem) {
        if (Array.isArray(elem)) {
            for (let c = 0; c < elem.length; c++) {
                const currElem = elem[c];

                parent = currElem.parentElement;
                parent.removeChild(currElem);
            }
        }
        else {
            parent = elem.parentElement;
            parent.removeChild(elem);
        }
    }
};

// _addClass: replicates document.classList.add
var _addClass = function (selector, classString) {
    var elem, elemArr = [];

    if (!selector) { _logError("Specify a selector matching an element in the DOM to add class"); }
    if (!classString) { _logError("Specify a class or a list of class to add to the element"); }

    if (selector) {
        if (typeof selector == "object") {
            if (Array.isArray(selector)) {
                selector.forEach(function (currSelector) {
                    if (typeof currSelector == "object") {
                        elemArr.push(currSelector);
                    }
                    else if (typeof currSelector == "string") {
                        elemArr.push(_getElem(currSelector));
                    }
                });

                elemArr.forEach(function (elem) {
                    addClass(elem);
                });
            }
            else {
                elem = selector;
                addClass(elem);
            }
        }
        else if (typeof selector == "string") {
            elem = _getElem(selector);
            addClass(elem);
        }
    }

    function addClass(elem) {
        if (classString) {
            if (Array.isArray(classString)) {
                classString.forEach(function (currClass) {
                    elem.classList.add(currClass);
                });
            }
            else {
                elem.classList.add(classString);
            }
        }
    }
};

// _removeClass: replicates document.classList.remove
var _removeClass = function (selector, classString) {
    var elem, elemArr = [];

    if (!selector) { _logError("Specify a selector matching an element in the DOM to remove class"); }
    if (!classString) { _logError("Specify a class or an array of classes to be removed from the element"); }

    if (selector) {
        if (typeof selector == "object") {
            if (Array.isArray(selector)) {
                selector.forEach(function (currSelector) {
                    if (typeof currSelector == "object") {
                        elemArr.push(currSelector);
                    }
                    else if (typeof currSelector == "string") {
                        elemArr.push(_getElem(currSelector));
                    }
                });

                elemArr.forEach(function (elem) {
                    removeClass(elem);
                });
            }
            else {
                elem = selector;
                removeClass(elem);
            }
        }
        else if (typeof selector == "string") {
            elem = _getElem(selector);
            removeClass(elem);
        }
    }

    function removeClass(elem) {
        if (classString) {
            if (Array.isArray(classString)) {
                classString.forEach(function (currClass) {
                    elem.classList.remove(currClass);
                });
            }
            else {
                elem.classList.remove(classString);
            }
        }
    }
};

// _toggleClass: replicates document.classList.toggle
var _toggleClass = function (selector, classString) {
    var elem, elemArr = [];

    if (!selector) { _logError("Specify a selector matching an element in the DOM to toggle class"); }
    if (!classString) { _logError("Specify a class or an array of classes to toggle"); }

    if (selector) {
        if (typeof selector == "object") {
            if (Array.isArray(selector)) {
                selector.forEach(function (currSelector) {
                    if (typeof currSelector == "object") {
                        elemArr.push(currSelector);
                    }
                    else if (typeof currSelector == "string") {
                        elemArr.push(_getElem(currSelector));
                    }
                });

                elemArr.forEach(function (elem) {
                    toggleClass(elem);
                });
            }
            else {
                elem = selector;
                toggleClass(elem);
            }
        }
        else if (typeof selector == "string") {
            elem = _getElem(selector);
            toggleClass(elem);
        }
    }

    function toggleClass(elem) {
        if (classString) {
            if (Array.isArray(classString)) {
                classString.forEach(function (currClass) {
                    elem.classList.toggle(currClass);
                });
            }
            else {
                elem.classList.toggle(classString);
            }
        }
    }
};

// _hasClass: replicates document.classList.contains
var _hasClass = function (selector, classString) {
    var elem, elemArr = [], result = [];

    if (!selector) { _logError("Specify a selector matching an element in the DOM to toggle class"); }
    if (!classString) { _logError("Specify a class or an array of classes to toggle"); }

    if (selector) {
        if (typeof selector == "object") {
            if (Array.isArray(selector)) {
                selector.forEach(function (currSelector) {
                    if (typeof currSelector == "object") {
                        elemArr.push(currSelector);
                    }
                    else if (typeof currSelector == "string") {
                        elemArr.push(_getElem(currSelector));
                    }
                });

                elemArr.forEach(function (elem) {
                    toggleClass(elem);
                });
            }
            else {
                elem = selector;
                toggleClass(elem);
            }
        }
        else if (typeof selector == "string") {
            elem = _getElem(selector);
            toggleClass(elem);
        }
    }

    function toggleClass(elem) {
        if (classString) {
            result.push(elem.classList.contains(classString))
        }
    }

    if (result.includes(false)) {
        return false;
    } else {
        return true;
    }
};

// _move: replicates document.appendChild, document.insertBefore, document.insertAdjacentElement
var _move = function (selector, options) {
    var elem, elemArr = [], destination, optionsObj, parent, sibling;
    if (!selector) { _logError("Specify a selector matching an element in the DOM"); }
    if (!options) { _logError("Specify a location to move element to"); }

    elem = getElement(selector);

    function moveElement(elem) {
        if (options) {
            if (typeof options == "object") {
                optionsObj = Object.keys(options);
                optionsObj.forEach(function (currOptKey) {
                    sibling = _getElem(options[currOptKey]);
                    parent = sibling.parentElement;

                    if (currOptKey == "before" || currOptKey == "insertBefore") {
                        parent.insertBefore(elem, sibling);
                    }
                    else if (currOptKey == "appendTo") {
                        parent = _getElem(options[currOptKey]);
                        parent.appendChild(elem);
                    }
                    else if (currOptKey == "afterend") {
                        sibling.insertAdjacentElement("afterend", elem);
                    }
                    else if (currOptKey == "afterbegin") {
                        sibling.insertAdjacentElement("afterbegin", elem);
                    }
                    else if (currOptKey == "beforebegin" || currOptKey == "insertAfter") {
                        sibling.insertAdjacentElement("beforebegin", elem);
                    }
                    else if (currOptKey == "beforeend") {
                        sibling.insertAdjacentElement("beforeend", elem);
                    }
                });
            }
            else if (typeof options == "string") {
                parent = _getElem(options);
                parent.appendChild(elem);
            }
        }
    }
};

// _images: replicates document.images
var _images = function (img, options) {
    var elem, length, imgArr = [];
    if (img) {
        if (typeof img == "number") {
            elem = document.images[img];
            manipulate(selector, elem, options);
        }
        else if (typeof img == "string") {
            elem = document.images.namedItem(img);
            manipulate(selector, elem, options);
        }
        else if (Array.isArray(img)) {
            img.forEach(function (currImg) {
                if (typeof currImg == "number") {
                    imgElem = document.images[currImg];
                    imgArr.push(imgElem);
                }
                else if (typeof currImg == "string") {
                    imgElem = document.images.namedItem(currImg);
                    imgArr.push(imgElem);
                }
            });

            elem = imgArr;
            elem.forEach(function (currElem) {
                manipulate(currElem, options);
            })
        }
    }
    else {
        length = document.images.length;
        return length;
    }

    return elem;
};

// _forms: replicates document.forms
var _forms = function (form, element, options) {
    var elem, length, currForm, formArr = [], elemArr = [], elemProp;

    if (form) {
        if (typeof form == "string") {
            currForm = document.forms[form];
        }
        else if (typeof form == "object") {
            currForm = form;
        }
        else if (Array.isArray(form)) {
            form.forEach(function (curr) {
                if (typeof curr == "string") {
                    formArr.push(document.forms[curr]);
                }
                else if (typeof curr == "object") {
                    formArr.push(curr);
                }
            });

            currForm = formArr;
        }

        if (currForm === null || currForm === undefined) {
            _logError("'" + form + "' did not match any form element in the DOM");
        }
    }

    if (element) {
        if (typeof element == "string") {
            elem = currForm[element];
        }
        else if (Array.isArray(element)) {
            element.forEach(function (currElem) {
                if (typeof currElem == "string") {
                    elemArr.push(currForm[currElem]);
                }
            });
            elem = elemArr;
        }
        else if (typeof element == "object" && element == "[object Object]") {
            if (typeof currForm == "object") {
                manipulate(currForm, element);
            }
            else if (Array.isArray(currForm)) {
                currForm.forEach(function (curr) {
                    manipulate(curr, element);
                });
            }
        }

        if (typeof element != "object" && (elem === null || elem === undefined)) {
            _logError("'" + element + "' did not match any element in the form named '" + form + "'");
        }
    }

    if (options) {
        if (typeof options == "object") {
            if (typeof elem == "object") {
                manipulate(selector, elem, options);
            }
            else if (Array.isArray(elemArr)) {
                elemArr.forEach(function (curr) {
                    manipulate(curr, options);
                });
            }
        }
        if (typeof options == "string") {
            if (typeof elem == "object") {
                elemProp = elem[options];
            }
            else if (Array.isArray(elemArr)) {
                elemArr.forEach(function (curr) {
                    elemProp = [];
                    elemProp.push(curr[options]);
                });
            }
        }
    }

    if (form && !element) {
        return currForm;
    }
    else if (form && element && typeof options == "string") {
        return elemProp;
    }
    else if (form && element && !options) {
        return elem;
    }
    else if (!form && !element && !options) {
        return document.forms.length;
    }
};

/*
* Event and Event handlers
*/

/*  ************************************  */

// _onEvent: replicates document.addEventListener
var _onEvent = function (selector, event, callback, config) {
    var elem, i, j, m;
    config = config || "";

    if (!selector) _logError("Specify an element to bind an event on");
    if (!event) _logError("Specify an event or an array of events to bind");
    // if (event != "[object Object]" && !callback) _logError("Specify a callback funddddddction to run when event is fired");

    if (selector) {
        if (typeof selector === "object") {
            if (Array.isArray(selector)) {
                selector.forEach(function (element) {
                    if (typeof element === "object") {
                        elem = element;
                        if (elem.length > 1) {
                            elem.forEach(function (el) {
                                addEventListener(el);
                            });
                        } else {
                            addEventListener(elem);
                        }
                    }
                    else if (typeof element === "string") {
                        elem = _getElems(element);
                        elem.forEach(function (el) {
                            addEventListener(el);
                        });
                    }
                });
            }
            else {
                elem = selector;
                if (elem.length > 1) {
                    elem.forEach(function (el) {
                        addEventListener(el);
                    });
                }
                else {
                    addEventListener(elem);
                }
            }
        }
        else if (typeof selector === "string") {
            elem = _getElems(selector);
            elem.forEach(function (el) {
                addEventListener(el);
            });
        }
    }

    function addEventListener(el) {
        if (typeof event === "object") {
            if (Array.isArray(event)) {
                event.forEach(function (e) {
                    el.addEventListener(e, callback, config);
                });
            }
            else {
                var eventArray = Object.keys(event);
                eventArray.forEach(function (e) {
                    el.addEventListener(e, event[e], config);
                });
            }
        }
        else {
            el.addEventListener(event, callback, config);
        }
    }
};

// _offEvent: replicates document.removeEventListener
var _offEvent = function (selector, event, callback, config) {
    config = config || "";

    if (!selector) _logError("Specify an element to unbind an event from");
    if (!event) _logError("Specify an event or an array of events to unbind");
    // if (event != "[object Object]" && !callback) _logError("Specify a the callback function that was bounded to this event");

    if (selector) {
        if (typeof selector === "object") {
            if (Array.isArray(selector)) {
                selector.forEach(function (element) {
                    if (typeof element === "object") {
                        elem = element;
                        if (elem.length > 1) {
                            elem.forEach(function (el) {
                                removeEventListener(el);
                            });
                        } else {
                            removeEventListener(elem);
                        }
                    }
                    else if (typeof element === "string") {
                        elem = _getElemserySelectorAll(element);
                        elem.forEach(function (el) {
                            removeEventListener(el);
                        });
                    }
                });
            }
            else {
                elem = selector;
                if (elem.length > 1) {
                    elem.forEach(function (el) {
                        removeEventListener(el);
                    });
                }
                else {
                    removeEventListener(elem);
                }
            }
        }
        else if (typeof selector === "string") {
            elem = _getElems(selector);
            elem.forEach(function (el) {
                removeEventListener(el);
            });
        }
    }

    function removeEventListener(el) {
        if (typeof event === "object") {
            if (Array.isArray(event)) {
                event.forEach(function (e) {
                    el.removeEventListener(e, callback, config);
                });
            }
            else {
                var eventArray = Object.keys(event);
                eventArray.forEach(function (e) {
                    el.removeEventListener(e, event[e], config);
                });
            }
        }
        else {
            el.removeEventListener(event, callback, config);
        }
    }
};

/*
* Other Utilities
*/

/*  ************************************  */

// _download: function to download contents
var _download = function (content, type, filename) {
    var btn, url, blob;

    if (!content) { _logError("Specify some content to download, or a url"); }
    if (content && !type) { _logError("Specify content type for download"); }

    if (content) {
        if (typeof content == "string") {
            if (type == "url") {
                url = content;
            }
            else {
                blob = new Blob([content], { type: type });
                url = URL.createObjectURL(blob);
            }
        }
    }

    if (filename) {
        filename = filename;
    }
    else {
        filename = "download";
    }

    if (url !== "") {
        btn = _createElem("a", {
            href: url,
            appendTo: "body",
            attr: {
                download: filename
            }
        });
        btn.click();
        _removeElem(btn);
    }
};

// _setObjValue: function to update or create a new object
var _setObjValue = function (obj, path, value, log) {
    var log = log || null;

    const pList = path.split('.');
    const key = pList.pop();
    const pointer = pList.reduce((accumulator, currentValue) => {
        if (accumulator[currentValue] === undefined)
            accumulator[currentValue] = {};
        return accumulator[currentValue];
    }, obj);
    pointer[key] = value;

    if (log == true) {
        console.log("object updated");
        console.log(obj);
    }

    return obj;
};

/*
* Cookies
*/

// _setCookie: function to set a cookie value
var _setCookie = function (name, value, days, path, cookieObj) {
    var date, expiryDate;

    cookieObj = cookieObj || null;

    date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    var expires = "expires=" + date.toUTCString();

    document.cookie = name + "=" + value + ";" + expires + ";path=" + path;

    if (cookieObj != null) {
        _setObjValue(cookieObj, name, value);
        return cookieObj;
    }
    else {
        return "";
    }
};

// _getCookie: function to get a cookie value
var _getCookie = function (name) {
    var getName = `${name}=`;

    var cookieString = document.cookie.split(';');

    for (var i = 0; i < cookieString.length; i++) {
        var cookie = cookieString[i];

        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(getName) == 0) {
            return cookie.substring(getName.length, cookie.length);
        }
    }
    return "";
};

// _checkCookie: function to check if a cookie was set
var _checkCookie = function (name) {
    var getCookieName = _getCookie(name);

    if (getCookieName != "") {
        console.log("'" + getCookieName + "'" + "is set");
        return true;
    }
    else {
        console.log("'" + getCookieName + "'" + "was not set");
        return false;
    }
};

// _importScript: function to get scripts using pure js 
var _importScript = function (url, async, type) {

    if (Array.isArray(url)) {
        url.forEach(function (currUrl) {
            createScript(currUrl);
        })
    }
    else {
        createScript(url);
    }

    function createScript(url) {
        var scriptTag = _createElem("script", {
            src: url,
            appendTo: "body",
            attr: {
                type: (!type) ? "text/javascript" : type
            }
        });

        if (async == true) {
            _setAttr(scriptTag, "async", "");
        }
    }
};

// _$importScript: function to get scripts using jquery 
var _$importScript = function (url) {
    if (Array.isArray(url)) {
        url.forEach(function (currUrl) {
            $.getScript(currUrl);
        })
    }
    else {
        $.getScript(url);
    }
};

// _observeMutation: function to observe an element
var _observeMutation = function (selector, callback, config) {
    var elem, observer;

    if (!selector) _logError("Specify a selector matching an element in the DOM to observe");
    if (!callback) _logError("Specify a callback function to be fired when a change occurs");

    var observerConfig = {
        attributes: true,
        childList: true,
        attributeOldValue: true,
        characterData: true
    };

    config = config || observerConfig;

    if (selector) {
        if (typeof selector == "object") {
            elem = selector;
            observe(elem);
        }
        else if (typeof selector == "string") {
            elem = _getElem(selector);
            observe(elem);
        }
    }

    function observe(elem) {
        observer = new MutationObserver(function (mutation) {
            if (callback) {
                callback.call();
            }
        });

        observer.observe(elem, config);

        return observer;
    }

    // return observer;
}

// _toggleFullScreen: function to set an element to full screen
var _toggleFullScreen = function (selector) {
    if (!selector) _logError("Specify a selector matching an element in the DOM");

    if (selector) {
        if (typeof selector == "object") {
            if (Array.isArray(selector)) {
                selector.forEach(function (currSelector) {
                    if (typeof currSelector == "object") {
                        elemArr.push(currSelector);
                    }
                    else if (typeof currSelector == "string") {
                        elemArr.push(_getElem(currSelector));
                    }
                });

                elemArr.forEach(function (elem) {
                    toggleFullScrn(elem);
                });
            }
            else {
                elem = selector;
                toggleFullScrn(elem);
            }
        }
        else if (typeof selector == "string") {
            elem = _getElem(selector);
            toggleFullScrn(elem);
        }
    }

    function toggleFullScrn(elem) {
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }
}

// _dummyText: function to generate some dummy text
var _dummyText = function (wordcount) {
}

// _toggleElem: function to toggle an elements display
var _toggleElem = function (selector) {
    var elem, value, initial, getDisplay, styleTag = null;

    if (!selector) _logError("Specify a selector matching an element in the DOM");

    if (selector) {
        elem = getElement(selector);
    }

    getDisplay = _style(elem, "display");

    if (getDisplay == "") {
        value = "initial";
    }
    else if (getDisplay != "" && getDisplay != "none") {
        initial = getDisplay;
    }
    else if (getDisplay != "" && getDisplay == "none") {
        value = initial;
    }

    _style(elem, { display: value });

    // if(initialDisplay == null && getDisplay != "none"){
    //     initialDisplay = getDisplay;
    //     _style(elem, { display: "none" });
    // }
    // else if(initialDisplay != null && getDisplay == "none"){
    //     _style(elem, { display: "initial" });
    // }

    // initialDisplay = _style(elem, "display");

    // if(getDisplay != "none" || getDisplay != "" ){
    //     initial = getDisplay;
    // }
}

// _random: function to generate random a string
var _random = function (options) {
    var num, text, alphanumeric, integer, string, min = 0,
        max = 100, round = true, length = 5, decimals = 3,
        caseing = "alphanumeric";

    if (options) {
        if (typeof options == "object" && options == "[object Object]") {
            var optionKeys = Object.keys(options);

            optionKeys.forEach(function (currKey) {
                if (currKey == "min" && options[currKey] !== "") {
                    min = options[currKey];
                }
                else if (currKey == "max" && options[currKey] !== "") {
                    max = options[currKey];
                }
                else if (currKey == "integer" && options[currKey] !== "") {
                    integer = options[currKey];
                }
                else if (currKey == "string" && options[currKey] !== "") {
                    string = options[currKey];
                }
                else if (currKey == "alphanumeric" && options[currKey] !== "") {
                    alphanumeric = options[currKey];
                }
                else if (currKey == "round" && options[currKey] !== "") {
                    round = options[currKey];
                }
                else if (currKey == "decimals" && options[currKey] !== "") {
                    decimals = options[currKey];
                }
                else if (currKey == "length" && options[currKey] !== "") {
                    length = options[currKey];
                }
                else if (currKey == "uppercase" && options[currKey] === true) {
                    caseing = "uppercase";
                }
                else if (currKey == "lowercase" && options[currKey] === true) {
                    caseing = "lowercase";
                }
            });

            if (alphanumeric === true || (integer === true && string === true)) {
                alphanumeric = Math.random().toString(36).replace('0.', '');

                if (caseing == "uppercase") {
                    alphanumeric = alphanumeric.toUpperCase();
                }
                else if (caseing == "lowercase") {
                    alphanumeric = alphanumeric.toLowerCase();
                }

                var first = alphanumeric.charAt(0);
                var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

                if (digits.includes(first)) {
                    var alphabets = 'abcdefghijklmnopqrstuvwxyz';
                    var index = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
                    alphabets = alphabets.split("");

                    var newAlpha = alphabets[index];
                    alphanumeric = alphanumeric.replace(first, newAlpha);
                }

            }
            else if (integer === true) {
                if (round === true) {
                    num = Math.floor(Math.random() * (max - min + 1)) + min;
                }
                else if (round === false) {
                    num = Math.random() * (max - min + 1) + min;
                    num = num.toFixed(decimals);
                }
                else {
                    _logError("'round' must be set to either true or false in the _random function");
                }
            }
            else if (string === true) {
                var alphabets = 'abcdefghijklmnopqrstuvwxyz';
                var toArray = alphabets.split("");
                text = "";

                for (var i = 0; i < length; i++) {
                    index = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
                    text += toArray[index];
                }

                if (caseing == "uppercase") {
                    text = text.toUpperCase();
                }
                else if (caseing == "lowercase") {
                    text = text.toLowerCase();
                }
            }
            else if (integer === false && string === false) {
                _logError("One of either integer or string must be set to 'true'");
            }
            else {
                if (round === true) {
                    num = Math.floor(Math.random() * (max - min + 1)) + min;
                }
                else if (round === false) {
                    num = Math.random() * (max - min + 1) + min;
                    num = num.toFixed(decimals);
                }
                else {
                    _logError("'round' must be set to either true or false in the _random function");
                }
            }
        }
    }

    if (num) {
        return num;
    }
    else if (text) {
        return text;
    }
    else if (alphanumeric) {
        return alphanumeric;
    }
};

// _setActive: function to set an active element by class
var _setActive = function (selector, classString, strict) {
    var elem, parent, childCount, children;

    if (!selector) _logError("Specify a selector matching an element in the DOM");
    if (!classString) _logError("Specify a class string to be set");

    if (selector) {
        elem = getElement(selector);
        parent = elem.parentElement;
        childCount = parent.childElementCount;
        children = parent.children;
    }

    for (var i = 0; i < childCount; i++) {
        currChild = children[i];
        _removeClass(currChild, classString);
    }

    _addClass(elem, classString);
};

// _moduleExport: function to export a function in UMD format(for use in NPM, AMD, Window)
var _moduleExport = function (moduleName, exportName) {
    if ('undefined' !== typeof module && !!module && !!module.exports) {
        module.exports = function () {
            return new moduleName;
        };
        var obj = new moduleName;
        for (var key in obj) {
            module.exports[key] = obj[key];
        }
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return new moduleName;
        });
    } else {
        window[exportName] = new moduleName;
    }
}

/* Object Manipulation Functions */
var _Obj = {
    /* 
    * keys(obj)
    * @param obj {Object} - Object to manipulate
    */
    keys: (obj) => {
        return Object.keys(obj);
    },
    /* 
    * values(obj)
    * @param obj {Object} - Object to manipulate
    */
    values: (obj) => {
        return Object.values(obj);
    },
    /* 
    * getValue(obj, key)
    * @param obj {Object} - Object to manipulate
    * @param key {String or Array} - Key to check for values
    */
    getValue: (obj, key) => {
        if (Array.isArray(key)) {
            var valArray = [];
            for (let i = 0; i < key.length; i++) {
                valArray.push(obj[key[i]])
            }
            return valArray;
        }
        else {
            return obj[key];
        }
    },
    /* 
    * entries(obj)
    * @param obj {Object} - Object to manipulate
    */
    entries: (obj) => {
        return Object.entries(obj);
    },
    /* 
    * forEach(obj, callback)
    * @param obj {Object} - Object to manipulate
    * @param callback {Function} - Callback function(key, value)
    */
    forEach: (obj, callback) => {
        var entries = Object.entries(obj);

        for (let i = 0; i < entries.length; i++) {
            const currPair = entries[i];

            var key = currPair[0];
            var value = currPair[1];

            callback(key, value);
        }
    },
    /* 
    * add(obj, key, value)
    * @param obj {Object} - Object to manipulate
    * @param key {String, Object} - Key to be added / Object to be added
    * @param value {String, Object} - Value of new Key
    */
    push: (obj, key, value) => {
        if (typeof key == "object") {
            if (Array.isArray(key)) {
                for (let i = 0; i < key.length; i++) {
                    const currKey = key[i];
                    Object.defineProperty(obj, currKey, { value: value });
                }
            }
            else {
                _Obj.forEach(key, function (key, value) {
                    Object.defineProperty(obj, key, { value: value });
                });
            }
        }
        else if (typeof key == "string") {
            Object.defineProperty(obj, key, { value: value });
        }
    },
    /* 
    * set(obj, path, value)
    * @param obj {Object} - Object to manipulate
    * @param path {String} - Path to key
    * @param value {String, Object} - New Value of Key
    */
    set: (obj, path, value) => {
        var pathToArr = path.split('.');
        var key = pathToArr.pop();
        var pointer = pathToArr.reduce((initial, currValue) => {
            if (initial[currValue] === undefined) {
                initial[currValue] = {};
            }
            return initial[currValue];
        }, obj);
        pointer[key] = value;

        return objString;
    },
    /* 
    * extend(target, source)
    * @param target {Object} - Target Object
    * @param source {String} - New Values
    */
    extend: (target, source) => {
        _Obj.forEach(target, function (key, value) {
            if (source[key] != undefined) {
                if (_Obj.isObject(target[key])) {
                    _Obj.extend(target[key], source[key])
                } else {
                    target[key] = source[key];
                }
            }
            else {
                target[key] = value;
            }
        });

        return target;
    },
    /* 
    * isObject(obj)
    * @param obj {Object} - Object to test for
    */
    isObject: (obj) => {
        if (typeof obj == "object" && obj == "[object Object]") {
            return true;
        }
        else { return false; }
    },
    /*
    * empty(key)
    * @param obj {Object} - Object to manipulate
    * @param source {key} - key to empty (could be an array of strings)
    */
    empty: (obj, key) => {
        if (key) {
            if (Array.isArray(key)) {
                key.forEach(currKey => {
                    if (typeof currKey == "string") {
                        obj[currKey] = null;
                    }
                    else {
                        // handle error
                    }
                });
            }
            else if (typeof key == "string") {
                obj[key] = null;
            }
        }
        else {
            obj = {};
        }

        return obj;
    }
}
/*  ************************************  */

/*
* Message Logging
*/

// _log: replicates console.log()
var _log = function (message) {
    if (!message) _logError("Specify a message to be logged out in the console");

    if (message) {
        console.log(message);
    }
}

// _warn: replicates console.warn()
var _warn = function (message) {
    if (!message) _logError("Specify a warning message to be logged out in the console");

    if (message) {
        console.warn(message);
    }
}

// _info: replicates console.info()
var _info = function (message) {
    if (!message) _logError("Specify a info message to be logged out in the console");

    if (message) {
        console.info(message);
    }
}

// _debug: replicates console.debug()
var _debug = function (message) {
    if (!message) _logError("Specify a debugging message to be logged out in the console");

    if (message) {
        console.debug(message);
    }
}

// _error: replicates console.error()
var _error = function (message) {
    if (!message) _logError("Specify a error message to be logged out in the console");

    if (message) {
        console.error(message);
    }
}

// _newError, _logError: replicates throw new Error
var _logError = _newError = function (message) {
    if (!message) throw new Error("Specify a message to be logged out as an error in the console");

    if (message) {
        throw new Error(message);
    }
}

var _onReady = function (selector, callback) {
    var elem;

    if (!selector) _logError("Specify an element to watch for its ready state");
    if (!callback) _logError("Specify a callback function to fire up when element is ready");

    if (selector) {
        elem = getElement(selector);

        _onEvent(elem, "DOMContentLoaded", callback);
    }
}