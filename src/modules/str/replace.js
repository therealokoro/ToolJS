import ToolJS from "../main";
import { Logs } from "../deps";
import isString from "./isString";

/**
 * This method scans through a reference string for matches to a specified string, replaces them with a new string and returns a new string.
 * @method module:Str.replace
 * @param {String} str The reference string to scanned and modified
 * @param {String|Regexp|Array<String>} pattern The string to be replaced. Could be a single string, an array of strings or just a regexp.
 * @param {String} replacement The replacement string to be used.
 * @returns {String} A new string with the replacements.
 * @example
 * var myString = "This is the first sentence";
 * 
 * Str.replace(myString, "first", "second"); // returns "This is the second sentence"
 * Str.replace(myString, /th/ig, "blabla"); // returns "blablais is blabla second sentence"
 */
const replace = (str, pattern, replacement) => {
    var debugging = ToolJS.env.debugging;
    var output;

    if (!str || !pattern || !replacement){
        if(debugging) Logs.warn("The replace method requires a string, pattern and a replacement parameter");
        return;
    }

    if(isString(str)){
        if (pattern && replacement) {
            if (Array.isArray(pattern)) {
                pattern.forEach(currPattern => {
                    output = str.replace(currPattern, replacement);
                });
            }
            else {
                output = str.replace(pattern, replacement);
            }
        }

        return output;
    }

}

export default replace;