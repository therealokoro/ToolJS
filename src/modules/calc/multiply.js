import ToolJS from "../main";
import { spreadToArr } from "../deps";

/**
 * This method multiplies two(2) or more numbers together and returns the product of the numbers.
 * @method module:Calc.multiply
 * @param {Array<Number>|Number} numbers The numbers to be multiplied. Could be an array of numbers.
 * @returns {Number} The product of the numbers
 * @example
 * var numbers = [1, 2, 3, 4];
 * 
 * Calc.multiply(numbers); // returns 24;
 * Calc.multiply(10, 2, 3, 4); // returns 240;
 */
const multiply = (...numbers) => {
    var debugging = ToolJS.env.debugging;
    var result, arr, err = "The multiply method accepts only numbers or an array of numbers";
    
    arr = spreadToArr(numbers, "number", err, debugging);
    result = arr.reduce((sum, num) => { return sum * num; });
    
    return result;
}

export default multiply;