import ToolJS from "../main";
import { spreadToArr } from "../deps";

/**
 * This method sums two(2) or more numbers together and returns the sum.
 * @method module:Calc.add
 * @param {Array<Number>|Number} numbers The numbers to be summed up. Could be an array of numbers.
 * @returns {Number} The result of the summation
 * @example
 * var numbers = [4, 4, 10];
 * 
 * Calc.add(numbers); // returns 18;
 * Calc.add(1, 2, 3, 4); // returns 10;
 * Calc.add(numbers, 1, 2, 3, 4, [5, 5], 2); // returns 40;
 */
const add = (...numbers) => {
    var debugging = ToolJS.env.debugging;
    var result, arr, err = "The add method accepts only numbers or an array of numbers";
    
    arr = spreadToArr(numbers, "number", err, debugging);
    result = arr.reduce((sum, num) => { return sum + num; });
    
    return result;
}

export default add;