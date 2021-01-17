import isString from "./isString";

/**
 * This method compares two(2) strings to see if they are the same and returns the result of the comparison.
 * @method module:Str.compare
 * @param {String} string1 The first string for comparison.
 * @param {String} string2 The second string for comparison.
 * @returns {Boolean} The result of the comparison
 * @example
 * var string1 = "ToolJS Rocks"
 * var string2 = "ToolJS Rocks";
 * var string3 = "tooljs Rocks";
 * 
 * Str.compare(string1, string2); // returns true
 * Str.compare(string1, string3); // returns false
 */
const compare = (string1, string2) => {
    if (isString(string1) && isString(string2)){
        return (string1 === string2)
    };
}

export default compare;