import ToolJS from "../main";
import { spreadToArr } from "../deps";

/**
 * This method returns the maximum value is a list or array of numbers.
 * @method module:Calc.max
 * @param {Array<Number>|Number} numbers A list of numbers to iterate over. Could be an array of numbers.
 * @returns {Number} The maximum value in the list.
 * @example
 * 
 * Calc.max(10, 5); // returns 10
 * 
 * var numbers = [10, 2, 3];
 * var ans = Calc.max(numbers, 20, 15, 1.5); // returns 20
 */
const max = (...numbers) => {
    var debugging = ToolJS.env.debugging;
    var arr, err = "The max method accepts only numbers or an array of numbers";
    arr = spreadToArr(numbers, "number", err, debugging);
    return Math.max(...arr);
}

export default max;