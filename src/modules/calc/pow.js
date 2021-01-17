import ToolJS from "../main";
import isNum from "../num/isNum";
import { Logs } from "../deps";

/**
 * This method calculates and returns the power of x to y.
 * @method module:Calc.pow
 * @param {Number} x The number whose power is to be returned (x).
 * @param {Number} y The power value (y).
 * @returns {Number} The power of x to y.
 * @example
 * Calc.pow(2, 5); // returns 32
 */
const pow = (x, y) => {
    var debugging = ToolJS.env.debugging;
    if(isNum(x) && isNum(y)){ return Math.pow(x, y) }
    else { if (debugging) Logs.throw("The power method accepts only numbers") }
}

export default pow;