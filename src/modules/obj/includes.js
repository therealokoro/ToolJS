import ToolJS from "../main";
import { Logs } from "../deps";
import isObj from "./isObj";
import keys from "./keys";

/**
 * This method checks if an object contains a particular property specified by the property key, and returns true.
 * @method module:Obj.includes
 * @param {Object} obj The object to perform the search on
 * @param {String} key The key of the property to be searched for
 * @returns {Boolean} The result of the search
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male"
 * };
 * 
 * var keyValue = Obj.includes(myObj, "Name"); // returns true
 * var keyValue = Obj.includes(myObj, "occupation"); // returns false
 */
const includes = (obj, key) => {
    var debugging = ToolJS.env.debugging;
    var result;

    if (isObj(obj)) {
        if (typeof key == "string") {
            var keyArr = keys(obj);
            result = keyArr.includes(key);
        }
        else { if (debugging) Logs.throw("The key parameter must be a string"); }
    }

    return result;
}

export default includes;