import isString from "./isString";

/**
 * This method extracts the numbers from a string and returns an array holding the numbers. If no number is found in the string, then it returns null
 * @method module:Str.getNums
 * @param {String} str The string to strip of its numbers.
 * @returns {Array<Number>} An array of numbers.
 * @example
 * var myString = "Apple, 1Apple, Banana, 2Banana, 1, 2, 3 20 100";
 * 
 * Str.getNums(myString); // returns [1, 2, 1, 2, 3, 20, 100];
 */
const getNums = (str) => {
    if (isString(str)) {
        var regex = /[+-]?\d+(?:\.\d+)?/g;
        var matches = str.match(regex);
        return (matches) ? matches.map(Number) : null;
    }
}

export default getNums;