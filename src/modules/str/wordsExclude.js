import isString from "./isString";
import words from "./words";

/**
 * This method returns an array containing each word in a string or an array of strings, while excluding a set of specified words
 * @method module:Str.wordsExclude
 * @param {String|Array<String>} exclude An array of words to exclude from the result if found in the given string. Could be a single string
 * @param {String|Array<String>} strings The string whose camel case version is to be returned
 * @returns {Array} An array of the words found in the string(s).
 * @example
 * var myString = "This is the first sentence";
 * var mySecondString = "This is another sentence";
 * 
 * Str.wordsExclude("sentence", myString, mySecondString);
 * // returns ["is", "the", "first", "sentence", "is", "another", "sentence"]
 */
const wordsExclude = (exclude, ...strings) => {
    var wordsArray, excludeArr = [], output = [];

    if (exclude) {
        if (isString(exclude)) { excludeArr.push(exclude); }
        else if (Array.isArray(exclude)) {
            exclude.forEach(curr => { excludeArr.push(curr); });
        }
    }

    if(strings){
        wordsArray = words(strings);
        wordsArray.map(curr => {
            if(!excludeArr.includes(curr)) output.push(curr);
        });
    }

    return output;
}

export default wordsExclude;