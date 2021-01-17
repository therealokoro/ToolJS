/**
 * @todo
 * add merge
 * add propObj
 */

import ToolJS from "../main";

import isObj from "./isObj";
import forEach from "./forEach";
import keys from "./keys";
import values from "./values";
import includes from "./includes";
import valueOf from "./valueOf";
import entries from "./entries";
import toPropArray from "./toPropArray";
import push from "./push";
import extend from "./extend";
import set from "./set";
import indexOf from "./indexOf";
import valueAt from "./valueAt";
import keyAt from "./keyAt";
import toObj from "./toObj";
import isEmpty from "./isEmpty";
import remove from "./remove";
import toArray from "./toArray";
import pop from "./pop";

/**
 * This module contains methods and functions that manipulates an object
 * @module Obj
 * @since v1.0.0
 */
const Obj = {
    entries: entries,
    extend: extend,
    forEach: forEach,
    includes: includes,
    indexOf: indexOf,
    isObj: isObj,
    isEmpty: isEmpty,
    keyAt: keyAt,
    keys: keys,
    pop: pop,
    push: push,
    remove: remove,
    set: set,
    toArray: toArray,
    toPropArray: toPropArray,
    toObj: toObj,
    valueAt: valueAt,
    valueOf: valueOf,
    values: values,
}

// register the Obj object as a module in the library
var ToolJSModules = ToolJS.modules;
ToolJSModules.Obj = Obj;

// export the Obj object as the default export
export default Obj;