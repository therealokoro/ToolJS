import ToolJS from "../main";
import { spreadToArr } from "../deps";

/**
 * This method divides two(2) or more numbers and returns the result.
 * @method module:Calc.divide
 * @param {Array<Number>|Number} numbers The numbers to be divided. Could be an array of numbers.
 * @returns {Number} The result of the division
 * @example
 * 
 * Calc.divide(10, 5); // returns 2
 * 
 * var numbers = [10, 2, 3];
 * var ans = Calc.divide(numbers); // returns 1.6666666667
 * 
 * // ans can now be rounded up to n decimal places
 * Num.round(ans, 2); // returns 1.67
 */
const divide = (...numbers) => {
    var debugging = ToolJS.env.debugging;
    var result, arr, err = "The divide method accepts only numbers or an array of numbers";
    
    arr = spreadToArr(numbers, "number", err, debugging);
    result = arr.reduce((sum, num) => { return sum / num; });
    
    return result;
}

export default divide;