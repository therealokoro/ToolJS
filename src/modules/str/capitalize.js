import isString from "./isString";
import firstToUpper from "./firstToUpper";

/**
 * This method capitalizez a given string. It converts the first character of each word to uppercase.
 * @method module:Str.capitalize
 * @param {String} str The string to be capitalized.
 * @returns {String} The capitalized string
 * @example
 * var myString = "toolJS is awesome and it rocks";
 * 
 * Str.capitalize(myString); // returns "ToolJS Is Awesome And It Rocks";
 */
const capitalize = (str) => {
    var capitalized = [], output;

    if(isString(str)){
        str = str.trim();
        var words = str.split(" ");

        for (let i = 0; i < words.length; i++) {
            const currWord = words[i];
            var newWord = firstToUpper(currWord);
            capitalized.push(newWord);
        }
    }

    output = capitalized.join(" ");

    return output;
}

export default capitalize;