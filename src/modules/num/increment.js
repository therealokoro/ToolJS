import ToolJS from "../main";
import { spreadToArr } from "../deps";
import isNum from "./isNum";

/**
 * This method increments a number by a specified number of times and returns the final value
 * @method module:Num.increment
 * @param {Array<Number>|Number} number The number to increment. Could be an array of number.
 * @param {Number} [n=1] The incrementation value. Default value (1).
 * @returns {Number} The final value
 * @example
 * 
 * var number = [10, 2, 3];
 * 
 * var ans = Num.increment(number, 3); // returns [13, 5, 6]
 * var ans = Num.increment(7, 3); // returns 10
 * var ans = Num.increment(2); // returns 3
 */
const increment = (number, n = 1) => {
    var debugging = ToolJS.env.debugging;
    var arr = [], output = [], err = "The increment method accepts only number or an array of number";
    
    if(Array.isArray(number)){
        arr = spreadToArr(number, "number", err, debugging);
    }
    else if(isNum(number)){ arr.push(number) }

    arr.forEach(currNum => {
        var inc = n;
        while (inc > 0) { ++currNum; --inc; }
        output.push(currNum);
    });

    return (output.length > 1) ? output : output[0];
}

export default increment;