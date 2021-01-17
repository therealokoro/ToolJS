import isString from "./isString";
import firstToUpper from "./firstToUpper";
import camelCase from "./camelCase";

/**
 * This method converts a given string to a hashtag string.
 * @method module:Str.toHashTag
 * @param {String} str The string to be converted.
 * @param {Boolean} [toUpper=false] Determines whether the hashtag string should be made uppercase. Default value(false) .
 * @returns {String} The hashtagged string
 * @example
 * var myString = "Black Lives Matter";
 * var myString2 = "toolJS is awesome";
 * 
 * Str.toHashTag(myString, true); // returns "#BLACKLIVESMATTER";
 * Str.toHashTag(myString2); // returns "#ToolJSIsAwesome"
 */
const toHashTag = (str, toUpper) => {
    var output, newString;

    if (isString(str)) {
        str = str.trim();
        newString = firstToUpper(camelCase(str));
        output = `#${newString}`;
        output = (toUpper == true) ? output.toUpperCase() : output;

        return output;
    }
}

export default toHashTag;