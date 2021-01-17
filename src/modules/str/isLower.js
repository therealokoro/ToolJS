import isString from "./isString";

/**
 * This method checks to see if a string is in lowercase or not.
 * @method module:Str.isLower
 * @param {String} str The string to be checked
 * @returns {Boolean} The result of the check
 * @example
 * var myString = "i am NOT in LowercCAse";
 * 
 * Str.isLower(myString); // returns false;
 * Str.isLower("i am in lowercase"); // returns true;
 */
const isLower = (str) => {
    if (isString(str)) {
        str = str.trim();
        var toLower = str.toLowerCase();
        return (str === toLower);
    }
}

export default isLower;