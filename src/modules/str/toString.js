import ToolJS from "../main";
import { Logs } from "../deps";
import isString from "./isString";

/**
 * This method converts a non-string value or item to a string and returns it.
 * @method module:Str.toString
 * @param {String} value The to be converted to a string.
 * @returns {String} The new string.
 * @example
 * 
 * Str.toString(45); // returns "45";
 */
const toString = (value) => {
    var debugging = ToolJS.env.debugging;
    var output;

    if (!isString(value)) { output = String(value); return output; }
}

export default toString;