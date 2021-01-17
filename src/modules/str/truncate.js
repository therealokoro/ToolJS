import ToolJS from "../main";
import { Logs } from "../deps";
import isObj from "../obj/isObj";
import isNum from "../num/isNum";
import isString from "./isString";

/**
 * This method truncates a given string to a given length and appends a given string at the end.
 * @method module:Str.truncate
 * @param {String} str The string to be truncated
 * @param {Object|Number} [options] An option object determines how the string is truncated. If passed a number then it represents the string limit.
 * @param {Number} [options.limit=30] The maximum length allowed for the truncated string.
 * @param {String} [options.replacement="..."] The replacement string to be appended at the end of the truncated string.
 * @param {String} [replacement="..."] The replacement string for the truncated string. This is used only when a number is passed to the preceeding parameter.
 * @returns {String} The truncated string.
 * @example
 * var myString = "This is a long string, which will be truncated into a shorter version";
 * 
 * Str.truncate(myString, 21, "[...]"); // returns "This is a long string[...]";
 */
const truncate = (str, options, replacement = "...") => {
    var debugging = ToolJS.env.debugging;
    var output, limit = 30;

    if (isString(str)) {
        str = str.trim();
        output = _truncate(str);
    }

    function _truncate(str) {
        if (isObj(options)) {
            limit = (isNum(options.limit)) ? options.limit : limit;
            replacement = (isString(options.replacement)) ? options.replacement : replacement;
        }
        else if (isNum(options)){ limit = options; }
        else { if (debugging) Logs.warn("The options parameter should be an object or a number specifing the string length"); }

        return str.length > limit ? str.slice(0, limit) + replacement : str;
    }

    return output;
}

export default truncate;