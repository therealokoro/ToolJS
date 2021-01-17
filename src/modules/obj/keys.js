import isObj from "./isObj";

/**
 * This method returns an array containing the keys of an object literal
 * @method module:Obj.keys
 * @param {Object} obj The object whose keys are to be returned
 * @returns {Array} An array holding the keys of the object
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male"
 * };
 * 
 * var objKeys = Obj.keys(myObj); // returns ["Name", "Age", "Gender"]
 */
const keys = (obj) => {
    if (isObj(obj)) {
        return Object.keys(obj);
    }
}

export default keys;