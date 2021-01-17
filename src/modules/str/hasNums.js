import isString from "./isString";

/**
 * This method checks to see if a string contains numbers in it.
 * @method module:Str.hasNums
 * @param {String} str The string to be checked
 * @returns {Boolean} The result of the check
 * @example
 * var myString = "My name is John Doe, and i am 20years old.";
 * var myString2 = "My name is John Doe";
 * 
 * Str.hasNums(myString); // returns true;
 * Str.hasNums(myString2); // returns false;
 */
const hasNums = (str) => {
    if (isString(str)) {
        str = str.trim();
        var regexp = /d/g;
        return regexp.test(str);
    }
}

export default hasNums;