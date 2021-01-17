import ToolJS from "../main";
import { spreadToArr } from "../deps";

/**
 * This method returns an array containing each word in a string or an array of strings.
 * @method module:Str.words
 * @param {String|Array<String>} strings The string whose words are to be returned. Could be an array of strings.
 * @returns {Array} An array of the words found in the string(s).
 * @example
 * var myString = "This is the first sentence";
 * var mySecondString = "This is second sentence";
 * 
 * Str.words(myString); // returns ["This", "is", "the", "first", "sentence"]
 * Str.words(myString, mySecondString);
 * // returns ["This", "is", "the", "first", "sentence", "This", "is", "second", "sentence"]);
 */
const words = (...strings) => {
    var debugging = ToolJS.env.debugging;
    var strArray, output = [];
    var err = "The str parameter must hold only strings or an array of strings";

    strArray = spreadToArr(strings, "string", err, debugging);

    strArray.forEach(currStr => {
        currStr = currStr.trim();
        // currStr = currStr.replace(/[^A-Za-z0-9]+/g, " ");
        currStr = currStr.replace(/[^A-Za-z0-9$]+/g, " ");
        var newArr = currStr.split(" ");
        output = output.concat(newArr);
    });

    var specials = ["$", "!", "#", "%", "<", ">", "."];
    
    return output;
}

export default words;