import isString from "./isString";

/**
 * This method converts a string to tolower.
 * @method module:Str.toLower
 * @param {String} str The string to be converted to lowercase
 * @returns {String} The converted string
 * @example
 * var myString = "ToolJS_IS_an-Awesome-library, TRY IT OUT";
 * 
 * Str.toLower(myString); // returns "tooljs_is_an-awesome-library, try it out";
 */
const toLower = (str) => {
    if (isString(str)) {
        str = str.trim();
        return str.toLowerCase();
    }
}

export default toLower;