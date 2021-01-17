import ToolJS from "../main";
import { spreadToArr } from "../deps";
import isEven from "../num/isEven";

/**
 * This method calculates the median(i.e the middle number) of a set of numbers and returns the value.
 * @method module:Calc.median
 * @param {Array<Number>|Number} numbers A set of numbers. Could be an array of numbers.
 * @returns {Number} The median of the numbers
 * @example
 * Calc.median(1, 2, 3, 4); // returns 2.5;
 */
const median = (...numbers) => {
    var debugging = ToolJS.env.debugging;
    var result = 0, arr, err = "The median method accepts only numbers or an array of numbers";

    arr = spreadToArr(numbers, "number", err, debugging);
    var arrLength = arr.length;

    arr.sort();

    if(isEven(arrLength)) {
        result = (arr[arrLength / 2 - 1] + arr[arrLength / 2]) / 2;
    } 
    else { result = arr[(arrLength - 1) / 2]; }

    return result;
}

export default median;