import ToolJS from "../main";
import { spreadToArr } from "../deps";
import isNum from "./isNum";

/**
 * This method decrements a number by a specified number of times and returns the final value
 * @method module:Num.decrement
 * @param {Array<Number>|Number} number The number to decrement. Could be an array of number.
 * @param {Number} [n=1] The decrementation value. Default value (1).
 * @returns {Number} The final value
 * @example
 * 
 * var number = [10, 2, 3];
 * 
 * var ans = Num.decrement(number, 3); // returns [7, -1, 0]
 * var ans = Num.decrement(7, 3); // returns 4
 * var ans = Num.decrement(2); // returns -1
 */
const decrement = (number, n = 1) => {
    var debugging = ToolJS.env.debugging;
    var arr = [], output = [], err = "The decrement method accepts only number or an array of number";
    
    if(Array.isArray(number)){
        arr = spreadToArr(number, "number", err, debugging);
    }
    else if(isNum(number)){ arr.push(number) }

    arr.forEach(currNum => {
        var inc = n;
        while (inc > 0) { --currNum; --inc; }
        output.push(currNum);
    });

    return (output.length > 1) ? output : output[0];
}

export default decrement;