/**
 * @todo
 * add toString, toUtilsber
 */
import ToolJS from "../main";

import setCookie from "./setCookie";
import getCookie from "./getCookie";
import checkCookie from "./checkCookie";
import deleteCookie from "./deleteCookie";
import importScript from "./importScript";
import observeMutation from "./observeMutation";
import typeOf from "./typeOf";

/**
 * This module contains general methods and functions usful to everday javascripting.
 * @module Utils
 * @since v1.0.0
 */
const Utils = {
    checkCookie: checkCookie,
    deleteCookie: deleteCookie,
    getCookie: getCookie,
    importScript: importScript,
    observeMutation: observeMutation,
    setCookie: setCookie,
    typeOf: typeOf,
}

// register the Utils object as a module in the library
var ToolJSModules = ToolJS.modules;
ToolJSModules.Utils = Utils;

// export the Utils object as the default export
export default Utils;