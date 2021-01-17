import ToolJS from "../main";
import { Logs } from "../deps";
import isObj from "./isObj";
import includes from "./includes";

/**
 * This method removes a specified property or an array of properties from an object, if they exist in the object.
 * @method module:Obj.remove
 * @param {Object} obj The object whose property is to be removed
 * @param {String} key The key of the object property is to be removed
 * @returns {Object} The resultant object
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male"
 * };
 * 
 * // removes the "Name" property and its value from the object
 * Obj.remove(myObj, "Name");
 * 
 * // removes the "Name" and "Age" property and their values from the object 
 * Obj.remove(myObj, ["Name", "Age"]);
 */
const remove = (obj, key) => {
    var debugging = ToolJS.env.debugging;

    if (isObj(obj)) {
        if (Array.isArray(key)) {
            key.forEach(currKey => {
                if (typeof currKey == "string") { delete obj[currKey]; }
                else { if (debugging) Logs.warn("The key name must be of type string"); }
            });
        }
        else if (typeof key == "string") { delete obj[key]; }
        else { if (debugging) Logs.throw("The key parameter must be a string or an array of strings"); }
    }

    return obj;
}

export default remove;