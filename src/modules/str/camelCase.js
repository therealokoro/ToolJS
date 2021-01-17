import isString from "./isString";
import firstToUpper from "./firstToUpper";
import firstToLower from "./firstToLower";

/**
 * This method returns a camel cased version of a given string
 * @method module:Str.camelCase
 * @param {String} str The string whose camel case version is to be returned
 * @returns {String} The camel cased string
 * @example
 * var myString = "ToolJS Rocks";
 * 
 * Str.camelCase(myString); // returns "tooljsRocks";
 */
const camelCase = (str) => {
    var camelCased = [], output, delimeter = " ";

    if(isString(str)){
        str = str.trim();
        str = str.replace(/_|-|'|"| /g, delimeter);
        var words = str.split(delimeter);

        for (let i = 0; i < words.length; i++) {
            const currWord = words[i];

            if(i == 0){
                var newWord = firstToLower(currWord);
                camelCased.push(newWord);
            }
            else {
                var newWord = firstToUpper(currWord);
                camelCased.push(newWord);
            }
        }
    }

    output = camelCased.join("");

    return output;
}

export default camelCase;