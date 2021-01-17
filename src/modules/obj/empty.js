import ToolJS from "../main";
import { Logs } from "../deps";
import isObj from "./isObj";

/**
 * This method empties an object of its properties and values.
 * Useful when you want to programmatically empty and object
 * @method module:Obj.empty
 * @param {Object|Array<Object>} obj The object to be made emptied. Could be an array of objects
 * @returns {Object|Array<Object>} The emptied object or an array of objects
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male"
 * };
 * 
 * var newProps = {
 *     Age: 15,
 *     Gender: "Female"
 * }
 * 
 * // empties "myObj" of its properties and values
 * var newObj = Obj.empty(myObj);
 * 
 * // empties "myObj" and newProps of its properties and values
 * var newObj = Obj.empty([myObj, newProps]);
 */
const empty = (obj) => {
    var debugging = ToolJS.env.debugging;

    if (Array.isArray(obj)) {
        obj.forEach(currObj => {
            if (isObj(currObj)) { currObj = {}; }
            else { if (debugging) Logs.warn("The obj parameter must either be an object"); }
        })
    }
    else if (isObj(obj)) { obj = {}; }
    else { if (debugging) Logs.throw("The obj parameter must either be an object or an array of objects"); }

    return obj;
}

export default empty;