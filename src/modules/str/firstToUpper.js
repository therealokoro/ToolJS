import isString from "./isString";

/**
 * This method returns a given string with its first character converted to uppercase.
 * To convert the first character of each word in a string use the [.capitalize()]{@link module:Str.capitalize} method
 * @method module:Str.firstToUpper
 * @param {String} str The string whose first character is to be converted
 * @returns {String} The converted string
 * @example
 * var myString = "toolJS";
 * var myString2 = "toolJS is awesome";
 * 
 * Str.firstToUpper(myString); // returns "ToolJS";
 * Str.firstToUpper(myString2, 13); // returns "ToolJS is awesome"
 */
const firstToUpper = (str) => {
    var firstChar, newWord;

    if (isString(str)) {
        str = str.trim();
        
        firstChar = str.charAt(0);
        var newFirstChar = firstChar.toUpperCase();
        newWord = str.replace(firstChar, newFirstChar);

        return newWord;
    }
}

export default firstToUpper;