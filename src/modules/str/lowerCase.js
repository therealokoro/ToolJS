import isString from "./isString";

/**
 * This method converts a string to lowercase, separating each word by a space.
 * @method module:Str.lowerCase
 * @param {String} str The string to be to converted lowecase
 * @returns {String} The converted string
 * @example
 * var myString = "toolJS_is_an-awesome-library, try it out";
 * 
 * Str.lowerCase(myString); // returns "tooljs is an awesome library, try it out";
 */
const lowerCase = (str) => {
    var output, delimeter = " ";

    if (isString(str)) {
        str = str.trim();
        str = str.replace(/_|-| /g, delimeter);
        output = str.toLowerCase();
    }

    return output;
}

export default lowerCase;