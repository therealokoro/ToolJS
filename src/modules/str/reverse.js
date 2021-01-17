import isString from "./isString";

/**
 * This method reverses a string by its characters and returns it.
 * @method module:Str.reverse
 * @param {String} str The string to be reversed
 * @param {Boolean} [alt=false] This determines if the reverse should be done by words and not characters.
 * @returns {Boolean} The reversed string.
 * @example
 * var myString = "I will be reversed";
 * 
 * Str.reverse(myString); // returns "desrever eb lliw I";
 * Str.reverse(myString, true); // returns "reversed be will I";
 */
const reverse = (str, alt = false) => {
    var output, toArray;

    if (isString(str)) {
        if(alt){
            toArray = str.split(" ");
            output = toArray.reverse();
            output = output.join(" ");
        }
        else{
            toArray = str.split("");
            output = toArray.reverse();
            output = output.join("");
        }
    }

    return output;
}

export default reverse;