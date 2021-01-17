import isObj from "./isObj";

/**
 * This method checks if an object literal is empty and returns true, else it returns false
 * @method module:Obj.isEmpty
 * @param {Object} obj The object to be checked if its empty
 * @returns {Boolean} The result of the check
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male"
 * };
 * 
 * var myEmptyObj = {};
 * 
 * Obj.isEmpty(myObj); // returns false
 * Obj.isEmpty(myEmptyObj); // returns true
 */
const isEmpty = (obj) => {
    if (isObj(obj)) {
        var entries = Object.entries(obj);
        return (entries.length === 0);
    }
}

export default isEmpty;