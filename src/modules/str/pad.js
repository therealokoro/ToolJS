import isString from "./isString";
import isObj from "../obj/isObj";

/**
 * This method inserts a given character at both ends of a string. It can optional add the character at one end of the string.
 * @method module:Str.pad
 * @param {String} str The string to be padded.
 * @param {Boolean} [options] An option object to specifying the padding characters per direction.
 * If passed a string then its used for both the left and right padding.
 * @param {String} [options.left] Specifies the character for the left padding.
 * @param {String} [options.right] Specifies the character for the right padding.
 * @returns {String} The padded string.
 * @example
 * var myString = "ToolJS Rocks";
 * 
 * Str.pad(myString, "__"); // returns "__ToolJS Rocks__";
 * 
 * Str.pad(myString, {
 *      left: "**",
 *      right: "##"
 * }); // returns "**ToolJS Rocks##";
 */
const pad = (str, options) => {
    var output, left, right;

    if (isString(str)) {
        str = str.trim();

        if (isString(options)){ 
            var char = options;
            output = char + str + char; 
        }
        else if (isObj(options)){
            left = options.left;
            right = options.right;
            output = left + str + right;
        }

        return output;
    }
}

export default pad;