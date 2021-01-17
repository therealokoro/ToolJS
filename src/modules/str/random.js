import ToolJS from "../main";
import { Logs } from "../deps";
import isObj from "../obj/isObj";

/**
 * This method generates a random string in accordance to a set of options, and returns the string. Note that the min and max numbers are inclusive when generating integers.
 * @method module:Str.random
 * @param {Object} [options] An object that controls how the random string is generated.
 * @param {Boolean} [options.alphanumeric=false] Tells the method to generate an alphanumeric string.
 * @param {Boolean} [options.string=true] Tells the method to generate only strings.
 * @param {Boolean} [options.integer=false] Tells the method to generate only integers.
 * @param {Boolean} [options.characters] A string or characters to be used when generating string or alphanumeric randoms.
 * @param {String} [options.casing="lowecase"] Specifies the casing of the generated string. Either "lowercase" or "uppercase".
 * @param {Number} [options.length=10] Specifies the length of the generated string.
 * @param {Number} [options.min=0] The min value of the range. This is only used when integer is set to true.
 * @param {Number} [options.max=100] The max value of the range. This is only used when integer is set to true.
 * @param {Boolean} [options.round=true] This determines if the value returned should be rounded.
 * @param {Number} [options.decimals=3] If the round option is set to false, then this sets the number of decimal places to round to.
 * @returns {String} The random string generated.
 * @example
 * 
 * var value = Str.random(); // returns a random string
 * 
 * var value = Str.random({
 *      casing: "uppercase",
 *      length: 5,
 *      alphanumeric: true,
 * }); // returns a random alphanumeric string 5 characters long in uppercase
 */
const random = (options) => {
    var debugging = ToolJS.env.debugging;
    var output, min = 0, max = 100, round = true, decimals = 3, casing = "lowercase",
        length = 10, string = true, integer = false, alphanumeric = false,
        characters = "abcdefghijklmnopqrstuvwxyz";

    if (isObj(options)){
        min = (typeof options.min === "number") ? options.min : min;
        max = (typeof options.max === "number") ? options.max : max;
        round = (typeof options.round === "boolean") ? options.round : round;
        casing = (typeof options.casing === "string") ? options.casing : casing;
        string = (typeof options.string === "boolean") ? options.string : string;
        length = (typeof options.length === "number") ? options.length : length;
        integer = (typeof options.integer === "boolean") ? options.integer : integer;
        decimals = (typeof options.decimals === "number") ? options.decimals : decimals;
        characters = (typeof options.characters === "string") ? options.characters : characters;
        alphanumeric = (typeof options.alphanumeric === "boolean") ? options.alphanumeric : alphanumeric;
    }

    function _random() {
        var text, num, result;

        if (alphanumeric === true){
            // text = Math.random().toString(36).replace('0.', '');
            text = Math.random().toString(20).substr(2, length);

            var first = text.charAt(0);
            var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

            if (digits.includes(first)) {
                var index = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
                characters = characters.split("");
                var newAlpha = characters[index];
                text = text.replace(first, newAlpha);
            }
        }
        else if (integer === true) {
            if (round == true) { num = Math.floor(Math.random() * (max - min + 1)) + min; }
            else {
                num = Math.random() * (max - min + 1) + min;
                num = num.toFixed(decimals);
            }
        }
        else if(string == true){
            var toArray = characters.split("");
            text = "";

            for (var i = 0; i < length; i++) {
                index = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
                text += toArray[index];
            }
        }
        else if (integer == false && string == false) {
            if (debugging) Logs.throw("One of either integer or string must be set to 'true'");
        }

        if(text){
            if (casing == "uppercase") { text = text.toUpperCase(); }
            else if (casing == "lowercase") { text = text.toLowerCase(); }
            result = text;
        }
        else if(num){ result = num; }

        return result;
    }

    output = _random();
    return output;
}

export default random;