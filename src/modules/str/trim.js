import isString from "./isString";
import startsWith from "./startsWith";
import endsWith from "./endsWith";

/**
 * This method removes leading and trialing whitespaces of a string, if the deep parameter is set to true, then it also removes extra whitespace between the string characters.
 * @method module:Str.trim
 * @param {String} str The string to be trimmed.
 * @param {Boolean} [deep=false] Determines whether to do a deep trim on the string.
 * @param {Boolean} [char=" "] Specifies which character is to be trimmed off. Default value(" ");
 * @returns {String} The trimmed string.
 * @example
 * var myString = "   ToolJS    Rocks    ";
 * var myString2 = " The extra   whitespaces within   this    string   will   be removed";
 * 
 * Str.trim(myString); // returns "ToolJS    Rocks";
 * Str.trim(myString2, true); // returns "The extra whitespaces within this string will be removed"
 */
const trim = (str, deep = false, char) => {
    var output;

    if (isString(str)) {
        if(char){ output = _charTrim(str); }
        else { output = _simpleTrim(str); }
        return output;
    }

    function noEmpty(arr) { return arr !== ""; }

    function _simpleTrim(str) {
        var trimmed = str.trim();
        
        if (deep) {
            var strSplit = trimmed.split(" ");
            var newArr = strSplit.filter(noEmpty);
            trimmed = newArr.join(" ");
        }

        return trimmed;
    }

    function _charTrim(str) {
        var trimmed;

        if(Array.isArray(char)){
            char.forEach(currChar => {
                str = _startTrim(str, currChar);
                trimmed = str;
            });
        }
        else if (isString(char)) {
            trimmed = _startTrim(str, char);
        }

        function _startTrim(str, char) {
            var trimmed;
            str = _simpleTrim(str);

            if (deep) {
                var strSplit = str.split(char);
                var newArr = strSplit.filter(noEmpty);
                trimmed = newArr.join(" ");
            }
            else {
                if (startsWith(str, char)) { str = str.replace(char, ""); }
                if (endsWith(str, char)) {
                    var lastIndex = str.lastIndexOf(char) - 1;
                    str = str.slice(0, lastIndex);
                }

                trimmed = str;
            }

            trimmed = _simpleTrim(trimmed);

            return trimmed;
        }

        return trimmed;
    }
}

export default trim;