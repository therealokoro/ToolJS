import isString from "./isString";
import words from "./words";

/**
 * This method returns the shortest word in a given string
 * @method module:Str.shortest
 * @param {String} str The string whose shortest word is to be returned.
 * @param {Boolean} [length=false] This tells the method to return the length of the shortest word instead of the word itself.
 * @returns {String|Number} The shortest word or the length of the shortest word.
 * @example
 * var myString = "ToolJS is not the shortest word is this string.";
 * 
 * Str.shortest(myString); // returns "is"
 * Str.shortest(myString, true); // returns 2
 */
const shortest = (str, length) => {
    var output;

    if (isString(str)) {
        str = str.trim();
        var toWords = words(str);

        if(length){
            var wordLeng = toWords.map(currWord => currWord.length);
            output = Math.min(...wordLeng);
        }
        else{
            output = toWords.reduce((shortest, curr) => {
                return (shortest.length <= curr.length) ? shortest : curr;
            });
        }

        return output;
    }
}

export default shortest;