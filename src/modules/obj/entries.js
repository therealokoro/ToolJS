import isObj from "./isObj";

/**
 * This method returns an array containing the entries of an object literal
 * @method module:Obj.entries
 * @param {Object} obj The object whose entries are to be returned
 * @returns {Array} An array holding the entries of the object
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male"
 * };
 * 
 * var objEntries = Obj.entries(myObj); // returns [["Name", "John Doe"], ["Age", "25"], ["Gender", "Male"]]
 */
const entries = (obj) => {
    if (isObj(obj)) { return Object.entries(obj); }
}

export default entries;