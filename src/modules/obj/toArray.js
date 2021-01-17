import isObj from "./isObj";
import forEach from "./forEach";
import valueOf from "./valueOf";

/**
 * This method returns an array containing the value of each property in the source object.
 * If a path or an array of paths to a property value or values passed as the second parameter, 
 * then only those path value(s) is returned in the array
 * @method module:Obj.toArray
 * @param {Object} obj The source object to be converted to an array
 * @param {String|Array<String>} [path] An optional string or array or strings representing paths to properties
 * @returns {Array<Object>} An array holding the value of each property in the source object
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male"
 * };
 * 
 * var objtoArray = Obj.toArray(myObj); // returns ["John Doe", 25, "Male"]
 */
const toArray = (obj, path) => {
    var output = [];

    if (isObj(obj)) {
        if(path){ var value = valueOf(obj, path); output.push(value); }
        else{ forEach(obj, (key, value) => { output.push(value); }); }
    }

    return output;
}

export default toArray;