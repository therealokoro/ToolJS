import ToolJS from "../main";
import { spreadToArr } from "../deps";

/**
 * This method subtracts a list of numbers from right to left and returns the result.
 * @method module:Calc.subtract
 * @param {Array<Number>|Number} numbers The numbers to be subtracted. Could be an array of numbers. Note that the order in which they are arranged matters.
 * @returns {Number} The result of the subtraction
 * @example
 * var numbers = [10, 4];
 * 
 * Calc.subtract(numbers); // returns 6;
 * Calc.subtract(1, 2, 3, 4); // returns -8;
 */
const subtract = (...numbers) => {
    var debugging = ToolJS.env.debugging;
    var result, arr, err = "The subtract method accepts only numbers or an array of numbers";
    
    arr = spreadToArr(numbers, "number", err, debugging);
    result = arr.reduce((sum, num) => { return sum - num; });
    
    return result;
}

export default subtract;