/**
 * This method checks if a variable is a plain object literal
 * @method module:Obj.isObj
 * @param {Object} obj The variable to test for if its an object literal
 * @returns {Boolean} The result of the test
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: "25",
 *     Gender: "Male"
 * };
 * Obj.isObj(myObj) // returns true;
 * 
 * var myElem = DOM.getEl("p");
 * Obj.isObj(myElem) // returns false;
 * 
 * var arr = ["item1", "item2"];
 * 
 * console.log(typeof arr === "object");
 * // the above code will return "true", because all Arrays in javascript are objects. 
 * // but this is not an object literal
 * 
 * // This will check if its actaully an array or a plain object
 * Obj.isObj(arr) // returns false;
 */
const isObj = (obj) => {
    return (typeof obj !== "undefined" && obj !== null && obj.constructor === Object && typeof obj === 'object' && !Array.isArray(obj) && toString.call(obj) == "[object Object]");
}

export default isObj;