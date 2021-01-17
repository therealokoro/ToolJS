import ToolJS from "../main";
import { Logs } from "../deps";
import isObj from "../obj/isObj";
import isNum from "./isNum";

/**
 * This method returns a random number within a given range. Default Range (0 - 100). Note that the min and max numbers are inclusive.
 * @method module:Num.rand
 * @param {Object} [options] An object that controls how the random number is generated. If passed an number, then it sets the min value
 * @param {Number} [options.min=0] The minimum value of the range. Default (0)
 * @param {Number} [options.max=100] The maximum value of the range. Default (100)
 * @param {Boolean} [options.round=true] This determines if the value returned should be rounded. Default (true)
 * @param {Number} [options.decimals=3] If the round option is set to false, then this sets the number of decimal places to round to. Default (3)
 * @param {Number} [max] The maximum value of the range. This is only used if the first paramter is passed a number and not an object
 * @returns {Number} The random number generated
 * @example
 * 
 * var value = Num.rand(10, 1000); // returns a random number between 10 - 1000
 * 
 * var value = Num.rand({
 *      min: 10,
 *      max: 100,
 *      round: false,
 *      decimals: 2
 * }); // returns a random number between 10 - 1000
 */
const rand = (options, max) => {
    var debugging = ToolJS.env.debugging;
    var number, minimum = 0, maximum = 100, round = true, decimals = 3;

    if (isObj(options)){
        minimum = (typeof options.min === "number") ? options.min : minimum;
        maximum = (typeof options.max === "number") ? options.max : maximum;
        round = (typeof options.round === "boolean") ? options.round : round;
        decimals = (typeof options.decimals === "number") ? options.decimals : decimals;

        if(max && debugging) Logs.warn("This parameter would be ignored, because an object was passed as the first parameter");
    }
    else if (isNum(options)) {
        minimum = options;

        if (isNum(max)) { maximum = (typeof max === "number") ? max : maximum; }
        else{ if(debugging) Logs.throw("The max parameter must be a number") }
    }
    else{ if(debugging) Logs.throw("The options parameter must either be an object literal or a number") }

    if (round === true) { number = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum; }
    else{
        number = Math.random() * (maximum - minimum + 1) + minimum;
        number = number.toFixed(decimals);
    }

    return number;
}

export default rand;