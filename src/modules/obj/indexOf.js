import ToolJS from "../main";
import { Logs } from "../deps";
import isObj from "./isObj";

/**
 * This method returns the zero-based index of a specific property in an object.
 * If the key is not found, it returns -1
 * @method module:Obj.indexOf
 * @param {Object} obj The object to which the search is to be made upon
 * @param {String} key The property key whose index is to be returned
 * @returns {Number} The index of the object property
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male"
 * };
 * 
 * var index = Obj.indexOf(myObj, "Age"); // returns 1
 * var index = Obj.indexOf(myObj, "Occupation"); // returns -1
 */
const indexOf = (obj, key) => {
    var debugging = ToolJS.env.debugging;
    var output;

    if (isObj(obj)) {
        var objKeys = Object.keys(obj);
        if(objKeys.includes(key)){ output = objKeys.indexOf(key);}
        else{ output = -1; }
    }
    else { if (debugging) Logs.throw("The obj parameter must be an object"); }

    if(output != null){ return output; }
}

export default indexOf;