import isString from "./isString";
import isUpper from "./isUpper";
import isLower from "./isLower";

/**
 * This method toggles an uppercase string to lowercase and vise versa. If the original string is not in either upper or lower case, then the no conversion is made. 
 * @method module:Str.toggleCase
 * @param {String} str The string to be toggled
 * @returns {String} The new string
 * @example
 * Str.toggleCase("i am in lowercase"); // returns "I AM IN LOWERCASE";
 * Str.toggleCase("I AM IN UPPERCASE"); // returns "i am in uppercase";
 */
const toggleCase = (str) => {
    var output;

    if (isString(str)) {
        str = str.trim();
        if (isUpper(str)){ output = str.toLowerCase(); }
        else if (isLower(str)){ output = str.toUpperCase(); }
    }

    return output;
}

export default toggleCase;