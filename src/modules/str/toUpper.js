import isString from "./isString";

/**
 * This method converts a string to uppercase.
 * @method module:Str.toUpper
 * @param {String} str The string to be converted to uppercase
 * @returns {String} The converted string
 * @example
 * var myString = "toolJS_is_an-awesome-library, try it out";
 * 
 * Str.toUpper(myString); // returns "TOOLJS_IS_AN-AWESOME-LIBRARY, TRY IT OUT";
 */
const toUpper = (str) => {
    if (isString(str)) {
        str = str.trim();
        return str.toUpperCase();
    }
}

export default toUpper;