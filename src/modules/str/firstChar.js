import isString from "./isString";

/**
 * This method returns the first character of a given string
 * @method module:Str.firstChar
 * @param {String} str The string to make the search on.
 * @returns {String} The resultant character
 * @example
 * var myString = "ToolJS Rocks";
 * 
 * Str.firstChar(myString); // returns "T";
 */
const firstChar = (str) => {
    if (isString(str)) {
        str = str.trim();
        return str.charAt(0);
    }
}

export default firstChar;