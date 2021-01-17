import isString from "./isString";
import firstToLower from "./firstToLower";

/**
 * This method returns a slugified string from a reference string.
 * @method module:Str.slugify
 * @param {String} str The string to be slugified
 * @returns {String} The slugified string
 * @example
 * var myString = "ToolJS Rocks, you should think of using it too";
 * 
 * Str.slugify(myString); // returns "toolJS-rocks-you-should-think-of-using-it-too";
 */
const slugify = (str) => {
    var slugified = [], output, delimeter = " ";

    if(isString(str)){
        str = str.trim();
        str = str.replace(/,/g, "");
        str = str.replace(/_|-|'|"|,| /g, delimeter);
        var words = str.split(delimeter);

        for (let i = 0; i < words.length; i++) {
            const currWord = words[i];
            var newWord = firstToLower(currWord);
            slugified.push(newWord);
        }
    }

    output = slugified.join("-");

    return output;
}

export default slugify;