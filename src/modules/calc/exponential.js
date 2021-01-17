import ToolJS from "../main";
import isNum from "../num/isNum";
import { Logs } from "../deps";

/**
 * This method returns the exponential of two(2) numbers.
 * @method module:Calc.exponential
 * @param {Number} n1 The first number.
 * @param {Number} n2 The second number.
 * @returns {Number} The exponential of the two number.
 * @example
 * Calc.exponential(10, 5); // returns 100000
 */
const exponential = (n1, n2) => {
    var debugging = ToolJS.env.debugging;
    if(isNum(n1) && isNum(n2)){ return n1 ** n2 }
    else { if (debugging) Logs.throw("The exponential method accepts only numbers") }
}

export default exponential;