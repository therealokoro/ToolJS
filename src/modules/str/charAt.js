import isString from "./isString";

/**
 * This method returns the character at the specified index, and returns and empty string if the index does not exist
 * @method module:Str.charAt
 * @param {String} str The string to make the search on.
 * @param {Number} index An integer representing the index of the character to be returned
 * @returns {String} The character at the specified index
 * @example
 * var myString = "ToolJS Rocks";
 * 
 * Str.charAt(myString, 7); // returns "R";
 * Str.charAt(myString, 13); // returns ""
 */
const charAt = (str, index) => {
    if (isString(str)) {
        str = str.trim();
        
        return str.charAt(index);
    }
}

export default charAt;