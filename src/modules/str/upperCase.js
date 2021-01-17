import isString from "./isString";

/**
 * This method converts a string to uppercase, separating each word by a space.
 * @method module:Str.upperCase
 * @param {String} str The string to be converted to uppercase
 * @returns {String} The converted string
 * @example
 * var myString = "toolJS_is_an-awesome-library, try it out";
 * 
 * Str.upperCase(myString); // returns "TOOLJS IS AN AWESOME LIBRARY, TRY IT OUT";
 */
const upperCase = (str) => {
    var delimeter = " ";

    if(isString(str)){
        str = str.trim();
        str = str.replace(/_|-| /g, delimeter);
        return str.toUpperCase();
    }
}

export default upperCase;