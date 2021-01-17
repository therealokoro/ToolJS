import ToolJS from "../main";
import { Logs, spreadToArr } from "../deps";

/**
 * This method joins two(2) or more strings together using a given delimeter.
 * @method module:Str.joinBy
 * @param {String|Number} delimeter The character to join the strings together with.
 * @param {String|Array<String>} strings The strings to join. Could be an array of strings.
 * @param {String} [strings] More strings to join.
 * @returns {String} The new string.
 * @example
 * 
 * var string1 = "John Doe";
 * var string2 = "and i am 20yrs old.";
 * 
 * Str.joinBy("_", ["My", "Name", "is"], string1, string2);
 * // returns "My_Name_is_John Doe_and i am 20yrs old"
 * 
 * Str.joinBy(" | ", "String", "Number", "Array", "Boolean");
 * // returns "Strings | Number | Arrary | Boolean"
 */
const joinBy = (delimeter, ...strings) => {
    var debugging = ToolJS.env.debugging;
    var output = "", strArr, err = "All parameters must be of type string";
    strArr = spreadToArr(strings, "string", err, debugging);

    if (delimeter) { output = strArr.join(delimeter); }
    else { Logs.throw("The joinBy method requires a delimeter for joining"); }
    return output;
}

export default joinBy;