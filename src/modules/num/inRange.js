import isNum from "./isNum";

/**
 * This method checks if a number is within a given range, and returns true, else it returns false.
 * @method module:Num.inRange
 * @param {Number} num The number to be checked.
 * @param {Number} start The start of the range.
 * @param {Number} end The end of the range.
 * @returns {Boolean} The result of the check
 * @example
 * Num.inRange(2, 3, 4); // returns true;
 * Num.inRange(7, 6, 10); // returns false;
 * Num.inRange(7, 6, 2); // returns false;
 */
const inRange = (num, start, end) => {
    if (isNum(num) && isNum(start) && isNum(end)){
        return (start > num && num < end);
    }
}

export default inRange;