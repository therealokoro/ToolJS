import ToolJS from "../main";
import { spreadToArr } from "../deps";

/**
 * This method returns the minimum value is a list or array of numbers.
 * @method module:Calc.min
 * @param {Array<Number>|Number} numbers A list of numbers to iterate over. Could be an array of numbers.
 * @returns {Number} The minimum value in the list.
 * @example
 * 
 * Calc.min(10, 5); // returns 5
 * 
 * var numbers = [10, 2, 3];
 * var ans = Calc.min(numbers, 20, 15, 1.5); // returns 1.5
 */
const min = (...numbers) => {
    var debugging = ToolJS.env.debugging;
    var arr, err = "The min method accepts only numbers or an array of numbers";
    arr = spreadToArr(numbers, "number", err, debugging);
    return Math.min(...arr);
}

export default min;