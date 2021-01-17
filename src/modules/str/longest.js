import isString from "./isString";
import words from "./words";

/**
 * This method returns the longest word in a given string
 * @method module:Str.longest
 * @param {String} str The string whose longest word is to be returned.
 * @param {Boolean} [length=false] This tells the method to return the length of the longest word instead of the word itself.
 * @returns {String|Number} The longest word or the length of the longest word.
 * @example
 * var myString = "ToolJS is not the longest word is this string.";
 * 
 * Str.longest(myString); // returns "longest"
 * Str.longest(myString, true); // returns 7
 */
const longest = (str, length) => {
    var output;

    if (isString(str)) {
        str = str.trim();
        var toWords = words(str);

        if(length){
            var wordLeng = toWords.map(currWord => currWord.length);
            output = Math.max(...wordLeng);
        }
        else{
            output = toWords.reduce((longest, curr) => {
                return (longest.length >= curr.length) ? longest : curr;
            });
        }

        return output;
    }
}

export default longest;