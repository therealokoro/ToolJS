import isString from "./isString";

/**
 * This method replaces characters like "&", "<", ">", '"', and "'" with their htmlentities characters in a string with their normal characters and returns it.
 * @method module:Str.htmlencode
 * @param {String} str The string to be escaped
 * @returns {String} The escaped string
 * @example
 * Str.escape("10 is > 5 & 5 < 10"); // returns "10 is &gt; 5 &amp; 5 &lt; 10"
 */

var entityMap = {
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;",
}

const htmlencode = (str) => {
    if (isString(str)) {
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/"/g, '&quot;');
        for (var key in entityMap) {
            var entity = entityMap[key];
            var regex = new RegExp(key, 'g');
            str = str.replace(regex, entity);
        }
        return str;
    }
}

export default htmlencode;