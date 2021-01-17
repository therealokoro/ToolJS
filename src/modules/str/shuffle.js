import isString from "./isString";

/**
 * This method shuffles the words of a string and returns a new string. It can alternatively shuffle the characters of the string.
 * @method module:Str.shuffle
 * @param {String} str The string to be shuffled
 * @param {Boolean} [alt=false] Tells the method to carry out the shuffle on characters of the string and not words.
 * @returns {String} The shuffled string.
 * @example
 * var myString = "I will be shuffled";
 * 
 * Str.shuffle(myString); // returns "desrever eb lliw I";
 * Str.shuffle(myString, true); // returns "shuffled be will I";
 */
const shuffle = (str, alt = false) => {
    var output, toArray;
    var splitChar = (alt === true) ? "" : " ";

    if (isString(str)) {
        toArray = str.split(splitChar);
        toArray.sort(function () { return 0.5 - Math.random(); });
        output = toArray.join(splitChar);
        return output;
    }
}

export default shuffle;