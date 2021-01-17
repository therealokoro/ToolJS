import isString from "./isString";
import isNum from "../num/isNum";
import words from "./words";

/**
 * This method counts the number of words presents in a string and returns the value.
 * @method module:Str.wordCount
 * @param {String} str The string to be counted.
 * @param {String|Number} [start=0] If passed a number, then the count will start at the index corresponding with the number.
 * But if passed a string, then the count will start at the first occurance of the string
 * @param {String|Number} [end=str.length] If passed a number, then the count will end at the index corresponding with the number.
 * But if passed a string, then the count will end at the last occurance of the string
 * @returns {Number} The result of the count
 * @example
 * var myString = "ToolJS Rocks";
 * var myString2 = "This is a longer string, but the count will start from the word 'but' and end at 'start'";
 * 
 * var out = Str.wordCount(myString); // returns 2
 * var out = Str.wordCount(myString, "Rocks"); // returns 1
 * var out = Str.wordCount(myString2, 24, 43); // returns 5
 * var out = Str.wordCount(myString2, "longer", "will"); // returns 6
 */
const wordCount = (str, start = 0, end = str.length) => {
    var newString, result, startpos, endpos;
    
    if(start){
        if(isString(start)) { startpos = str.indexOf(start); }
        else if(isNum(start)) { startpos = start; }
    }
    
    if(end){
        if(isString(end)) { endpos = str.lastIndexOf(end) + end.length; }
        else if(isNum(end)) { endpos = end; }
    }

    newString = str.slice(startpos, endpos);
    result = words(newString).length;
    
    return result;
}

export default wordCount;