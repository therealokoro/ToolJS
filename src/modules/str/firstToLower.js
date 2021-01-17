import isString from "./isString";

/**
 * This method returns a given string with its first character converted to lowercase.
 * @method module:Str.firstToLower
 * @param {String} str The string whose first character is to be converted
 * @returns {String} The converted string
 * @example
 * var myString = "ToolJS";
 * var myString2 = "ToolJS is Awesome";
 * 
 * Str.firstToLower(myString); // returns "toolJS";
 * Str.firstToLower(myString2, 13); // returns "toolJS is Awesome"
 */
const firstToLower = (str) => {
    var firstChar, newWord;

    if (isString(str)) {
        str = str.trim();
        
        firstChar = str.charAt(0);
        var newFirstChar = firstChar.toLowerCase();
        newWord = str.replace(firstChar, newFirstChar);

        return newWord;
    }
}

export default firstToLower;