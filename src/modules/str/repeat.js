import ToolJS from "../main";
import { Logs } from "../deps";
import isString from "./isString";

/**
 * This method returns a string repeated n number of times
 * @method module:Str.repeat
 * @param {String} str The string to be repeated.
 * @param {Number} [count=1] The number of times the original string value should be repeated in the new string. This is optional
 * @param {String|Array<String>} [substr] An optional parameter to specify a particular substring to be repeated in the main string. Could be an array of strings
 * @returns {String} A new string containing copies of the original string
 * @example
 * var myString = "ToolJS";
 * var myString2 = "This is the first sentence";
 * 
 * Str.repeat(myString); // returns "ToolJSToolJS";
 * Str.repeat(myString2, 3, "the"); // returns "This is thethethe first sentence";
 */
const repeat = (str, count = 1, substr) => {
    var debugging = ToolJS.env.debugging;
    var output;

    if (isString(str)) {
        if(substr){
            if (Array.isArray(substr)) {
                substr.forEach(currSubStr => {
                    var newSubStr = currSubStr.repeat(count);
                    output = str.replace(currSubStr, newSubStr);
                });
            }
            else if(isString(substr)){
                var newSubStr = substr.repeat(count);
                output = str.replace(substr, newSubStr);
            }
            else { if(debugging) Logs.warn("The substring parameter must either be a string or an array of strings"); }
        }
        else{ output = str.repeat(count); }

        return output;
    }
}

export default repeat;