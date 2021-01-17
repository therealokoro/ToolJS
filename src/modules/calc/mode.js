import ToolJS from "../main";
import { spreadToArr } from "../deps";

/**
 * This method calculates the mode of a set of numbers, i.e the number(s) that appear the most. It returns an array of numbers if it finds more than one mode
 * @method module:Calc.mode
 * @param {Array<Number>|Number} numbers A set of numbers. Could be an array of numbers.
 * @returns {Array<Number>|Number} The mode of the numbers
 * @example
 * Calc.mode(1,2,3,1,2,4,7,8,1,1); // returns 1;
 * Calc.mode(1,2,3,1,2,4,7,8); // returns [1, 2] because 1 and 2 appear the most in the list
 */
const mode = (...numbers) => {
    var debugging = ToolJS.env.debugging;
    var result = [], arr, err = "The mode method accepts only numbers or an array of numbers";

    arr = spreadToArr(numbers, "number", err, debugging);
    var count = [], num, maxIndex = 0;

    for (let i = 0; i < arr.length; i += 1) {
        num = arr[i];
        count[num] = (count[num] || 0) + 1;
        if (count[num] > maxIndex) {
            maxIndex = count[num];
        }
    }

    for (const i in count) {
        if (Object.hasOwnProperty.call(count, i)) {
            const curr = count[i];
            if (curr === maxIndex) {
                result.push(Number(i));
            }
        }
    }

    return (result.length == 1) ? result[0] : result;
}

export default mode;