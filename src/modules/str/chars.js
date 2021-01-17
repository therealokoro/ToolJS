import isString from "./isString";

/**
 * This method returns an array containing every single character in a string, excluding whitespaces.
 * @method module:Str.chars
 * @param {String} str The string whose characters are to be returned.
 * @returns {Array} The array of characters.
 * @example
 * var myString = "ToolJS";
 * 
 * Str.chars(myString); // returns ["T", "o", "o", "l", "J", "S"];
 */
const chars = (str) => {
    if (isString(str)) {
        str = str.trim();
        str = str.replace(/ /g, "");
        return str.split("");
    }
}

export default chars;