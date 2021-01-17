import isString from "./isString";
import words from "./words";
import isNum from "../num/isNum";

/**
 * This method creates an array of words split into groups the length of a specified size. Leftover words are placed in a single array.
 * @method module:Str.wordChunk
 * @param {String} str The string to be split into chunks of words.
 * @param {Number} size The size of each chunk of word.
 * @returns {Array<Array>} An array of chunks of words.
 * @example
 * var myString = "This is a long string, which will be split into chunks of words";
 * 
 * Str.wordChunk(myString, 4); 
 * // returns [["This" "is" "a" "long"], ["string", "which" "will" "be"], ["split", "into", "chunks", "of"], ["words"]]
 */
const wordChunk = (str, size) => {
    var output = [], wordArr;

    if (isString(str) && isNum(size)) {
        str = str.trim();
        wordArr = words(str);
        
        while (wordArr.length) {
            var chunk = wordArr.slice(0, size);
            wordArr = wordArr.slice(size, wordArr.length);
            output.push(chunk);
        }

        return output;
    }
}

export default wordChunk;