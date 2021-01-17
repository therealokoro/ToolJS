import isObj from "./isObj";

/**
 * This method returns an array containing the values of an object literal
 * @method module:Obj.values
 * @param {Object} obj The object whose values are to be returned
 * @returns {Array<String>} An array holding the values of the object
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male"
 * };
 * 
 * var objValues = Obj.values(myObj); // returns ["John Doe", 25, "Male"]
 */
const values = (obj) => {
    if (isObj(obj)) { return Object.values(obj); }
}

export default values;