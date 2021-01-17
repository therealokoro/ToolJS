import isString from "./isString";

/**
 * This method checks to see if a string is in uppercase or not.
 * @method module:Str.isUpper
 * @param {String} str The string to be checked
 * @returns {Boolean} The result of the check
 * @example
 * var myString = "i am NOT in uPPercCAse";
 * 
 * Str.isUpper(myString); // returns false;
 * Str.isUpper("I AM IN UPPERCASE"); // returns true;
 */
const isUpper = (str) => {
    if (isString(str)) {
        str = str.trim();
        var toUpper = str.toUpperCase();
        return (str === toUpper);
    }
}

export default isUpper;