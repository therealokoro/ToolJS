import isString from "./isString";

/**
 * This method returns the last character of a given string
 * @method module:Str.lastChar
 * @param {String} str The string to make the search on.
 * @returns {String} The resultant character
 * @example
 * var myString = "ToolJS Rocks";
 * 
 * Str.lastChar(myString); // returns "s";
 */
const lastChar = (str) => {
    if (isString(str)) {
        str = str.trim();
        var lastIndex = str.length - 1;
        return str.charAt(lastIndex);
    }
}

export default lastChar;