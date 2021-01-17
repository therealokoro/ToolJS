/**
 * This method checks if an item or variable is a string or an instance of the string itemect
 * @method module:Str.isString
 * @param {*} item The item or variable to be checked.
 * @returns {Boolean} The result of the check
 * @example
 * var numberItem = 50
 *
 * var stringItem = "ToolJS Rocks";
 * 
 * Str.isString(numberItem); // returns false
 * Str.isString(stringItem); // returns true
 */
const isString = (item) => {
    return ( typeof item !== "undefined" && item !== null && typeof item === "string" );
}

export default isString;