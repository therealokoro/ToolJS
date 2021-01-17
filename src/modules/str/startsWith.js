import isString from "./isString";

/**
 * This method checks to see if a given string begins with a particular substring. This is a case-sensitive method
 * @method module:Str.startsWith
 * @param {String} str The string reference to make the search on.
 * @param {String} target The target string to check for
 * @param {Number} [startpos=0] The position to which the search is started in the reference string length. Default(0)
 * @returns {Boolean} The result of the test
 * @example
 * var myString = "ToolJS Rocks";
 * 
 * Str.startsWith(myString, "ToolJS"); // returns true
 * Str.startsWith(myString, "R", 7); // returns true
 */
const startsWith = (str, target, startpos) => {
    var newString, result;
    startpos = (startpos) ? startpos : 0;

    if (isString(str)) {
        newString = str.substring(startpos, str.length);
        result = (0 === newString.indexOf(target));
        return result;
    }
}

export default startsWith;