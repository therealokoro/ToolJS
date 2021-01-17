import isNum from "./isNum";

/**
 * This method rounds up a number to a specified number of decimal places.
 * @method module:Num.round
 * @param {Number} int The number or integer to be rounded.
 * @param {Number} [decimal=2] The number of decimal places to round up to. Default value (2).
 * @returns {Boolean} The rounded up number
 * @example
 * Num.round(35, 2); // returns 35;
 * Num.round(205.3123, 2); // returns 205.31;
 * Num.round(1.6666666666666667, 3); // returns 1.667;
 * Num.round(0.076, 1); // returns 0.1;
 * Num.round(100.343, 0); // returns 100;
 */
const round = (int, decimal = 2) => {
    if (isNum(int)) {
        return +(Math.round(int + "e+" + decimal) + "e-" + decimal);
    }
}

export default round;