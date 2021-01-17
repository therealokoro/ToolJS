import isString from "./isString";

/**
 * This method strips off numbers from a string and returns the rest of the string. If no number was found in the string, then it returns the original string back.
 * @method module:Str.stripNums
 * @param {String} str The string to strip of its numbers.
 * @returns {String} The remaining string.
 * @example
 * var myString = "This is a sample 67 string with 1 3numbers65432";
 * 
 * Str.stripNums(myString); // returns "This is a sample string";
 */
const stripNums = (str) => {
    if (isString(str)) {
        return str.replace(/\d+/g, '');
    }
}

export default stripNums;