import isString from "./isString";

/**
 * This method strips off any special character from a string and returns the rest of the string.
 * @method module:Str.stripSpecialChars
 * @param {String} str The string to strip of its special characters.
 * @returns {String} The remaining string.
 * @example
 * var myString = "This is a sample string. &(£*!£()£#'')# ";
 * 
 * Str.stripSpecialChars(myString); // returns "This is a sample string";
 */
const stripSpecialChars = (str) => {
    if (isString(str)) {
        return str.replace(/[^A-Za-z0-9 ]+/g, '');
    }
}

export default stripSpecialChars;