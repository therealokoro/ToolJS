import isString from "./isString";

/**
 * This method replaces the htmlentities characters in a string with their normal characters and returns it.
 * @method module:Str.htmldecode
 * @param {String} str The string to be decoded
 * @returns {String} The decoded string
 * @example
 * Str.htmldecode("10 is &gt; 5 &amp; 5 &lt; 10"); // returns "10 is > 5 & 5 < 10";
 */

var entityMap = {
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;",
};

const htmldecode = (str) => {
    if (isString(str)) {
        for (var key in entityMap) {
            var entity = entityMap[key];
            var regex = new RegExp(entity, 'g');
            str = str.replace(regex, key);
        }
        str = str.replace(/&quot;/g, '"');
        str = str.replace(/&amp;/g, '&');
        return str;
    }
}

export default htmldecode;