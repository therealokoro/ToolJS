import isString from "./isString";

/**
 * This method returns the characters and words between two given string, if found.
 * @method module:Str.between
 * @param {String} str The string to make the search on.
 * @param {String} start The starting string, i.e the beginning of the range.
 * @param {String} end The end string, i.e the ending of the range.
 * @returns {String} The result of the search
 * @example
 * var myString = "The string in the { curly brackets will } be returned";
 * 
 * Str.between(myString, "{", "}"); // returns " curly brackets will ";
 */
const between = (str, start, end) => {
    if (isString(str) && isString(start) && isString(end)) {
        str = str.trim();
        
        var startpos = str.indexOf(start) + start.length;
        var endpos = str.lastIndexOf(end) - end.length;
        
        return str.substr(startpos, endpos);
    }
}

export default between;