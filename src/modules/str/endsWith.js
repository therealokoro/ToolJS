import isString from "./isString";

/**
 * This method checks to see if a given string ends with a particular substring. This is a case-sensitive method
 * @method module:Str.endsWith
 * @param {String} str The string reference to make the search on.
 * @param {String} target The target string to check for
 * @param {Number} [endpos=str.length] The position to which the search is ended in the reference string length. Default(str.length)
 * @returns {Boolean} The result of the test
 * @example
 * var myString = "ToolJS Rocks";
 * 
 * Str.endsWith(myString, "Rocks"); // returns true
 * Str.endsWith(myString, "R", 8); // returns true
 */
const endsWith = (str, target, endpos) => {
    var newString, result;
    endpos = (endpos) ? endpos : str.length;

    if (isString(str)) {
        newString = str.substring(0, endpos);
        result = newString.endsWith(target);
        return result;
    }
}

export default endsWith;