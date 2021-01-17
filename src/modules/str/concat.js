import ToolJS from "../main";
import { Logs, spreadToArr } from "../deps";
import isString from "./isString";

/**
 * This method concatenates two(2) or more strings and returns a new string.
 * @method module:Str.concat
 * @param {Array<String>} strings The strings to be concatenated together. Could be an array of strings
 * @returns {String} The new string.
 * @example
 * 
 * var string1 = "John Doe ";
 * var string2 = "and i am 20yrs old.";
 * 
 * Str.concat(["My ", "Name ", "is "], string1, string2, "I ", ["am", " a programmer"]);
 * // returns "My Name is John Doe and i am 20yrs old. I am a programmer"
 * 
 * Str.concat(string1, string2);
 * // returns "John Doe and i am 20yrs old."
 * 
 * Str.concat([string1, string2]);
 * // returns "John Doe and i am 20yrs old."
 */
const concat = (...strings) => {
    var debugging = ToolJS.env.debugging;
    var output = "", strArr, err = "All parameters must be of type string";
    strArr = spreadToArr(strings, "string", err, debugging);

    for (let currStr of strArr) {
        if (isString(currStr)) { output = output.concat(currStr); }
        else { if (debugging) Logs.warn("") }
    }

    return output;
}

export default concat;