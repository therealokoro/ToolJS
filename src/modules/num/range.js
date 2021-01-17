import ToolJS from "../main";
import { spreadToArr } from "../deps";

/**
 * This method calculates and returns the range of a set of numbers.
 * @method module:Num.range
 * @param {Array<Number>|Number} numbers A set of numbers. Could be an array of numbers.
 * @returns {Array<Number>} The range of the numbers
 * @example
 * Num.range(1, 2, 3, 4); // returns [1, 4];
 * Num.range(7, 2, 74, 4); // returns [2, 74];
 */
const range = (...numbers) => {
    var debugging = ToolJS.env.debugging;
    var arr, err = "The range method accepts only numbers or an array of numbers";
    arr = spreadToArr(numbers, "number", err, debugging);
    arr.sort();
    
    var start = arr[0];
    var end = arr[arr.length - 1];

    return [start, end];
}

export default range;