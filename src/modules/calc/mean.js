import ToolJS from "../main";
import { spreadToArr } from "../deps";

/**
 * This method calculates the mean(average) of a set of numbers and returns the value.
 * @method module:Calc.mean
 * @param {Array<Number>|Number} numbers A set of numbers. Could be an array of numbers.
 * @returns {Number} The mean of the numbers
 * @example
 * Calc.mean(1, 2, 3); // returns 2;
 */
const mean = (...numbers) => {
    var debugging = ToolJS.env.debugging;
    var result, arr, err = "The mean method accepts only numbers or an array of numbers";
    
    arr = spreadToArr(numbers, "number", err, debugging);
    result = arr.reduce((sum, num) => { return sum + num; });
    return result / arr.length;
}

export default mean;